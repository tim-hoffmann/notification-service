"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebModule = void 0;
const classes_1 = require("@automapper/classes");
const core_1 = require("@automapper/core");
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ajv_schema_validation_module_1 = require("../infrastructure/ajv-schema-validation/ajv-schema-validation.module");
const application_module_1 = require("../application/application.module");
const core_module_1 = require("../core/core.module");
const ping_controller_1 = require("./controllers/ping.controller");
const template_controller_1 = require("./controllers/template.controller");
const request_logger_middleware_1 = require("./middlewares/request-logger.middleware");
const web_config_1 = require("./web.config");
const core_2 = require("@nestjs/core");
const entity_not_found_filter_1 = require("./exception-filters/entity-not-found.filter");
let WebModule = class WebModule {
    configure(consumer) {
        consumer.apply(request_logger_middleware_1.RequestLoggerMiddleware).forRoutes('*');
    }
};
WebModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            ajv_schema_validation_module_1.AjvSchemaValidationModule,
            config_1.ConfigModule.forRoot({ envFilePath: '.env.local', load: [web_config_1.default] }),
            nestjs_1.AutomapperModule.forRoot({
                strategyInitializer: (0, classes_1.classes)(),
                namingConventions: new core_1.CamelCaseNamingConvention(),
            }),
            application_module_1.ApplicationModule,
        ],
        controllers: [ping_controller_1.PingController, template_controller_1.TemplateController],
        providers: [
            {
                provide: core_2.APP_FILTER,
                useClass: entity_not_found_filter_1.EntityNotFoundExceptionFilter,
            },
        ],
    })
], WebModule);
exports.WebModule = WebModule;
//# sourceMappingURL=web.module.js.map