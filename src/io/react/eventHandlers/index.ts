import handleBeforeInput from './onBeforeInput';
import handleKeyDown from './onKeyDown';
// import handleOnClick from './onClick';
import Editor from "../components/editor";

const eventHandlers: [string, Function][] = [
  // ['onClick', handleOnClick],
  // ['onKeyDown', handleKeyDown],
  // ['onKeyDown', (e: Event) => console.log('onKeyDown', e)],
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
    .map(([eventName, handler]) => [eventName, (event: any): any => handler(editor, event)])
    .reduce((acc, [eventName, handler]) => ({ ...acc, [eventName as string]: handler }), {});
}
