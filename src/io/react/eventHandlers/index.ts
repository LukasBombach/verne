import handleKeyDown from './onKeyDown';
import {EventHandlerInterface} from "../components/editor";

const eventHandlers: [string, Function][] = [
  ['onKeyDown', handleKeyDown]
];

export default function getEventHandlers(eventHandlerInterface: EventHandlerInterface) {
  return eventHandlers
    .map(([eventName, handler]) => [eventName, (e: any): any => handler(eventHandlerInterface, e)])
    .reduce((acc: object, [eventName, handler]) => ({ [eventName as string]: handler, ...acc }), {});
}
