import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(' CAR-MARKET MINI REST API')
    .setDescription('Rest API documentation')
    .setVersion('1.0.0')
    .addTag('car_market')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(cookieParser());
  await app.listen(PORT, () =>
    console.log(`Server successfully started on ${PORT}`),
  );
}
bootstrap();
