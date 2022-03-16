import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import getHref from '../../../Tool/getHref';

import svgCheck from './svg_check.svg';
import svgClose from './svg_close.svg';
import svgTime from './svg_time.svg';
import svgMemory from './svg_memory.svg';
import svgRuntime from './svg_runtime.svg';
import svgCompile from './svg_compile.svg';
import svgError from './svg_error.svg';

const ResMini = (props) => {
    let colorList = [160,160,160,0.4];
    let imgSrc = undefined;

    if (!props.res) {
        colorList = [160,160,160,0.4];

    }
    else if (props.res === 'load') {
        colorList = [160,160,160,0];

    }
    else if (props.res === '100') {
        colorList = (props.theme==='light' ? [34,177,76,1] : [25,150,60,1]);
        imgSrc = svgCheck;
    }
    else if (props.res === 'time') {
        colorList = [90,90,90,1];
        imgSrc = svgTime;
    }
    else if (props.res === 'memory') {
        colorList = [90,90,90,1];
        imgSrc = svgMemory;
    }
    else if (props.res === 'output') {
        colorList = [90,90,90,1];
        imgSrc = svgError;
    }
    else if (props.res === 'runtime') {
        colorList = [90,90,90,1];
        imgSrc = svgRuntime;
    }
    else if (props.res === 'compile') {
        colorList = [90,90,90,1];
        imgSrc = svgCompile;
    }
    else if (props.res === '!0') {
        colorList = [237,28,36,0.9];
        imgSrc = svgClose;
    }
    else if (props.res.indexOf('!') !== -1) {
        colorList = (props.theme==='light' ? [255,127,39,1] : [230,100,30,1]);
        imgSrc = svgClose;
    }
    else if (props.res.indexOf('wait') !== -1) {
        colorList = [90,90,90,0.5];

    }
    else {
        colorList = [90,90,90,1];
        imgSrc = svgError;
    }

    const style = useSpring({
        position: 'relative',
        width: '100%', height: '100%',
        background: `rgba(${ colorList[0] },${ colorList[1] },${ colorList[2] },${ colorList[3] })`
    });
    const styleImg = {
        position: 'absolute', top: '0px', left: '0px',
        width: '80%', height: '80%', padding: '10%'
    }

    let link = getHref.loginCurrentUrl();
    if (props.loginId) link = `/status/${  getHref.encodeObject({ problemId: props.id, loginId: (props.loginId ? props.loginId : '') }) }`;

    return (
        <Link to={ link }>
            <animated.div style={ style }>
                {
                    imgSrc ?
                    <img src={ imgSrc } alt="" style={ styleImg }/> : null
                }
            </animated.div>
        </Link>
    )
}

export default ResMini;