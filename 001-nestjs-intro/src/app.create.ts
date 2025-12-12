import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export function appCreate(app: INestApplication): void {
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
  const swaggerConfig = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Blog App api')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('https://example.com/terms')
    .setLicense('MIT', 'https://example.com/license')
    .addServer('http://localhost:3000', 'Development server')
    .build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Setup the aws sdk used uploading the files to aws s3 bucket
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId')!,
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey')!,
    },
    region: configService.get('appConfig.awsRegion')!,
  });

  //enable cors
  app.enableCors();
}
