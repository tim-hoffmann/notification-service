"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_module_1 = require("../core/core.module");
const dynamo_db_module_1 = require("../infrastructure/dynamo-db/dynamo-db.module");
const application_config_1 = require("./application.config");
const template_locale_profile_1 = require("./mapping/profiles/template-locale.profile");
const template_profile_1 = require("./mapping/profiles/template.profile");
const template_service_1 = require("./services/template.service");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [core_module_1.CoreModule, dynamo_db_module_1.DynamoDbModule, config_1.ConfigModule, config_1.ConfigModule.forFeature(application_config_1.default)],
        providers: [template_service_1.TemplateService, template_profile_1.TemplateProfile, template_locale_profile_1.TemplateLocaleProfile],
        exports: [template_service_1.TemplateService],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application.module.js.map