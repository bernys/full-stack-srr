import { redirect, type ActionFunctionArgs } from 'react-router'
import { LoginForm } from '@/components/auth/login-form'
import { User } from '@/models/user.server'
import dbPromise from '@/db.server'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const email = formData.get('email')
	const password = formData.get('password')

	await dbPromise
	// 1. Validar credenciales contra MongoDB
	const user = await User.findOne({ email }).lean()

	if (!user /* || validación de hash de contraseña fallida */) {
		return { error: 'Credenciales inválidas' }
	}

	// 2. Crear sesión
	const session = await getSession(request.headers.get('Cookie'))
	session.set('userId', user._id.toString())

	return redirect('/dashboard', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	})
}

export default function Login() {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<a href='#' className='flex items-center gap-2 self-center font-medium'>
					<div className='flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground'></div>
					Acme Inc.
				</a>
				<LoginForm />
			</div>
		</div>
	)
}
