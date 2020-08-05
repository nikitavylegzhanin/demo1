import { GraphQLServer } from 'graphql-yoga'

import context from './context'
import schema from './schema'

new GraphQLServer({ context, schema }).start()
