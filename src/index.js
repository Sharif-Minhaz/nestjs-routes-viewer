"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRegisteredRoutes = logRegisteredRoutes;
/**
 * Logs all registered routes in a NestJS application.
 * @param app - The NestJS application instance (must implement INestApplication).
 * @param options - Configuration options for logging routes. (Optional)
 * @param options.ignoreMethods - An array of HTTP methods to ignore when logging routes. This helps filter out specific HTTP methods like 'get', 'post', etc (lowercase). (Optional)
 * @returns {void}
 */
function logRegisteredRoutes(app, { ignoreMethods } = {}) {
    var _a, _b;
    const methodsToIgnore = ignoreMethods || [];
    // Log all registered routes
    const server = app.getHttpServer();
    const router = (_b = (_a = server._events) === null || _a === void 0 ? void 0 : _a.request) === null || _b === void 0 ? void 0 : _b._router;
    if (!router || !router.stack) {
        console.error("Router is not available. Ensure the application uses a compatible platform like Express.");
        return;
    }
    const routes = router.stack
        .filter((layer) => {
        var _a;
        return layer.route &&
            !methodsToIgnore.includes(Object.keys(((_a = layer.route) === null || _a === void 0 ? void 0 : _a.methods) || {})[0].toLowerCase());
    })
        .map((layer) => {
        var _a;
        return ({
            method: Object.keys((_a = layer.route) === null || _a === void 0 ? void 0 : _a.methods)[0].toUpperCase(),
            path: layer.route.path,
        });
    });
    console.log("Registered Routes:");
    console.table(routes);
}
