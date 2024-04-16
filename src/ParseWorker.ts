import { Product } from "src/product";
import { Parser } from "./parser";

export default abstract class ParseWorker<TProduct extends Product = Product>
{
    parser: Parser;

    preFilter(product: Product) { return false; }
    postFilter(product: Product) { return false; }

    preFabricate(product: TProduct) {}
    postFabricate(product: TProduct) {}

    getResult(): any {};
}

export type ParseWorkerResult<T extends typeof ParseWorker> = ReturnType<InstanceType<T>['getResult']>;