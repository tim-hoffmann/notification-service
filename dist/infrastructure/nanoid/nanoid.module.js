"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanoidModule = void 0;
const common_1 = require("@nestjs/common");
const di_tokens_constant_1 = require("../../core/constants/di-tokens.constant");
const nanoid_service_1 = require("./nanoid.service");
let NanoidModule = class NanoidModule {
};
NanoidModule = __decorate([
    (0, common_1.Module)({
        providers: [{ provide: di_tokens_constant_1.UNIQUE_ID_SERVICE, useClass: nanoid_service_1.NanoidService }],
        exports: [di_tokens_constant_1.UNIQUE_ID_SERVICE],
    })
], NanoidModule);
exports.NanoidModule = NanoidModule;
//# sourceMappingURL=nanoid.module.js.map