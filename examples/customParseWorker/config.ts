import { Block, ConfigLike, ParseWorker, Product, ProductType } from "bitran";

//
// Detect and save all blocks with `search: true` property in meta
//

class PWSearch extends ParseWorker<Block>
{
    searchableIds: string[] = [];

    postFilter(product: Product): boolean
    {
        return product.type === ProductType.Block;
    }

    postFabricate(block: Block)
    {
        if (block.meta.search)
            this.searchableIds.push(block.id);
    }

    getResult()
    {
        return this.searchableIds;
    }
}

//
//
//

export default <ConfigLike> {
    parseWorkers: {
        search: PWSearch
    }
}