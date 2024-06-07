import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Minimal twitter')
  .setDescription('The minimal-twitter API description')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  })
  .build();
