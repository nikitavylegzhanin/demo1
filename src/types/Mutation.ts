import { objectType, stringArg } from '@nexus/schema'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export default objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_, { email, password }, { prisma }) => {
        const user = await prisma.user.create({
          data: { email, password: await hash(password, 8) },
        })

        return {
          token: sign({ userId: user.id }, String(process.env.JWT_SECRET), {
            expiresIn: '7d',
          }),
          user,
        }
      },
    }),
      t.field('login', {
        type: 'AuthPayload',
        args: {
          email: stringArg({ nullable: false }),
          password: stringArg({ nullable: false }),
        },
        resolve: async (_, { email, password }, { prisma }) => {
          const user = await prisma.user.findOne({ where: { email } })

          if (!user) {
            throw new Error('User not found')
          }

          if (!(await compare(password, user.password))) {
            throw new Error('Invalid password')
          }

          return {
            token: sign({ userId: user.id }, String(process.env.JWT_SECRET), {
              expiresIn: '7d',
            }),
            user,
          }
        },
      })
  },
})
