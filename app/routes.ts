import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('login', 'routes/login.tsx'),
	route('signup', 'routes/signup.tsx'),
	route('dashboard', 'routes/dashboard.tsx'),
	route('auth/google', 'routes/auth.google.tsx'),
	route('auth/google/callback', 'routes/auth.google.callback.tsx'),
] satisfies RouteConfig
