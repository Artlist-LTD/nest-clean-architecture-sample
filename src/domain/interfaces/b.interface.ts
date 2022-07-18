import { B } from "../models/b";

export abstract class IBRepository {
  abstract myBusinessFunction1(): Promise<B>;
  abstract myBusinessFunction2(): Promise<B>;
}
