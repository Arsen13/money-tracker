import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Money Tracker')
    .setDescription(
      'Money Tracker is a personal finance management API that allows users to track their income and expenses efficiently\n\n' +
        'Main features include:\n' +
        '- User registration and login using JWT authentication\n' +
        '- Creating, updating, and deleting transactions\n' +
        '- Organizing transactions into income and expense categories\n' +
        '- Managing custom categories\n' +
        '- Viewing statistics and summaries by category\n',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
