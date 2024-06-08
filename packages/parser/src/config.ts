import { FSpan, FParagraph, FText, PWError, PWId } from "./default";
import { Factory } from "./factory";
import { ParseWorker } from "./worker";

export interface Config<TContext = any> {
    /**
     * Everything in `context` can be directly accessed within factories and parse workers.
     */
    context: TContext;

    /**
     * Include raw string from text source for every product.
     * When `false`, raw string will only be included in parse-error products.
     */
    keepStr: boolean;

    /**
     * Product factories to create blocks and inliners.
     */
    products: { [productName: string]: new () => Factory };

    /**
     * Co-parsers to selectively analyze and transform products while parsing.
     * Their `getResult` return values are included in `ParseResult`.
     */
    workers: { [workerName: string]: new () => ParseWorker };
}

//
//
//

export type ConfigLike<TContext = any> = Partial<Config<TContext>>;

export const configDefaults = {
    preProducts: {
        span: FSpan,
    },
    postProducts: {
        paragraph: FParagraph,
        text: FText,
    },
    postWorkers: {
        id: PWId,
        error: PWError,
    }
}

export type DefinedConfig<TConfigLike extends ConfigLike> = {
    context:    TConfigLike['context'];
    keepStr:    boolean;
    products:   typeof configDefaults.preProducts & TConfigLike['products'] & typeof configDefaults.postProducts;
    workers:    TConfigLike['workers'] & typeof configDefaults.postWorkers;
}

export function defineConfig<TConfigLike extends ConfigLike>(configLike: TConfigLike): DefinedConfig<TConfigLike>
{
    return {
        context: configLike.context,
        keepStr: !!configLike.keepStr,
        products: {
            ...configDefaults.preProducts,
            ...configLike.products,
            ...configDefaults.postProducts,
        },
        workers: {
            ...configLike.workers,
            ...configDefaults.postWorkers,
        }
    };
}