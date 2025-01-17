**Description** :
`nestjs-routes-viewer` is a lightweight utility for NestJS applications that logs all registered routes in a clear and structured format. It simplifies debugging and route management by providing an easy way to view all HTTP methods and paths in your NestJS application.

**Features** :

-   Automatically detects and logs all registered routes in your application.
-   Supports Express-based NestJS applications.
-   Helps developers quickly debug or verify route configurations.

**Use Case** :
Perfect for developers working with NestJS who need a quick and reliable way to view all the routes in their application during development or debugging.

**How to Use** :

```typescript
import { logRegisteredRoutes } from "nestjs-routes-viewer";

const app = await NestFactory.create(AppModule);
await app.listen(3000);

// Log all registered routes
logRegisteredRoutes(app);
```

**Output on the terminal:**

```bash
Registered Routes:

| Index | Method   | Path                                    |
|-------|----------|-----------------------------------------|
| 0     | ACL      | `/api/v1$`                              |
| 1     | ACL      | `/api/v1/*`                             |
| 2     | ACL      | `/health`                               |
| 3     | ACL      | `/api/v1$`                              |
| 4     | ACL      | `/api/v1/*`                             |
| 5     | ACL      | `/health`                               |
| 6     | GET      | `/health`                               |
| 7     | GET      | `/api/v1/products`                      |
| 8     | GET      | `/api/v1/products/single/:id`           |
| 9     | GET      | `/api/v1/products/popular`              |
| 10    | GET      | `/api/v1/products/vendor`               |
| 11    | POST     | `/api/v1/products`                      |
| 12    | PATCH    | `/api/v1/products/:id`                  |
| 13    | DELETE   | `/api/v1/products/:id`                  |
| 14    | DELETE   | `/api/v1/products/:id/images/:imageId`  |
| 15    | PATCH    | `/api/v1/products/bookmark/:id`         |
| 16    | GET      | `/api/v1/products/search`               |
| 17    | GET      | `/api/v1/categories`                    |
| 18    | GET      | `/api/v1/categories/find/:id`           |
| 19    | POST     | `/api/v1/categories`                    |
| 20    | POST     | `/api/v1/auth/register`                 |
```

**Configuration:**
The `logRegisteredRoutes` function is designed to log all the registered routes in a NestJS application. This guide explains the configuration options available for customizing its behavior.

The second parameter of the logRegisteredRoutes function accepts a configuration object with the following options:

1. `ignoreMethods`

    **Type**: `HttpMethod[]`

    **Default**: [] (no methods are ignored by default)

    **Description**: An array of HTTP methods to exclude from the route logs. This is useful for filtering out methods such as `options ` or `head` that might not be relevant for debugging or API documentation purposes.

    The following HTTP methods are supported and can be included in the `ignoreMethods` array:

    | HTTP Method | Description                                     |
    | ----------- | ----------------------------------------------- |
    | get         | Retrieve data from the server                   |
    | post        | Send data to the server                         |
    | put         | Update an existing resource                     |
    | patch       | Partially update a resource                     |
    | delete      | Remove a resource                               |
    | head        | Same as GET but only retrieves headers          |
    | options     | Describe communication options for the resource |
    | trace       | Perform a message loop-back test                |
    | connect     | Establish a tunnel to the server                |
    | acl         | Access Control List requests                    |

    **Example Usage:**

    ```typescript
    import { logRegisteredRoutes } from "nestjs-routes-viewer";

    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    // Log all registered routes, excluding 'acl' and 'head' methods
    logRegisteredRoutes(app, { ignoreMethods: ["acl", "head"] });
    ```

2. `showGuards`

    **Type**: `boolean`

    **Default**: `false`

    **Description**: A boolean flag that determines whether to include the guards column (used by the routes, eg. `@UseGuards(AuthGuard)`) in the route logs. Set this to true if you want to include guards information in the logs.

    **Example Usage:**

    ```typescript
    import { logRegisteredRoutes } from "nestjs-routes-viewer";

    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    // Log all registered routes, excluding 'acl' and 'head' methods and include guards column
    logRegisteredRoutes(app, { ignoreMethods: ["acl", "head"], showGuards: true });
    ```
