# Notification Microservice

Email Microservice written in Node.js that supports localized email templates build with mjml.

**This is work in progress!**

## API Design

| Method | Path                                       | Description                                                                           |
|--------|--------------------------------------------|---------------------------------------------------------------------------------------|
| POST   | /v1/:tenantId/templates                    | Creates new template with default locale.                                             |
| GET    | /v1/:tenantId/templates                    | Finds all templates with pagination.                                                  |
| GET    | /v1/:tenantId/templates/:id{?locale=de-DE} | Finds one by id. Returns default locale if none is specified.                         |
| PATCH  | /v1/:tenantId/templates/:id{?locale=de-DE} | Updates template and default locale fields if none is specified.                      |
| DELETE | /v1/:tenantId/templates/:id{?locale=de-DE} | Deletes templates and all locales. If locale is specified only the locale is deleted. |
| POST   | /v1/:tenantId/templates/:id/locales/de-DE  | Creates a new locale for a template.                                                  |
| GET    | /v1/:tenantId/templates/:id/locales        | Finds all locales of the template.                                                    |
