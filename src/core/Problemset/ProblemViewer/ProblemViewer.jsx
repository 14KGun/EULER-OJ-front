import { useState, useRef } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import Footer from '../../Frame/Footer/Footer';

const ViewerFlexLay = (props) => {
    const getWidth = () => document.body.clientWidth;
    const widthR = useRef(getWidth());
    const [bodyWidth, setWidth] = useState(widthR.current); // range = 200 ~ 130
    useState(() => {
        const resizeEvent = () => {
            const _width = getWidth();
            if(widthR.current !== _width){
                widthR.current = _width;
                setWidth(_width);
                console.log(_width)
            }
        }
        resizeEvent();
        window.addEventListener('resize', resizeEvent);
        return () => window.removeEventListener('resize', resizeEvent);
    }, []);

    const widthEnv = {
        main: 1200, sub: 230, gap: 30, margin: 15
    };

    if(bodyWidth >= widthEnv.margin*2 + widthEnv.sub*2 + widthEnv.main + widthEnv.gap*2){
        return (
            <div style={{ display: 'flex', gap: widthEnv.gap, justifyContent: 'center' }}>
                <div style={{ width: widthEnv.sub }}></div>
                <div style={{ width: widthEnv.main }}>{ props.children }</div>
                <div style={{ width: widthEnv.sub }}>{ props.subLay }</div>
            </div>
        )
    }
    if(bodyWidth >= widthEnv.margin*2 + widthEnv.sub + widthEnv.main + widthEnv.gap*2){
        return (
            <div style={{ display: 'flex', gap: widthEnv.gap, justifyContent: 'center' }}>
                <div style={{ width: `calc(100% - ${ widthEnv.main + widthEnv.sub + widthEnv.gap + widthEnv.margin*2 }px)` }}></div>
                <div style={{ width: widthEnv.main }}>{ props.children }</div>
                <div style={{ width: widthEnv.sub }}>{ props.subLay }</div>
            </div>
        )
    }
    return null;
}

const ProblemViewer = (props) => {

    let subLay = (
        <div style={{ width: '100%', height: '100px', background: 'red' }}></div>
    )

    return (
        <div>
            <ViewerFlexLay subLay={ subLay }>
                <div style={{ width: '100%', height: '100px', background: 'green' }}></div>
            </ViewerFlexLay>
            <div className="BTM_EMPTY"></div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default ProblemViewer;