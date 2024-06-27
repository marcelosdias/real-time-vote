import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyWebsocket from '@fastify/websocket'

import { createPoll } from './http/routes/create-poll'
import { getPoll } from './http/routes/get-poll'
import { voteOnPolls } from './http/routes/vote-on-poll'
import { pollResults } from './http/ws/poll-results'

const app = fastify()

app.register(fastifyCookie, {
  secret: 'polls-app-nlw',
  hook: 'onRequest',
})

app.register(fastifyWebsocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPolls)
app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running')
})
