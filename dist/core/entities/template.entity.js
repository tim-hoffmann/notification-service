"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const classes_1 = require("@automapper/classes");
const transport_type_enum_1 = require("../enums/transport-type.enum");
const base_entity_1 = require("./base.entity");
const template_locale_entity_1 = require("./template-locale.entity");
class Template extends base_entity_1.Base {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], Template.prototype, "tenantId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], Template.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], Template.prototype, "from", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], Template.prototype, "dataSchema", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], Template.prototype, "transportType", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [String]),
    __metadata("design:type", Array)
], Template.prototype, "bcc", void 0);
__decorate([
    (0, classes_1.AutoMap)({ type: () => template_locale_entity_1.TemplateLocale, depth: 0 }),
    __metadata("design:type", template_locale_entity_1.TemplateLocale)
], Template.prototype, "localeFields", void 0);
exports.Template = Template;
//# sourceMappingURL=template.entity.js.map