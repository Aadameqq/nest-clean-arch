import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app-module';
import { WebApiModule } from './web/api/web-api-module';
import { webConfig } from './web-config';
import { commonConfig } from './config/common-config';

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

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
        .setTitle(webConfig.SWAGGER_TITLE)
        .addBearerAuth({
            description: 'Use token received from POST /auth/ endpoint',
            type: 'http',
        })
        .addTag('User')
        .addTag('Auth')
        .addTag('Redirection')
        .addTag('User redirection')
        .addTag('User profile')
        .addServer('/api')
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        include: [WebApiModule],
    });

    const updatedDocument = removePrefixFromDocPaths('/api', document);

    SwaggerModule.setup(webConfig.SWAGGER_PATH, app, updatedDocument, {});

    await app.listen(webConfig.PORT);

    if (commonConfig.isDevelopment()) {
        console.log(
            `App hosted on http://localhost:${webConfig.PORT}/${webConfig.SWAGGER_PATH}`,
        );
    }
}
bootstrap();
