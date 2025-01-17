import { INestApplication } from "@nestjs/common";

export type HttpMethod =
	| "get"
	| "post"
	| "put"
	| "delete"
	| "patch"
	| "options"
	| "head"
	| "acl"
	| "trace"
	| "connect";

declare module "nestjs-routes-viewer" {
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
		options?: { ignoreMethods?: HttpMethod[]; showGuards?: boolean }
	): void;
}

export type RouteInfo = {
	method: string;
	path: string;
	guards: string[];
};
