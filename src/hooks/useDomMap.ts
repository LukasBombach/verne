import React, { useContext, useEffect, useRef } from "react";

const DomMapContext = React.createContext(new Map<HTMLElement, number>());

export default function useDomMap(id: number) {
  const map = useContext(DomMapContext);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      map.set(element, id);
      console.log("added", map);
      return () => {
        map.delete(element);
        console.log("deleted", map);
      };
    }
  }, [id, map]);

  return ref;
}
