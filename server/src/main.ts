import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import path from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 4200);
}
bootstrap();
