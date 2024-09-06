import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigurationService } from './configuration/configuration.service';
import { ApiModule } from './web/api/api-module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configurationService = app.get(ConfigurationService);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    if (configurationService.isDevelopment()) {
        const config = new DocumentBuilder()
            .setTitle(configurationService.get('SWAGGER_TITLE'))
            .addBearerAuth({
                description: 'Use token received from POST /auth/ endpoint',
                type: 'http',
            })
            .addTag('Auth')
            .addTag('Redirect')
            .addTag('User redirect')
            .addTag('User')
            .addTag('User profile')
            .build();

        const document = SwaggerModule.createDocument(app, config, {
            include: [ApiModule],
        });

        SwaggerModule.setup(
            configurationService.get('SWAGGER_PATH'),
            app,
            document,
            {},
        );
    }

    await app.listen(configurationService.get('PORT'));

    console.log(`App hosted on port `, configurationService.get('PORT'));
}
bootstrap();
