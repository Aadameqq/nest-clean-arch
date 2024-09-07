import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app-module';
import { ConfigurationService } from './configuration/configuration.service';
import { WebApiModule } from './web/api/web-api-module';

function removePrefixFromDocPaths(
    prefix: string,
    document: OpenAPIObject,
): OpenAPIObject {
    const newPaths = Object.keys(document.paths).reduce((acc, key: string) => {
        if (!key.startsWith(prefix))
            throw new Error(
                'Every path in swagger document must start with the same prefix',
            );
        const newKey = key.substring(prefix.length);
        acc[newKey] = document.paths[key];
        return acc;
    }, {});

    return {
        ...document,
        paths: newPaths,
    };
}

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
            .addTag('Redirection')
            .addTag('User redirection')
            .addTag('User')
            .addTag('User profile')
            .addServer('/api')
            .build();

        const document = SwaggerModule.createDocument(app, config, {
            include: [WebApiModule],
        });

        const updatedDocument = removePrefixFromDocPaths('/api', document);

        SwaggerModule.setup(
            configurationService.get('SWAGGER_PATH'),
            app,
            updatedDocument,
            {},
        );
    }

    await app.listen(configurationService.get('PORT'));

    console.log(`App hosted on port `, configurationService.get('PORT'));
}
bootstrap();
