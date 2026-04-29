import { type LoaderFunctionArgs, redirect } from 'react-router'
import dbPromise from '@/db.server'
import { User } from '@/models/user.server'
import { commitSession, getSession } from '@/sessions.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const code = url.searchParams.get('code')

	if (!code) return redirect('/login?error=no_code')

	const clientId = process.env.GOOGLE_CLIENT_ID!
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET!
	const redirectUri = `${process.env.APP_URL}/auth/google/callback`

	const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			code,
			grant_type: 'authorization_code',
			redirect_uri: redirectUri,
		}),
	})

	console.log(tokenResponse)

	if (!tokenResponse.ok) return redirect('/login?error=token_failed')
	const tokenData = await tokenResponse.json()

	const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		headers: { Authorization: `Bearer ${tokenData.access_token}` },
	})

	if (!userResponse.ok) return redirect('/login?error=userinfo_failed')
	const googleUser = await userResponse.json()
	console.log({ googleUser })

	await dbPromise

	let user = await User.findOne({ email: googleUser.email })

	if (!user) {
		user = await User.create({
			email: googleUser.email,
			name: googleUser.name,
			// password: null,
		})
	}

	const session = await getSession(request.headers.get('Cookie'))
	session.set('userId', user._id.toString())

	return redirect('/dashboard', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	})
}
