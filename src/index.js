"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRegisteredRoutes = logRegisteredRoutes;
/**
 * Logs all registered routes in a NestJS application.
 * @param app - The NestJS application instance (must implement INestApplication).
 * @param options - Configuration options for logging routes. (Optional)
 * @param options.ignoreMethods - An array of HTTP methods to ignore when logging routes. This helps filter out specific HTTP methods like 'get', 'post', etc (lowercase). (Optional)
 * @param options.showGuards - A boolean indicating whether to include guards column in the route logs, default is false.
 * @returns {void}
 */
function logRegisteredRoutes(app, { ignoreMethods, showGuards = false }) {
    var _a, _b;
    const methodsToIgnore = ignoreMethods || [];
    const server = app.getHttpServer();
    const router = (_b = (_a = server._events) === null || _a === void 0 ? void 0 : _a.request) === null || _b === void 0 ? void 0 : _b._router;
    if (!router || !router.stack) {
        console.error("Router is not available. Ensure the application uses Express.");
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
        const route = layer.route;
        const handler = (_a = route === null || route === void 0 ? void 0 : route.stack[0]) === null || _a === void 0 ? void 0 : _a.handle;
        // Get guards
        const guards = Reflect.getMetadata("__guards__", handler) || [];
        const guardNames = guards
            .map((guard) => guard.name || "Unknown")
            .filter((name) => name !== "Unknown");
        return {
            method: Object.keys(route.methods)[0].toUpperCase(),
            path: route.path,
            guards: guardNames,
        };
    });
    const formattedRoutes = routes.map((route) => {
        const formattedRoute = {
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
