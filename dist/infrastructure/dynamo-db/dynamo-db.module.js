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
exports.DynamoDbModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const nanoid_module_1 = require("../nanoid/nanoid.module");
const dynamo_db_config_1 = require("./dynamo-db.config");
const template_profile_1 = require("./mapping/profiles/template.profile");
const template_locale_profile_1 = require("./mapping/profiles/template-locale.profile");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const core_module_1 = require("../../core/core.module");
const template_dynamo_db_repository_1 = require("./repositories/template-dynamo-db.repository");
const di_tokens_constant_1 = require("../../core/constants/di-tokens.constant");
let DynamoDbModule = class DynamoDbModule {
    constructor(client, documentClient) {
        this.client = client;
        this.documentClient = documentClient;
    }
    async onModuleDestroy() {
        this.documentClient.destroy();
        this.client.destroy();
    }
};
DynamoDbModule = __decorate([
    (0, common_1.Module)({
        imports: [core_module_1.CoreModule, config_1.ConfigModule.forFeature(dynamo_db_config_1.default), nanoid_module_1.NanoidModule],
        providers: [
            template_profile_1.TemplateProfile,
            template_locale_profile_1.TemplateLocaleProfile,
            {
                provide: client_dynamodb_1.DynamoDBClient,
                useFactory: (config) => new client_dynamodb_1.DynamoDBClient(Object.assign({}, config)),
                inject: [dynamo_db_config_1.default.KEY],
            },
            {
                provide: lib_dynamodb_1.DynamoDBDocument,
                useFactory: (client) => lib_dynamodb_1.DynamoDBDocument.from(client, {
                    marshallOptions: { removeUndefinedValues: true, convertClassInstanceToMap: true },
                }),
                inject: [client_dynamodb_1.DynamoDBClient],
            },
            { provide: di_tokens_constant_1.TEMPLATE_REPOSITORY, useClass: template_dynamo_db_repository_1.TemplateDynamoDbRepository },
        ],
        exports: [di_tokens_constant_1.TEMPLATE_REPOSITORY],
    }),
    __metadata("design:paramtypes", [client_dynamodb_1.DynamoDBClient,
        lib_dynamodb_1.DynamoDBDocument])
], DynamoDbModule);
exports.DynamoDbModule = DynamoDbModule;
//# sourceMappingURL=dynamo-db.module.js.map