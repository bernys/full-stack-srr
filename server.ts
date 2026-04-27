import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { createRequestHandler } from 'react-router'

// @ts-ignore - This file will be generated when run `bun run build`
import * as build from './build/server/index.js'

const requestHandler = createRequestHandler(build, process.env.NODE_ENV)

const app = new Elysia()
	.get('/health', 'ok')
	.use(staticPlugin({ assets: 'build/client', prefix: '/' }))
	.all('*', async ({ request }) => {
		return requestHandler(request)
	})
	.listen(3000)

console.log(`Servidor SSR corriendo en http://${app.server?.hostname}:${app.server?.port}`)
