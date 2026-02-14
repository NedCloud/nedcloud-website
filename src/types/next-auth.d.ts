import type { Role } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    role: Role
  }
  interface Session {
    user: User
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}