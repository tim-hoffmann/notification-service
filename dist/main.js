"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const web_module_1 = require("./web/web.module");
function useSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Notification Service')
        .setDescription('This is a Notification Service that can be used to send templated notifications.')
        .setVersion('1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(web_module_1.WebModule);
    const logger = new common_1.Logger('NestApplication');
    app.enableVersioning();
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    useSwagger(app);
    await app.listen(3000, () => logger.log('App listening on port 3000'));
}
bootstrap();
//# sourceMappingURL=main.js.map