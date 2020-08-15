require('dotenv').config()

import { GraphQLServer } from 'graphql-yoga'

import context from './context'
import schema from './schema'
import permissions from './permissions'

new GraphQLServer({ context, schema, middlewares: [permissions] }).start()
