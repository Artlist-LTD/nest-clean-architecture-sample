import { Logger, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./api/guards/roles.guard";
import { ConfigModule } from "@nestjs/config";
// import { createEventProvider } from "./infrastructure/providers/events-provider";
import { DefaultController } from "@app/api/controllers/default.controller";
import { AModule } from "./a.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    AModule,
  ],
  controllers: [DefaultController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // {
    //   provide: "ASYNC_CONNECTION",
    //   useFactory: async () => {
    //     const connection = await createEventProvider();
    //     return connection;
    //   },
    // },
    Logger,
  ],
})
export class AppModule {}
