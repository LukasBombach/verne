import { createContext, useContext } from "react";
import { Events } from "../types";
import mitt from "mitt";

const EventsContext = createContext(mitt());

type EventType = keyof Events;
type Handler<T extends EventType> = (event: Events[T]) => void;
type WildcardHandler<T extends EventType> = (type: T, event: Events[T]) => void;

export interface Emitter {
  on<T extends EventType>(type: T, handler: Handler<T>): void;
  on(type: "*", handler: WildcardHandler<EventType>): void;

  off<T extends EventType>(type: T, handler: Handler<T>): void;
  off(type: "*", handler: WildcardHandler<EventType>): void;

  emit<T extends EventType>(type: T, event: Events[T]): void;
}

export default function useEvents() {
  const emitter = useContext(EventsContext);
  return emitter as Emitter;
}
