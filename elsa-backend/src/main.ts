import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  // Swagger Config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ROOT Project Document')
    .setDescription('API Document for Root Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // Auto Validation
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true,
      transform: true,
      //forbidNonWhitelisted: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const port = configService.get<number>('RUNNING_PORT') || 3000;
  console.log(`API Start at port: ${port}`);
  await app.listen(port);
}
bootstrap();
