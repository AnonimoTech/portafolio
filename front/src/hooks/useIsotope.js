import { useEffect, useRef } from "react";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";

const useIsotope = (dep = []) => {
  const gridRef = useRef(null);
  const isoRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      imagesLoaded(gridRef.current, () => {
        if (isoRef.current) isoRef.current.destroy(); // Limpia previa
        isoRef.current = new Isotope(gridRef.current, {
          itemSelector: ".grid-item",
          layoutMode: "fitRows",
        });
      });
    }

    return () => {
      if (isoRef.current) {
        isoRef.current.destroy();
        isoRef.current = null;
      }
    };
    
  }, dep);

 

  return [gridRef];
};

export default useIsotope;
