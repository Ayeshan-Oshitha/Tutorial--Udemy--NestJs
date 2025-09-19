import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that are not in the DTO
      forbidNonWhitelisted: true, // throw an error if a property is not in the DTO
      transform: true, // automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // allow implicit conversion of primitive types
      },
    }),
  );

  /**
   * Swagger configuration
   */
  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Blog App api')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('https://example.com/terms')
    .setLicense('MIT', 'https://example.com/license')
    .addServer('http://localhost:3000', 'Development server')
    .build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //enable cors
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
