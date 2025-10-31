import type { User as PrismaUser, Role } from "@prisma/client";

declare module "better-auth/types" {
  interface User extends Omit<PrismaUser, 'role'> {
    role: Role;
  }
  
  interface Session {
    user: User;
  }
}
