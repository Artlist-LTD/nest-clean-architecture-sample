// import { Logger as NestLogger, LoggerService } from "@nestjs/common";
// import { Logger } from "@common/logger";
// import { httpContext } from "@common/http-context";
// import { isLocal } from "@app/utils/utils";
// import { lazyLoad } from "@common/utils";

// const createLogger = (): LoggerService => {
//   const { SERVICE_NAME, LOG_LEVEL } = process.env;

//   if (isLocal()) {
//     return new NestLogger();
//   }

//   return new Logger({
//     level: LOG_LEVEL,
//     projectName: SERVICE_NAME,
//     guidProvider: () => httpContext.locals.guid,
//     json: true,
//   });
// };

// export const logger: LoggerService = null;

// module.exports = lazyLoad(() => ({ logger: createLogger() }));
