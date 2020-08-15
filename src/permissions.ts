import { rule, shield } from 'graphql-shield'

import { Context } from './context'

const rules = {
  isAuth: rule()((_, _1, { userId }: Context) => Boolean(userId)),
}

export default shield({
  Query: {
    me: rules.isAuth,
  },
})
