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
exports.CreateTemplateLocaleDto = void 0;
const classes_1 = require("@automapper/classes");
const class_validator_1 = require("class-validator");
class CreateTemplateLocaleDto {
}
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/),
    __metadata("design:type", String)
], CreateTemplateLocaleDto.prototype, "locale", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTemplateLocaleDto.prototype, "textTemplate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsByteLength)(0, 256000),
    __metadata("design:type", String)
], CreateTemplateLocaleDto.prototype, "htmlTemplate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTemplateLocaleDto.prototype, "subjectTemplate", void 0);
exports.CreateTemplateLocaleDto = CreateTemplateLocaleDto;
//# sourceMappingURL=create-template-locale.dto.js.map