**Description** :
`nest-routes-viewer` is a lightweight utility for NestJS applications that logs all registered routes in a clear and structured format. It simplifies debugging and route management by providing an easy way to view all HTTP methods and paths in your NestJS application.

**Features** :

-   Automatically detects and logs all registered routes in your application.
-   Supports Express-based NestJS applications.
-   Helps developers quickly debug or verify route configurations.

**Use Case** :
Perfect for developers working with NestJS who need a quick and reliable way to view all the routes in their application during development or debugging.

**How to Use** :

```typescript
import { logRegisteredRoutes } from "nest-routes-viewer";

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
