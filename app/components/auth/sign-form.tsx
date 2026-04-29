import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link, useActionData, Form } from 'react-router'
import type { action } from '@/routes/signup'

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
	// Capturar errores devueltos por la función action
	const actionData = useActionData<typeof action>()

	return (
		<Form method='post' className={cn('flex flex-col gap-6', className)} {...props}>
			<FieldGroup>
				<div className='flex flex-col items-center gap-1 text-center'>
					<h1 className='text-2xl font-bold'>Create your account</h1>
					<p className='text-sm text-balance text-muted-foreground'>Fill in the form below to create your account</p>
				</div>

				{/* Mostrar mensaje de error si la validación en el servidor falla */}
				{actionData?.error && (
					<div className='text-sm font-medium text-destructive text-center'>{actionData.error}</div>
				)}

				<Field>
					<FieldLabel htmlFor='name'>Full Name</FieldLabel>
					<Input id='name' name='name' type='text' placeholder='John Doe' required />
				</Field>
				<Field>
					<FieldLabel htmlFor='email'>Email</FieldLabel>
					<Input id='email' name='email' type='email' placeholder='m@example.com' required />
					<FieldDescription>
						We&apos;ll use this to contact you. We will not share your email with anyone else.
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor='password'>Password</FieldLabel>
					<Input id='password' name='password' type='password' required />
					<FieldDescription>Must be at least 8 characters long.</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
					<Input id='confirm-password' name='confirm-password' type='password' required />
					<FieldDescription>Please confirm your password.</FieldDescription>
				</Field>
				<Field>
					<Button type='submit'>Create Account</Button>
				</Field>
				<FieldSeparator>Or continue with</FieldSeparator>
				<Field>
					<Form action='/auth/google' method='post' className='w-full'>
						<Button variant='outline' type='submit' className='w-full'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' className='w-5 h-5 mr-2'>
								<path
									fill='#EA4335'
									d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z'
								/>
								<path
									fill='#4285F4'
									d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
								/>
								<path
									fill='#FBBC05'
									d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
								/>
								<path
									fill='#34A853'
									d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
								/>
							</svg>
							Sign up with Google
						</Button>
					</Form>
					<FieldDescription className='px-6 text-center'>
						Already have an account? <Link to='/login'>Sign in</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</Form>
	)
}
