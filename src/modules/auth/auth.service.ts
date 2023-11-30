import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import { AuthPayloadDto, AuthTokenResponseDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/user.dto';
import { Utils } from 'src/common/utils';

@Injectable()
export class AuthService {
  private unAuthorizeDefaultPayload: {
    isAuthorized: boolean;
    payload: AuthPayloadDto;
  };

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.unAuthorizeDefaultPayload = {
      isAuthorized: false,
      payload: null,
    };
  }

  async generateAuthTokenResponse(user: User) {
    const payload: AuthPayloadDto = {
      email: user.email,
      password: user.password,
      _id: user._id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, pass: string): Promise<AuthTokenResponseDto> {
    const user = await this.userService.findByEmail(email);

    if (!user || !Utils.comparePassword(pass, user.password)) {
      throw new UnauthorizedException();
    }

    return await this.generateAuthTokenResponse(user);
  }

  async signUp(payload: CreateUserDto): Promise<AuthTokenResponseDto> {
    const isExisted = Boolean(
      await this.userService.findByEmail(payload.email),
    );

    if (isExisted) {
      throw new ConflictException('User already exists');
    }

    const user = await this.userService.create({
      ...payload,
      password: Utils.getHashedPassword(payload.password),
    });

    return await this.generateAuthTokenResponse(user);
  }

  async isAuthorizedUser(email: string, pass: string): Promise<boolean> {
    return Boolean(await this.userService.findByEmailPassword(email, pass));
  }

  async authenticateToken(token: string): Promise<{
    isAuthorized: boolean;
    payload: AuthPayloadDto;
  }> {
    if (!token) return this.unAuthorizeDefaultPayload;

    try {
      const payload = await this.jwtService.verifyAsync<AuthPayloadDto>(token, {
        secret: 'secretKey',
      });

      if (!payload) return this.unAuthorizeDefaultPayload;

      const isAuthorized = await this.isAuthorizedUser(
        payload.email,
        payload.password,
      );

      return {
        isAuthorized,
        payload,
      };
    } catch {
      return this.unAuthorizeDefaultPayload;
    }
  }
}
