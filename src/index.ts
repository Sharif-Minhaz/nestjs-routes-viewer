import { INestApplication } from "@nestjs/common";
import { HttpMethod } from "types";

/**
 * Logs all registered routes in a NestJS application.
 * @param app - The NestJS application instance (must implement INestApplication).
 * @param options - Configuration options for logging routes. (Optional)
 * @param options.ignoreMethods - An array of HTTP methods to ignore when logging routes. This helps filter out specific HTTP methods like 'get', 'post', etc (lowercase). (Optional)
 * @returns {void}
 */
export function logRegisteredRoutes(
	app: INestApplication<any>,
	{ ignoreMethods }: { ignoreMethods?: HttpMethod[] } = {}
) {
	const methodsToIgnore = ignoreMethods || [];
	// Log all registered routes
	const server = app.getHttpServer();

	const router = server._events?.request?._router;
	if (!router || !router.stack) {
		console.error(
			"Router is not available. Ensure the application uses a compatible platform like Express."
		);
		return;
	}

	const routes = router.stack
		.filter(
			(layer: any) =>
				layer.route &&
				!methodsToIgnore.includes(
					Object.keys(layer.route?.methods || {})[0].toLowerCase() as HttpMethod
				)
		)
		.map((layer: any) => ({
			method: Object.keys(layer.route?.methods)[0].toUpperCase(),
			path: layer.route.path,
		}));

	console.log("Registered Routes:");
	console.table(routes);
}
