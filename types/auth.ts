import { Session, User } from "better-auth/types";

export interface ExtendedUser extends User {
  role: 'USER' | 'MANAGER' | 'ADMIN';
}

export interface ExtendedSession extends Session {
  user: ExtendedUser;
}
