import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useLocation } from "react-router-dom";

const smoothScroll = () => {
    window.scroll({ behavior: 'smooth', left: 0, top: document.body.offsetTop });
}

const ReactScrollAuto = (props) => {
    const { pathname } = useLocation();
    const background = useSpring({
        background: props.theme === 'dark' ? 'rgb(30,31,33)' : 'rgb(250,251,252)',
        config: { duration: 250 }
    });

    const [bodyHeight, setBodyHeight] = useState(document.body.clientHeight);
    const appHeight = useSpring({
        height: props.height,
        config: { duration: 100 }
    }).height;
    const getFooterHeight = (x) => {
        if (props.switch === false) return 0;
        return Math.max(bodyHeight - x, 0);
    }
    
    const resizeEvent = () => {
        if(bodyHeight !== document.body.clientHeight) setBodyHeight(document.body.clientHeight);
    }
    useEffect(() => {
        smoothScroll(); props.reFooter();
    }, [pathname]);
    useEffect(() => {
        props.reFooter();
        window.addEventListener('resize', props.reFooter);
        window.addEventListener('resize', resizeEvent);
        return () => {
            window.removeEventListener('resize', props.reFooter);
            window.removeEventListener('resize', resizeEvent);
        }
    });

    return <animated.div id="footer-empty" style={{ ...background, height: appHeight.to(getFooterHeight) }}/>;
}

export default ReactScrollAuto;