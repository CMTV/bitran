import { ParseProcess, ParseStage } from "./parser";
import { Product } from "./product";

export abstract class ParseWorker<TProduct extends Product = Product>
{
    process: ParseProcess;

    filter(stage: ParseStage, product: Product) { return false; }
    fabricate(stage: ParseStage, product: TProduct) {}
    getResult(): any {};
}