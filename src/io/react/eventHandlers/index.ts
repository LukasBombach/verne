import handleKeyDown from './onKeyDown';
import {EventHandlerInterface} from "../components/editor";

const eventHandlers: [string, Function][] = [
  ['onKeyDown', handleKeyDown]
];

/**
 * returns an object that can be set as props to the react editor's content editable element
 * [
 *   ['onKeyDown', handleKeyDown],
 *   ['onClick', handleClick]
 * ]
 *
 * becomes
 *
 * {
 *   onKeyDown: (event) => handleKeyDown(eventHandlerInterface, event),
 *   onClick: (event) => handleClick(eventHandlerInterface, event)
 * }
 *
 * @param {EventHandlerInterface} eventHandlerInterface
 * @returns {Object}
 */
export default function getEventHandlers(eventHandlerInterface: EventHandlerInterface) {
  return eventHandlers
    .map(([eventName, handler]) => [eventName, (e: any): any => handler(eventHandlerInterface, e)])
    .reduce((acc: object, [eventName, handler]) => ({ ...acc, [eventName as string]: handler }), {});
}
