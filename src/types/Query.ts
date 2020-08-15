import { objectType } from '@nexus/schema'

export default objectType({
  name: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (_, _1, { userId, prisma }) =>
        prisma.user.findOne({
          where: {
            id: Number(userId),
          },
        }),
    })
  },
})
