import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import CodeEditor from '../../Frame/CodeEditor/CodeEditor';

import svgUnvisibility from './svg_unvisibility.svg';

const Editor = (props) => {
    const [height, setHeight] = useState('500px');

    const style = {
        marginTop: '10px', position: 'relative',
        background: 'rgb(80,80,80)', borderRadius: '15px', overflow: 'hidden',
        border: '1px solid rgb(80,80,80)'
    }
    const styleTxt = {
        height: '50px', lineHeight: '50px', paddingLeft: '20px',
        color: 'white', fontSize: '16px', fontWeight: '400'
    }

    const onChange = (code) => {
        const codeHeight = code.split('\n').length;
        const newHeight = Math.max(500, codeHeight*22+200);
        if(`${ newHeight }px` !== height) setHeight(`${ newHeight }px`);
    }

    return (
        <div style={ style }>
            <div style={ styleTxt }>소스 코드</div>
            <div style={{ width: '100%', height: height }}>
                <CodeEditor initCode="" height="100%" onChange={ (x) => onChange(x) }/>
            </div>
        </div>
    )
}

const None = (props) => {
    const style = useSpring({
        position: 'relative', borderRadius: '15px', padding: '20px',
        background: props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'
    });
    return (
        <animated.div style={ style }>
            <img style={{ position: 'absolute', top: '20px', left: 'calc(50% - 12.5px)', width: '25px' }} src={ svgUnvisibility } alt=""/>
            <div style={{ paddingTop: '28px', textAlign: 'center', fontSize: '16px', fontWeight: 500, color: 'gray' }}>해당 소스 코드는 비공개되어 있습니다.</div>
        </animated.div>
    )
}

const Wrap = (props) => {
    return <Editor theme={ props.theme }/>
}

export default Wrap;