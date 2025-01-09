import { INestApplication } from "@nestjs/common";

/**
 * Logs all registered routes in a NestJS application.
 * @param app - The NestJS application instance (must implement INestApplication).
 */
export function logRegisteredRoutes(app: INestApplication<any>) {
	const server = app.getHttpServer();

	const router = server._events?.request?._router;
	if (!router || !router.stack) {
		console.error(
			"Router is not available. Ensure the application uses a compatible platform like Express."
		);
		return;
	}

	const routes = router.stack
		.filter((layer: any) => layer.route) // Only consider routes
		.map((layer: any) => ({
			method: Object.keys(layer.route.methods)[0].toUpperCase(),
			path: layer.route.path,
		}));

	console.log("Registered Routes:");
	console.table(routes);
}
