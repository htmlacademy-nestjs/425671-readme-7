export interface Comment {
  id?: string;
  postId?: string;
  userId: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}
