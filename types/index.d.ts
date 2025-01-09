import { INestApplication } from "@nestjs/common";

type HttpMethod =
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
		{ ignoreMethods }: { ignoreMethods: HttpMethod[] }
	): void;
}
