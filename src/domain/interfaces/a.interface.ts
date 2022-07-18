import { A } from "../models/a";

export abstract class  IARepository {
 abstract myBusinessFunction1(): Promise<A>;
 abstract myBusinessFunction2(): Promise<A>;
}
