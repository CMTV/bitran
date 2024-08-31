import { BitranDefinition } from "bitran-use";

export interface CustomRawPlayItem
{
    type:       'custom';
    title:      string;
    category?:  string;
    icon?:      string;
}

export interface NodeRawPlayItem
{
    type:       'node';
    title:      string;
    definition: BitranDefinition;
}

export type RawPlayItem = NodeRawPlayItem | CustomRawPlayItem;

export function definePlayItem(playItem: RawPlayItem)
{
    return playItem;
}