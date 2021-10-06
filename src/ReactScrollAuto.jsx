import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const smoothScroll = () => {
  window.scroll({
      behavior: 'smooth',
      left: 0,
      top: document.body.offsetTop
  });
}

const ReactScrollAuto = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScroll();
  }, [pathname]);

  return null;
}

export default ReactScrollAuto;