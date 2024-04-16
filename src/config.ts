import { FParagraph, FText, PWError, PWId } from "./default";
import { BlockFactory, InlinerFactory } from "./factory";
import ParseWorker from "./ParseWorker";
import { Mapped, Typeof } from "./types";

type DefaultParseWorkers = { id: typeof PWId, error: typeof PWError };
type ConfigWithParseWorkers<T extends Mapped<Typeof<ParseWorker>>> = IConfig & { parseWorkers: T }

export interface IConfig
{
    /** Everything in `context` can be directly accessed within factories and parse workers. */
    context: any;

    /**
     * Include raw string (before parse) from text source in every product.
     * If `false`, raw string will be included only in error products.
     */
    keepStr: boolean;

    /**
     * Block factories to create blocks.
     * When parsing string each block factory is used **in order**.
     */
    blocks: Mapped<Typeof<BlockFactory>>;

    /**
     * Inliner factories to create inliners.
     * When parsing string each inliner factory is used **in order**.
     */
    inliners: Mapped<Typeof<InlinerFactory>>;

    /**
     * Co-parsers to selectively analyze and transform products.
     * Their `getResult` return values are included in `ParseResult`.
     */
    parseWorkers: Mapped<Typeof<ParseWorker>>;
}

export type ConfigLike = Partial<IConfig>;

export function finalizeConfig<T extends ConfigLike>(config: T): ConfigWithParseWorkers<T['parseWorkers'] & DefaultParseWorkers>
{
    return {
        context:        config.context,

        keepStr:        !!config.keepStr,

        blocks:         { ...(config.blocks ?? {}),         ...{ paragraph: FParagraph } },
        inliners:       { ...(config.inliners ?? {}),       ...{ text: FText } },
        parseWorkers:   { ...(config.parseWorkers ?? {}),   ...{ id: PWId, error: PWError } },
    }
}