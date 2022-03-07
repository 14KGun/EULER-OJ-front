import { useSpring, animated } from 'react-spring';
import imgAccept from './accept.png';
import imgTime from './time.png';
import imgMemory from './memory.png';
import imgError from './error.png';
import imgMistake from './mistake.png';
import imgUnknown from './unknown.png';
import './Res.css';

const Res = (props) => {
    const ST = { background: 'none', width: '0%' }
    const IMGBOX = { background: 'none' }
    var imgSrc = undefined;
    var txt = '';

    if(props.res === '100'){
        ST.width = '100%'; ST.background = (props.theme==='light' ? 'rgb(34,177,76)' : 'rgb(25,150,60)')
        txt = '맞았습니다';
        IMGBOX.background = 'rgba(20,131,51,1)'
        imgSrc = imgAccept;
    }
    else if(props.res === 'time'){
        ST.width = '100%';
        ST.background = (props.theme==='light' ? 'rgb(90,90,90)' : 'rgb(90,90,90)');
        txt = '시간 초과';
        IMGBOX.background = 'rgba(0,0,0,0.5)';
        imgSrc = imgTime;
    }
    else if(props.res === 'memory'){
        ST.width = '100%';
        ST.background = (props.theme==='light' ? 'rgb(90,90,90)' : 'rgb(90,90,90)');
        txt = '메모리 초과';
        IMGBOX.background = 'rgba(0,0,0,0.5)';
        imgSrc = imgMemory;
    }
    else if(props.res === 'output'){
        ST.width = '100%';
        ST.background = (props.theme==='light' ? 'rgb(90,90,90)' : 'rgb(90,90,90)');
        txt = '출력 초과';
        IMGBOX.background = 'rgba(0,0,0,0.5)';
        imgSrc = imgError;
    }
    else if(props.res === 'runtime'){
        ST.width = '100%';
        ST.background = (props.theme==='light' ? 'rgb(90,90,90)' : 'rgb(90,90,90)');
        txt = '런타임 에러';
        IMGBOX.background = 'rgba(0,0,0,0.5)';
        imgSrc = imgError;
    }
    else if(props.res === 'compile'){
        ST.width = '100%';
        ST.background = (props.theme==='light' ? 'rgb(90,90,90)' : 'rgb(90,90,90)');
        txt = '컴파일 에러';
        IMGBOX.background = 'rgba(0,0,0,0.5)';
        imgSrc = imgError;
    }
    else if(props.res === '!0'){
        ST.width = `0%`;
        txt = `틀렸습니다`;
        IMGBOX.background = 'rgba(237,28,36,0.9)';
        imgSrc = imgMistake;
    }
    else if(props.res.indexOf('!') !== -1){
        const point = Number(props.res.substr(1));
        ST.width = `${ point }%`;
        ST.background = (props.theme==='light' ? 'rgb(255,127,39)' : 'rgb(230,100,30)');
        txt = `부분 점수(${ point })`;
        IMGBOX.background = 'rgba(237,28,36,0.9)';
        imgSrc = imgMistake;
    }
    else if(props.res === 'wait_0' || props.res === 'wait'){
        ST.width = `0%`;
        txt = `채점 대기중`;
        IMGBOX.background = 'rgba(90,90,90,0.5)';
        imgSrc = undefined;
    }
    else if(props.res.indexOf('wait') !== -1){
        const point = Number(props.res.substr(5));
        ST.width = `${ point }%`;
        ST.background = 'rgb(140,140,140)';
        txt = `채점 진행중(${ point }%)`;
        IMGBOX.background = 'rgba(90,90,90,0.5)';
        imgSrc = undefined;
    }
    else{
        ST.width = '100%';
        ST.background = (props.theme==='light' ? 'rgb(90,90,90)' : 'rgb(90,90,90)');
        txt = '알 수 없는 에러';
        IMGBOX.background = 'rgba(0,0,0,0.5)';
        imgSrc = imgUnknown;
    }

    const style = useSpring({
        width: '100%', height: '26px', position: 'relative', overflow: 'hidden',
        borderRadius: '13px',
        background: (props.theme==='light' ? 'rgb(200,200,200)' : 'rgb(50,50,50)'),
        border: props.border
    })
    const styleST = useSpring({
        background: ST.background, width: ST.width
    });
    const styleIMGBOX = useSpring({
        background: IMGBOX.background
    });

    return (
        <animated.div style={ style } className="RES_BOX ND">
            <animated.div className="RES_ST" style={ styleST }/>
            <animated.div className="RES_TXT">{ txt }</animated.div>
            <animated.div className="RES_IMGBOX" style={ styleIMGBOX }>
                <div className="RES_PENDING"></div>
                { imgSrc ? <img src={ imgSrc } alt=""/> : <></> }
            </animated.div>
        </animated.div>
    )
}

Res.defaultProps = {
    theme: 'light'
}

export default Res;