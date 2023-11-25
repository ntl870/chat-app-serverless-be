import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../user/user.decorator';
import { CurrentUserContext } from 'src/common/interfaces/user-context.interface';
import { CreateChatBody, CreateChatDto } from './dto/chat.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  create(
    @CurrentUser() ctxUser: CurrentUserContext,
    @Body() body: CreateChatBody,
  ) {
    const createChatDto: CreateChatDto = {
      invitingUserId: ctxUser._id,
      invitedUserId: body.invitedUserId,
    };

    return this.chatService.create(createChatDto);
  }
}
