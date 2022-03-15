import { useState, useEffect, useRef } from 'react';
import CopyBtn from './CopyBtn/CopyBtn';
import TxtscreenBtn from './CopyBtn/TxtscreenBtn';

const sampleTransfer = (html) => {
    return html.split("\n").join("<br>").split(" ").join("&nbsp;");
}

const SampleLay = (props) => {
    const widthR = useRef(1200);
    const [width, setWidth] = useState(widthR.current);
    const widthCut = 1140;
    useEffect(() => {
        const resizeEvent = () => {
            const bodyWidth = document.body.clientWidth;
            if(widthR.current !== bodyWidth){
                widthR.current = bodyWidth;
                setWidth(widthR.current);
            }
        }
        resizeEvent();
        window.addEventListener('resize', resizeEvent);
        return () => {
            window.removeEventListener('resize', resizeEvent);
        }
    }, [])

    const styleContainer = {
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px 0px'
    }
    const styleExbox = {
        overflow: 'hidden', borderRadius: '10px',
        background: props.theme==='light' ? 'rgb(240,240,240)' : 'rgb(20,20,22)',
        border: props.theme==='light' ? '1px solid rgb(220,220,220)' : '1px solid rgb(10,11,12)',
        width: width > widthCut ? 'calc(50% - 7px)' : '100%'
    }
    const styleExboxTop = {
        position: 'relative', width: '100%', height: '40px', overflow: 'hidden',
        display: 'flex', justifyContent: 'space-between',
        background: props.theme==='light' ? 'rgb(220,220,220)' : 'rgb(10,11,12)'
    }
    const styleExboxTopText = {
        height: '40px', lineHeight: '40px', paddingLeft: '13px',
        fontSize: '15px', fontWeight: 400,
        color: props.theme==='light' ? 'black' : 'white'
    }
    const styleExboxTopRLay = {
        paddingRight: '6px', height: '40px',
        display: 'flex', justifyContent: 'flex-end'
    }
    const styleExboxContent = {
        paddingLeft: '13px', paddingRight: '13px',
        marginTop: '10px', marginBottom: '10px'
    }

    return (
        <div style={ styleContainer } className="content">
            <div style={ styleExbox }>
                <div className="ND" style={ styleExboxTop }>
                    <div style={ styleExboxTopText }>예제{ props.index } - 입력</div>
                    <div style={ styleExboxTopRLay }>
                        <CopyBtn text={ props.input } theme={ props.theme }/>
                        <TxtscreenBtn text={ props.input } title={ `예제${ props.index } - 입력` } theme={ props.theme }/>
                    </div>
                </div>
                <div className="content-d" style={ styleExboxContent }
                dangerouslySetInnerHTML={{ __html: sampleTransfer(props.input) }}/>
            </div>
            <div style={ styleExbox }>
                <div className="ND" style={ styleExboxTop }>
                    <div style={ styleExboxTopText }>예제{ props.index } - 출력</div>
                    <div style={ styleExboxTopRLay }>
                        <TxtscreenBtn text={ props.output } title={ `예제${ props.index } - 출력` } theme={ props.theme }/>
                    </div>
                </div>
                <div className="content-d" style={ styleExboxContent }
                dangerouslySetInnerHTML={{ __html: sampleTransfer(props.output) }}/>
            </div>
        </div>
    )
}

export default SampleLay;