import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CurrentUser } from '../user/user.decorator';
import { CurrentUserContext } from 'src/common/interfaces/user-context.interface';
import { CreateMessageDto } from './dto/message.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GenericResponse } from 'src/common/generic-response';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Post('/send')
  async sendMessage(
    @CurrentUser() ctxUser: CurrentUserContext,
    @Body() body: CreateMessageDto,
  ) {
    const response = await this.messageService.sendMessage(ctxUser._id, body);

    return GenericResponse.getResponse(response, 'done', HttpStatus.CREATED);
  }
}
