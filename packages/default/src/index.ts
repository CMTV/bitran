//
// Editor
//

import { editorName } from 'bitran-dom';
import editorDefinition from './block/editor';
export { editorDefinition };

//
// Paragraph
//

import { paragraphName } from 'bitran-dom';
import paragraphDefinition from './block/paragraph';
export { paragraphDefinition }

//
// Text
//

import { textName } from 'bitran-dom';
import textDefinition from './inliner/text';
export { textDefinition };

//
// Span
//

export { default as spanDefinition } from './inliner/span';

//
// Definitions Map
//

const definitions = {};

definitions[editorName] = editorDefinition;
definitions[paragraphName] = paragraphDefinition;
definitions[textName] = textDefinition;

export default definitions;