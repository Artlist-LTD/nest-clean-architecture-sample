import { instanceToPlain } from "class-transformer";

export abstract class CustomBaseEntity<T> {
  toInstance(): T {
    return instanceToPlain(this) as T;
  }
}
