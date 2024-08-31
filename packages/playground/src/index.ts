import { BitranDefinition } from 'bitran-use';

export interface PlaygroundConfig
{
    title:          string;
    repoLink?:      string;
    definitions?:   Record<string, BitranDefinition>;
}

export function defineConfig(config: PlaygroundConfig)
{
    return config;
}

//
//
//

export {
    type CustomRawPlayItem,
    type NodeRawPlayItem,
    type RawPlayItem,
    definePlayItem,
} from './cli/plugin/content/rawPlayItem';

export {
    type SceneMeta,
} from './cli/plugin/content/scene';