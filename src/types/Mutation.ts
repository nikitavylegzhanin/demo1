import { objectType, stringArg } from '@nexus/schema'

export default objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: (_, { email, password }, { prisma }) => {
        return prisma.user.create({ data: { email, password } })
      },
    })
  },
})
