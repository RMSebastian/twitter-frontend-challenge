export interface SingUpData {
  //SignupInputDTO✅
  name: string;
  password: string;
  email: string;
  username: string;
}

export interface SingInData {
  //LoginInputDTO✅
  username?: string;
  email?: string;
  password: string;
}
export interface ReactionData {
  //CreateReactionInputDTO✅
  type: "LIKE" | "RETWEET";
}

export interface PostData {
  //CreatePostInputDTO✅
  content: string;
  parentId?: string;
  images?: File[];
}

export interface PostDTO {
  //ExtendedPostDTO✅
  id: string;
  content: string;
  parentId?: string;
  images?: string[];
  createdAt: Date;
  authorId: string;
  author: AuthorDTO;
  reactions: ReactionDTO[];
  comments: number;
}

export interface ReactionDTO {
  //ReactionDTO✅
  id: string;
  type: string;
  createdAt: Date;
  userId: string;
  postId: string;
  updatedAt: Date;
  deletedAt?: Date;
}
export interface AuthorDTO {
  //UserViewDTO✅
  id: string;
  name?: string;
  username: string;
  image?: string;
  isPrivate: boolean;
  createdAt: Date;
}

export interface UserDTO {
  //ExtendedViewDTO✅
  id: string;
  name?: string;
  username: string;
  image?: string;
  isPrivate: boolean;
  createdAt: Date;
  followers: AuthorDTO[];
  following: AuthorDTO[];
  posts: PostDTO[];
}

export interface MessageDTO {
  //MessageDTO✅
  id: string;
  content: string;
  createdAt: Date;
  chatId: string;
  senderId: string;
  sender: AuthorDTO;
}

export interface ChatDTO {
  //ChatDTO✅
  id: string;
  users: AuthorDTO[];
  messages: MessageDTO[];
}
