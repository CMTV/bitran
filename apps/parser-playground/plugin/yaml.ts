import { Plugin } from 'vite';
import YAML from 'yaml';

const yamlExtension = /\.(yml|yaml)$/;

export default function yaml(): Plugin
{
    return {
        name: 'yaml-transform',
        transform(src, id) {
            if (yamlExtension.test(id)) {
                return {
                    code: `export default ${JSON.stringify(YAML.parse(src))}`
                }
            }
        }
    }
}