# Notification Microservice

Email Microservice written in Node.js that supports localized email templates build with mjml.

**This is work in progress!**

## API Design

```
POST /v1/:tenantId/templates/ -> creates a new template with default locale if none is specified
GET /v1/:tenantId/templates -> findAll
GET /v1/:tenantId/templates/:id -> findOne
PATCH /v1/:tenantId/templates/:id -> update
DELETE /v1/:tenantId/templates/:id -> delete

POST /v1/:tenantId/templates/:id/locales -> creates a new template locale for the given template
GET /v1/:tenantId/templates/:id/locales -> findAll
GET /v1/:tenantId/templates/:id/locales/:locale -> findOne
PATCH /v1/:tenantId/templates/:id/locales/:locale -> update
DELETE /v1/:tenantId/templates/:id/locales/:locale -> delete
```