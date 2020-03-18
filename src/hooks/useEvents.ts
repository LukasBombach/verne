import { useState } from "react";
import mitt from "mitt";

type Name = "keyDown" | "*";
type Handler = (event?: any) => void;
type Event = any;

export default function useEvents() {
  const [emitter] = useState(mitt());

  return emitter;
}
