import handleKeyDown from './onKeyDown';
import Editor from "../components/editor";

const eventHandlers: [string, Function][] = [
  ['onKeyDown', handleKeyDown]
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
    .map(([eventName, handler]) => [eventName, (e: any): any => handler(editor, e)])
    .reduce((acc: object, [eventName, handler]) => ({ ...acc, [eventName as string]: handler }), {});
}
