# Notification Microservice

Email Microservice written in Node.js that supports localized email templates build with mjml.

**This is work in progress!**

## API Design

| Method | Path                                       | Description                                                   |
|--------|--------------------------------------------|---------------------------------------------------------------|
| POST   | /v1/:tenantId/templates{?locale=de-DE}     | Creates new template with default locale if none is specified |
| GET    | /v1/:tenantId/templates                    | Finds all templates with pagination                           |
| GET    | /v1/:tenantId/templates/:id{?locale=de-DE} | Finds one by id                                               |
| PATCH  | /v1/:tenantId/templates/:id{?locale=de-DE} | Updates template and localized fields of default locale       |
| DELETE | /v1/:tenantId/templates/:id{?locale=de-DE} | Deletes templates and all locales                             |
| GET    | /v1/:tenantId/templates/:id/locales        | Finds all locales of the template                             |
