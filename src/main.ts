import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './configs/swagger.config';
import { Logger } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  app.use(
    '/api',
    apiReference({
      theme: 'kepler',
      spec: {
        content: document,
      },
    }),
  )
  SwaggerModule.setup('api', app, document);

  // Start server listening
  app.enableShutdownHooks();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8080;
  await app.listen(port, () => {
    Logger.log(`🚀 Listening at http://localhost:${port}`);
  });
}
bootstrap();
