import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const { SERVICE_NAME } = process.env;
  // initPrometheus({ prefix: SERVICE_NAME });
  const logger = null; // import your logger.

  const app = await NestFactory.create(AppModule, { logger });
  // app.use(httpContext.middleware);
  // app.useGlobalInterceptors(new RequestHandlerInterceptor());
  // app.enableVersioning();
  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  // app.useGlobalInterceptors(new DefaultApplicationHeaderInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle("Teams api service")
    .setDescription(
      "This is open api descriptor for teams api service endpoints"
    )
    .setVersion("v1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  const port = process.env.PORT;
  // await redisProvider.init({
  //   host: process.env.REDIS_HOST,
  //   port: Number(process.env.REDIS_PORT),
  //   keyPrefix: process.env.REDIS_KEYS_PREFIX,
  // });
  // if (!isLocal()) {
  //   await sqsMessagesHandler.init();
  // }
  await app.listen(port);

  // if (isLocal()) {
  //   logger.log(`http://localhost:${port}/api`);
  // }
}
bootstrap();
