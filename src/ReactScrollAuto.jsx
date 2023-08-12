import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const ReactScrollAuto = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scroll({
            behavior: 'smooth',
            left: 0, top: document.body.offsetTop
        });
    }, [pathname]);

    return null;
}

export default ReactScrollAuto;