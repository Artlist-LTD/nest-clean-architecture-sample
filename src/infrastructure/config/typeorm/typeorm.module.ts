import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import typeormConnectionConfig from "./typeorm.config";

export const getTypeOrmModuleOptions = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  const typeOrmOptions = {
    type: "postgres",
    host: typeormConnectionConfig.host || configService.get("DATABASE_HOST"),
    port: typeormConnectionConfig.port || configService.get("DATABASE_PORT"),
    username:
      typeormConnectionConfig.username || configService.get("DATABASE_USER"),
    password:
      typeormConnectionConfig.password ||
      configService.get("DATABASE_PASSWORD"),
    database:
      typeormConnectionConfig.database || configService.get("DATABASE_NAME"),
    entities: [__dirname + "./../../**/*.entity{.ts,.js}"],
    synchronize: false,
    logging: typeormConnectionConfig.logging || false,
    schema:
      typeormConnectionConfig.schema || configService.get("DATABASE_SCHEMA"),
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
    cli: {
      migrationsDir: "src/infrastructure/database/migrations",
    },
  } as TypeOrmModuleOptions;
  return typeOrmOptions;
};
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService): Promise<TypeOrmModuleOptions> =>
        getTypeOrmModuleOptions(configService),
    }),
  ],
})
export class TypeOrmConfigModule {}
