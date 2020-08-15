import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

type Props = {
  request: any
}

export type Context = {
  prisma: PrismaClient
  userId?: string | number
}

type Token = {
  userId: string
}

export default ({ request }: Props): Context => {
  let userId: Context['userId']

  const Authorization: string | undefined = request?.get('Authorization')
  const token = Authorization?.replace('Bearer ', '')

  try {
    const verifiedToken = token
      ? (verify(token, String(process.env.JWT_SECRET)) as Token)
      : undefined

    userId = verifiedToken?.userId
  } catch (e) {
    //
  }

  return { prisma, userId }
}
