import type { User as PrismaUser } from "@prisma/client";

declare module "better-auth/types" {
  interface User extends PrismaUser {}
  
  interface Session {
    user: User;
  }
}
