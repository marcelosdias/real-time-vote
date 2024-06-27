import { FastifyInstance } from 'fastify'
import { Voting } from '../../utils/voting-pub-sub'
import { z } from 'zod'

export async function pollResults(app: FastifyInstance) {
  app.get(
    '/polls/:pollId/results',
    { websocket: true },
    (connection, request) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      })

      const { pollId } = getPollParams.parse(request.params)
      Voting.subscribe(pollId, (message) => {
        connection.send(JSON.stringify(message))
      })
    },
  )
}
