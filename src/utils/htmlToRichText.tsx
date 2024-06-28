// utils/htmlToRichText.js
// @ts-ignore
import { stateFromHTML } from 'draft-js-import-html';
import { ContentState, convertToRaw } from 'draft-js';

export default function htmlToRichText(html: any) {
  const contentState = stateFromHTML(html);
  console.log(contentState,"content")
  const rawContentState = convertToRaw(contentState);
  console.log(rawContentState,"rawContentState")

  return {
    nodeType: 'document',
    data: {},
    content: rawContentState.blocks.slice(0, 1).map((block: any) => ({
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: html,
          marks: [],
          data: {},
        },
      ],
      data: {},
    })),
  };
}
