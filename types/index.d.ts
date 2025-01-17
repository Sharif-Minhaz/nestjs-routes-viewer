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
	export function logRegisteredRoutes(
		app: INestApplication<any>,
		options?: { ignoreMethods?: HttpMethod[] }
	): void;
}

export type RouteInfo = {
	method: string;
	path: string;
	guards: string[];
};
