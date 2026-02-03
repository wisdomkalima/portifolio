
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalLikeWithPrisma as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

type globalLikeWithPrisma = typeof global & {
    prisma?: PrismaClient
}
