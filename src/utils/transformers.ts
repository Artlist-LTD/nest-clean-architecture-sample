import { chain, mapKeys, mapValues, snakeCase, camelCase } from "lodash";


/// Only pure functions - zero dependencies!
const customSnakeCase = (s: string) =>
  chain(s).split(/(\d+)/).map(snakeCase).join("").value();

export const transformCamelToSnakeCaseDeep = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(transformCamelToSnakeCaseDeep);
  }

  const selfKeys = mapKeys(obj, (_v, k) => customSnakeCase(k));
  const deep = mapValues(selfKeys, transformCamelToSnakeCaseDeep);
  return deep;
}

export const transformSnakeToCamelCaseDeep = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(transformSnakeToCamelCaseDeep);
  }

  var selfKeys = mapKeys(obj, (value, k) => camelCase(k));

  const deep = mapValues(selfKeys, transformSnakeToCamelCaseDeep);
  return deep;
}
