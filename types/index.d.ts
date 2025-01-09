import { INestApplication } from "@nestjs/common";

declare module "nestjs-routes-viewer" {
	export function logRegisteredRoutes(app: INestApplication<any>): void;
}
