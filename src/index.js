"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRegisteredRoutes = logRegisteredRoutes;
/**
 * Logs all registered routes in a NestJS application.
 * @param app - The NestJS application instance (must implement INestApplication).
 */
function logRegisteredRoutes(app) {
    var _a, _b;
    const server = app.getHttpServer();
    const router = (_b = (_a = server._events) === null || _a === void 0 ? void 0 : _a.request) === null || _b === void 0 ? void 0 : _b._router;
    if (!router || !router.stack) {
        console.error("Router is not available. Ensure the application uses a compatible platform like Express.");
        return;
    }
    const routes = router.stack
        .filter((layer) => layer.route) // Only consider routes
        .map((layer) => ({
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
        path: layer.route.path,
    }));
    console.log("Registered Routes:");
    console.table(routes);
}
