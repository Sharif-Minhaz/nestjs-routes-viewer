import { INestApplication } from "@nestjs/common";
import { HttpMethod, RouteInfo } from "types";

/**
 * Logs all registered routes in a NestJS application.
 * @param app - The NestJS application instance (must implement INestApplication).
 * @param options - Configuration options for logging routes. (Optional)
 * @param options.ignoreMethods - An array of HTTP methods to ignore when logging routes. This helps filter out specific HTTP methods like 'get', 'post', etc (lowercase). (Optional)
 * @param options.showGuards - A boolean indicating whether to include guards column in the route logs, default is false.
 * @returns {void}
 */

export function logRegisteredRoutes(
	app: INestApplication<any>,
	{ ignoreMethods, showGuards = false }: { ignoreMethods?: HttpMethod[]; showGuards?: boolean }
) {
	const methodsToIgnore = ignoreMethods || [];
	const server = app.getHttpServer();
	const router = server._events?.request?._router;

	if (!router || !router.stack) {
		console.error("Router is not available. Ensure the application uses Express.");
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
		.map((layer: any) => {
			const route = layer.route;
			const handler = route?.stack[0]?.handle;

			// Get guards
			const guards = Reflect.getMetadata("__guards__", handler) || [];
			const guardNames = guards
				.map((guard: any) => guard.name || "Unknown")
				.filter((name: string) => name !== "Unknown");

			return {
				method: Object.keys(route.methods)[0].toUpperCase(),
				path: route.path,
				guards: guardNames,
			};
		});

	const formattedRoutes: RouteInfo[] = routes.map((route: RouteInfo) => {
		const formattedRoute: any = {
			method: route.method,
			path: route.path,
		};
		if (showGuards) {
			formattedRoute.guards = route.guards.join(", ") || "None";
		}
		return formattedRoute;
	});

	console.log("Registered Routes:");
	console.table(formattedRoutes);
}
