<script setup lang="ts">
import { shallowRef } from 'vue';
import { GroupNode, Node } from 'bitran-dom';
import { RenderProps } from './RenderProps';

import Render from './Render.vue';
import { useNode } from '@src/composable/node';

const props = defineProps<RenderProps<GroupNode>>();
const node = useNode(props);

//
// Key generation
//

let key = 1;

function createUniqueKey()
{
    return key++;
}

//
// Keying nodes for using in v-for render loop
//

type KeyedNode = { key: number, node: Node };

let keyedNodes: KeyedNode[];
const trackedKeyedNodes = shallowRef<KeyedNode[]>([]);

function createKeyedNode(node: Node): KeyedNode
{
    return {
        key: createUniqueKey(),
        node,
    }
}

function updateTracked()
{
    trackedKeyedNodes.value = [...keyedNodes];
}

//
// Arbitrary changes to Bitran DOM lead to rerendering of all child nodes.
// We do this because there is no reliable way to tell which and how exactly nodes were changed.
//
// TODO: Find a way to detect which nodes to rerender (text diff? node comparison?)
//

keyedNodes = node.children.map(childNode => createKeyedNode(childNode));
updateTracked();

//
// Unlike arbitrary changes to Bitran DOM, there is only a few possible and defined internal changes to group nodes.
// So instead of rerendering all children we can accurately remove/move/swap/add nodes without touching unaffected nodes.
// This greatly improves rendering speed and overall usability.
//
// So we use Proxy to intercept these defined GroupNode change methods and make renderer properly reflect these changes.
//

node.__detachAt = new Proxy(node.__detachAt, {
    apply(target, thisArg, args) {
        target.apply(thisArg, args);

        keyedNodes.splice(args[0], 1);
        updateTracked();
    }
});

node.__insertAt = new Proxy(node.__insertAt, {
    apply(target, thisArg, args) {
        target.apply(thisArg, args);

        keyedNodes.splice(args[0], 0, ...args.slice(1).map(newNode => createKeyedNode(newNode)));
        updateTracked();
    }
});

node.__swap = new Proxy(node.__swap, {
    apply(target, thisArg, args) {
        target.apply(thisArg, args);

        [keyedNodes[args[0]], keyedNodes[args[1]]] = [keyedNodes[args[1]], keyedNodes[args[0]]];
        updateTracked();
    }
});

node.__move = new Proxy(node.__move, {
    apply(target, thisArg, args) {
        target.apply(thisArg, args);

        const movingNode = keyedNodes[args[0]];
        keyedNodes.splice(args[0], 1);
        keyedNodes.splice(args[1], 0, movingNode);
        updateTracked();
    }
});
</script>

<template>
    <Render
        v-for="keyedNode of trackedKeyedNodes"
        :key="keyedNode.key"
        :node="keyedNode.node"
    />
</template>