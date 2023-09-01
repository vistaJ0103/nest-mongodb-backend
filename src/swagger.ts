import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocumentBuilderModule {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Stupid API')
      .setDescription('Stupid Api server')
      .addTag('stupid')
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http' })
      //   .setBasePath('/swagger-ui')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
