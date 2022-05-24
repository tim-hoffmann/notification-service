# Notification Microservice

Email Microservice written in Node.js that supports localized email templates build with mjml.

**This is work in progress!**

## API Design

```
POST /v1/:tenantId/templates/ -> creates new template with default locale if none is specified
GET /v1/:tenantId/templates -> finds all templates with pagination
GET /v1/:tenantId/templates/:id -> finds one by id
PATCH /v1/:tenantId/templates/:id -> updates template and localized fields of default locale
DELETE /v1/:tenantId/templates/:id -> deletes templates and all locales

POST /v1/:tenantId/templates/:id/locales -> creates a new template locale for the given template
GET /v1/:tenantId/templates/:id/locales -> finds all locales of the template
GET /v1/:tenantId/templates/:id/locales/:locale -> finds one locale of the template
PATCH /v1/:tenantId/templates/:id/locales/:locale -> updates locale of the template
DELETE /v1/:tenantId/templates/:id/locales/:locale -> deletes locale of the template
```
