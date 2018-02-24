import handleBeforeInput from './onBeforeInput';
import handleKeyDown from './onKeyDown';
import Editor from "../components/editor";

const eventHandlers: [string, Function][] = [
  ['onBeforeInput', handleBeforeInput],
  ['onKeyDown', handleKeyDown],
];

/**
 * Returns an object that can be set as props to the react editor's content editable element
 *
 * [
 *   ['onKeyDown', handleKeyDown],
 *   ['onClick', handleClick]
 * ]
 *
 * becomes
 *
 * {
 *   onKeyDown: (event) => handleKeyDown(editor, event),
 *   onClick: (event) => handleClick(editor, event)
 * }
 */
export default function getEventHandlers(editor: Editor) {
  return eventHandlers
    .map(([eventName, handler]) => {
      return [eventName, (event: any): any => handler(editor, event)];
    })
    .reduce((acc, [eventName, handler]) => {
      return Object.assign({}, acc,{ [eventName as string]: handler });
    }, {});
}
