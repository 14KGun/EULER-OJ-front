import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { Link } from 'react-router-dom';
import CodeEditor from '../../Frame/CodeEditor/CodeEditor';

import svgUnvisibility from './svg_unvisibility.svg';
import svgDownload from './svg_download.svg';
import svgEditor from './svg_editor.svg';
import svgSetting from './svg_setting.svg';
// import svgSend from './svg_send.svg';

const Btn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        float: 'right', height: '30px',
        paddingLeft: '5px', paddingRight: '5px', marginLeft: '6px',
        borderRadius: '7px'
    };
    const styleImg = {
        width: '20px', height: '20px',
        verticalAlign: 'middle'
    }
    const styleText = {
        color: 'white', fontSize: '14px', fontWeight: 300,
        verticalAlign: 'middle', marginLeft: '5px'
    }
    const background = useSpring({
        background: `rgba(200,200,200,${ isHover ? 0.4 : 0.2 })`,
        config: { duration: 100 }
    })

    return (
        <animated.div style={{ ...style, ...background }} className="BTNC"
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img style={ styleImg } src={ props.img } alt=""/>
            <span style={ styleText }>{ props.text }</span>
        </animated.div>
    )
}
const Editor = (props) => {
    const [height, setHeight] = useStateWithCallbackLazy('500px');

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
        let lineHeight = 22;
        const lines = document.getElementsByClassName('view-line');
        if(lines.length > 0){
            lineHeight = lines[0].clientHeight;
        }

        const codeHeight = code.split('\n').length;
        const newHeight = Math.max(500, codeHeight*lineHeight+200);
        if(`${ newHeight }px` !== height) {
            setHeight(`${ newHeight }px`, () => props.reFooter());
        }
    }

    return (
        <div style={ style }>
            <div style={ styleTxt }>소스 코드</div>
            <div style={{ position: 'absolute', top: '10px', right: '10px', height: '30px', width: '400px' }}>
                <Btn img={ svgDownload } text="다운로드"/>
                <Btn img={ svgEditor } text="에디터로 가져가기"/>
                <Link to="/setting/profile/editor"><Btn img={ svgSetting } text="에디터 설정"/></Link>
            </div>
            <div style={{ width: '100%', height: height }}>
                <CodeEditor theme={ props.option.theme } letterSpacing={ props.option.letterSpacing } fontSize={ props.option.size }
                tabSize={ props.option.tab } font={ props.option.font } lang={ props.lang }
                initCode={ props.source } height="100%" onChange={ (x) => onChange(x) }/>
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
    if(!props.source) return <None theme={ props.theme }/>
    if(props.source === '') return <None theme={ props.theme }/>
    return <Editor theme={ props.theme } reFooter={ props.reFooter } lang={ props.lang } option={ props.option } source={ props.source }/>
}

export default Wrap;