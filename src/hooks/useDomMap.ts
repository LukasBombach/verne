import { useState, useRef, useEffect } from "react";

export default function useDomMap(id: number) {
  const [map] = useState(new Map());
  const ref = useRef(null);

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

  // add to map on mount
  // remove from map on unmount

  return ref;
}
