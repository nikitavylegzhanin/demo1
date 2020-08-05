import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type Context = {
  prisma: PrismaClient
}

export default (): Context => ({ prisma })
