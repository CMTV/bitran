import { ConfigLike, Inliner, ParseWorker, Product, ProductType } from "bitran";

class Context
{
    location = 'math-article';

    foo() {
        return 'foo';
    }
}

class PWFoo extends ParseWorker<Inliner<string>>
{
    postFilter(product: Product<any>)
    {
        return product.type === ProductType.Inliner && product.name === 'text';
    }

    postFabricate(product: Inliner<string>)
    {
        let context = this.parser.getContext<Context>();

        context.location // math-article

        product.data += context.foo();
    }
}

export default <ConfigLike> {
    context: new Context,
    parseWorkers: { foo: PWFoo }
}