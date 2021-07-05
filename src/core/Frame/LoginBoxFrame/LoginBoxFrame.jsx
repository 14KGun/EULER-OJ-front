import { useState, useEffect } from 'react';

const LoginBoxFrame = (props) => {
    const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth);
    const [bodyHeight, setBodyHeight] = useState(document.body.clientHeight);
    const resizeEvent = () => {
        const _bodyWidth = document.body.clientWidth;
        const _bodyHeight = document.body.clientHeight;
        if(bodyWidth!=_bodyWidth) setBodyWidth(_bodyWidth);
        if(bodyHeight!=_bodyHeight) setBodyHeight(_bodyHeight);
    }
    useEffect(() => {
        window.addEventListener('resize', resizeEvent);
        return () => {
            window.removeEventListener('resize', resizeEvent);
        }
    });
    const styleLayCenter = {
        width: '450px', height: '500px', margin: 'auto',
        background: 'white', borderRadius: '25px'
    }
    return (
        <div style={{ width: '100%', height: '100%', background: 'rgb(235,235,235)' }}>
            <div id="layTop" style={{ height: `${ Math.max(50, (bodyHeight-500)/3) }px` }}/>
            <div id="layMid">
                <div id="layCenter" style={{ ...styleLayCenter }}>
                    { props.children }
                </div>
            </div>
            <div id="latBtm" style={{ height: '150px' }}/>
        </div>
    )
}

export default LoginBoxFrame;