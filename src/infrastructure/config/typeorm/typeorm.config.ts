import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
// import { lazyLoad } from "@common/utils";

// import your lazyload;
 declare function lazyLoad<T extends (...args: any[]) => any>(factory: T): ReturnType<T>;

const typeormConnectionConfig: PostgresConnectionOptions = lazyLoad<
  () => PostgresConnectionOptions
>(() => ({
  type: "postgres",
  migrationsRun: false,
  synchronize: false,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: process.env.DATABASE_SCHEMA,
  logging:
    process.env.DATABASE_LOGGING.toLowerCase() === "true"
      ? ["error", "query"]
      : ["error"],
  entities: ["dist/infrastructure/entities/**/*.entity{.ts,.js}"],
  migrations: ["dist/infrastructure/database/migrations/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/infrastructure/database/migrations",
  },
}));

export default typeormConnectionConfig;
