// import { redirect, type LoaderFunctionArgs } from 'react-router'
// import dbPromise from '@/db.server'
// import { User } from '@/models/user.server'
// import { getSession, commitSession } from '@/sessions.server'
//
// export async function loader({ request }: LoaderFunctionArgs) {
// 	console.log('callback!!')
// 	const url = new URL(request.url)
// 	const code = url.searchParams.get('code')
//
// 	if (!code) return redirect('/login?error=no_code')
//
// 	const clientId = process.env.GOOGLE_CLIENT_ID!
// 	const clientSecret = process.env.GOOGLE_CLIENT_SECRET!
// 	const redirectUri = `${process.env.APP_URL}/auth/google/callback`
//
// 	// 1. Intercambiar el código por el Access Token
// 	const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
// 		body: new URLSearchParams({
// 			client_id: clientId,
// 			client_secret: clientSecret,
// 			code,
// 			grant_type: 'authorization_code',
// 			redirect_uri: redirectUri,
// 		}),
// 	})
//
// 	if (!tokenResponse.ok) return redirect('/login?error=token_failed')
// 	const tokenData = await tokenResponse.json()
//
// 	// 2. Obtener datos del usuario desde Google
// 	const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
// 		headers: { Authorization: `Bearer ${tokenData.access_token}` },
// 	})
//
// 	if (!userResponse.ok) return redirect('/login?error=userinfo_failed')
// 	const googleUser = await userResponse.json()
//
// 	// 3. Lógica de Base de Datos (Mongoose)
// 	await dbPromise
//
// 	let user = await User.findOne({ email: googleUser.email })
//
// 	if (!user) {
// 		// Crear usuario si no existe.
// 		// Nota: Al ser registro por OAuth, no hay contraseña. Ajusta tu esquema de Mongoose
// 		// para que el campo password no sea 'required' o pon un flag isOAuth: true.
// 		user = await User.create({
// 			email: googleUser.email,
// 			name: googleUser.name,
// 			// password: null,
// 		})
// 	}
//
// 	// 4. Crear sesión
// 	const session = await getSession(request.headers.get('Cookie'))
// 	session.set('userId', user._id.toString())
//
// 	// 5. Redirigir logueado
// 	return redirect('/dashboard', {
// 		headers: {
// 			'Set-Cookie': await commitSession(session),
// 		},
// 	})
// }
//

export default function Compon() {
	return <h1>estoy vivo</h1>
}
