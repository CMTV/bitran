import { Plugin } from "vite";
import { PG_CONTEXT } from "../../context";
import { RawPlayItem } from "src/cli/plugin/content/rawPlayItem";
import { SceneMeta } from "src/cli/plugin/content/scene";
import { scan } from "./scan";
import { Component } from "vue";

export interface SceneData
{
    code:   string;
    docs?:  Component;
}

export interface ContentScene {
    id:         string;
    meta:       SceneMeta;
    loadData:   () => Promise<SceneData>;
}

export type Content = {
    [playItemId: string] : {
        id: string;
        rawPlayItem: RawPlayItem;
        scenes: {
            [sceneId: string]: ContentScene;
        }
    }
}

export default function content(): Plugin
{
    const moduleName = 'virtual:content';

    return {
        name: moduleName,
        resolveId(id) {
            if (id === moduleName)
                return moduleName;
        },
        load(id) {
            if (id === moduleName) {
                const scanPlayItems = scan(PG_CONTEXT.productsRoot);

                let playItemCounter = 0;
                let sceneMetaCounter = 0;

                let code = `

                    import { markRaw } from 'vue';

                    const CONTENT = {};

                `;

                for (const scanPlayItem of scanPlayItems)
                {
                    code += `

                        import __playItemConfig__${++playItemCounter} from "${scanPlayItem.configPath}";

                        CONTENT["${scanPlayItem.id}"] = {
                            id:             "${scanPlayItem.id}",
                            rawPlayItem:    __playItemConfig__${playItemCounter},
                            scenes:         {},
                        };

                    `;

                    for (const scanScene of scanPlayItem.scenes)
                    {
                        code += `

                            ${scanScene.metaPath ? `import __sceneMeta__${++sceneMetaCounter} from "${scanScene.metaPath}";` : ''}

                            CONTENT["${scanPlayItem.id}"]["scenes"]["${scanScene.id}"] = {
                                id:         "${scanScene.id}",
                                meta:       ${scanScene.metaPath ? `__sceneMeta__${sceneMetaCounter},` : `{ title: "${camelCaseToWords(scanScene.id)}", ${scanScene.id === 'default' ? 'order: 0,' : ''} },` }
                                loadData:   async function() {
                                    return {
                                        ${scanScene.codePath ? `code: (await import("${scanScene.codePath}?raw")).default,` : ''}
                                        ${scanScene.docsPath ? `docs: markRaw((await import("${scanScene.docsPath}")).default),` : ''}
                                    }
                                },
                            }

                        `;
                    }
                }

                // ! Прописать в CLI index пути для scenes и playItems, чтобы они не в общей куче лежали, а по своим папочкам

                code += 'export default CONTENT;'

                return code;
            }
        }
    }
}

function camelCaseToWords(s: string)
{
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}