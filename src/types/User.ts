import { objectType } from '@nexus/schema'

export default objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.password()
  },
})
