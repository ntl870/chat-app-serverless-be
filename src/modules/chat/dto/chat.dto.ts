export interface CreateChatDto {
  readonly invitedUserId: string;
  readonly invitingUserId: string;
}

export interface CreateChatBody {
  readonly invitedUserId: string;
}
