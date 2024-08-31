import { type PlaygroundConfig } from "src";

export type ResolvedConfig = PlaygroundConfig & {
    rootPath: string;
}

let config: ResolvedConfig;

//
// Resolving config
//

{
    const rawConfigs: Record<string, PlaygroundConfig> = import.meta.glob('@products/.play/config.{js,ts}', { import: 'default', eager: true });

    if (Object.keys(rawConfigs).length === 0)
        throw new Error('Missing playground config file!');

    const [ rawConfigPath, rawConfig ] = Object.entries(rawConfigs).pop();
    const pathParts = rawConfigPath.split('/');

    config = {
        ...rawConfig,
        ...{
            rootPath: pathParts.slice(0, pathParts.lastIndexOf('.play')).join('/')
        }
    }
}

//

export default config;