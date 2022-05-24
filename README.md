# Notification Microservice

Email Microservice written in Node.js that supports localized email templates build with mjml.

**This is work in progress!**

## API Design

| Method | Path                                        | Description                                                   |
|--------|---------------------------------------------|---------------------------------------------------------------|
| POST   | /v1/:tenantId/templates                     | Creates new template with default locale if none is specified |
| GET    | /v1/:tenantId/templates                     | Finds all templates with pagination                           |
| GET    | /v1/:tenantId/templates/:id                 | Finds one by id                                               |
| PATCH  | /v1/:tenantId/templates/:id                 | Updates template and localized fields of default locale       |
| DELETE | /v1/:tenantId/templates/:id                 | Deletes templates and all locales                             |
| POST   | /v1/:tenantId/templates/:id/locales         | Creates a new template locale for the given template          |
| GET    | /v1/:tenantId/templates/:id/locales         | Finds all locales of the template                             |
| GET    | /v1/:tenantId/templates/:id/locales/:locale | Finds one locale of the template                              |
| PATCH  | /v1/:tenantId/templates/:id/locales/:locale | Updates locale of the template                                |
| DELETE | /v1/:tenantId/templates/:id/locales/:locale | Deletes locale of the template                                |
