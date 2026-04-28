import { redirect, type ActionFunctionArgs } from 'react-router'

export async function action({ request }: ActionFunctionArgs) {
	const clientId = process.env.GOOGLE_CLIENT_ID!
	const redirectUri = `${process.env.APP_URL!}/auth/google/callback`

	if (!clientId || !process.env.APP_URL) {
		throw new Error('Faltan variables de entorno para Google OAuth')
	}

	const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')

	url.searchParams.set('client_id', clientId)
	url.searchParams.set('redirect_uri', redirectUri)
	url.searchParams.set('response_type', 'code')
	url.searchParams.set('scope', 'openid email profile')
	url.searchParams.set('access_type', 'online')
	// Opcional: añadir 'state' para prevenir ataques CSRF

	return redirect(url.toString())
}
