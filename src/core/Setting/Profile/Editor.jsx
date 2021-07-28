import { Component , useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Layout from './Layout';
import CodeEditor from '../../Frame/CodeEditor/CodeEditor';
import svgEditor from './svg_editor.svg';
import svgFont from './svg_font.svg';
import svgSelect from './svg_select.svg'

const FontItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        height: '30px', marginBottom: '7px', borderRadius: '7px', position: 'relative', overflow: 'hidden'
    }
    const bgdColor = 210;
    const background = useSpring({
        background: `rgba(${ bgdColor },${ bgdColor },${ bgdColor },${ isHover || props.select ? 1 : 0 })`,
        config: { duration: 150 }
    })
    const imgStyle = {
        position: 'absolute', top: '5px', left: '2px',
        width: '20px', height: '20px'
    }
    const txtStyle = {
        position: 'absolute', top: '0px', left: '30px',
        height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 300, fontFamily: `${ props.font }, sens-serif`
    }
    return (
        <animated.div style={{ ...style, ...background }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img src={ svgSelect } style={{ ...imgStyle, opacity: (props.select ? 1 : 0) }} alt="selected"/>
            <div style={ txtStyle }>{ props.children }</div>    
        </animated.div>
    )
}
const FontSetting = (props) => {
    const style = {
        borderRadius: '15px', padding: '15px'
    }
    const background = useSpring({
        background: props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(40,40,41)'
    })
    const font = 'D2Coding';

    return (
        <animated.div style={{ ...style, ...background }}>
            <FontItem font="D2Coding" theme={ props.theme } select={ font === 'D2Coding' }>Naver D2Coding</FontItem>
            <FontItem font="Consolas" theme={ props.theme } select={ font === 'Consolas' }>Microsoft Consolas</FontItem>
            <FontItem font="UbuntuMono" theme={ props.theme } select={ font === 'UbuntuMono' }>Ubuntu Monospace</FontItem>
            <FontItem font="Monaco" theme={ props.theme } select={ font === 'Monaco' }>Apple Monaco</FontItem>
            <FontItem font="Menlo" theme={ props.theme } select={ font === 'Menlo' }>Apple Menlo</FontItem>
            <FontItem font="SourceCodePro" theme={ props.theme } select={ font === 'SourceCodePro' }>Adobe Source Code Pro</FontItem>
            <FontItem font="IbmPlex" theme={ props.theme } select={ font === 'IbmPlex' }>IBM Plex</FontItem>
        </animated.div>
    )
}

const EditerViewer = (props) => {
    const style = {
        width: '100%', height: '300px', borderRadius: '15px', overflow: 'hidden'
    }
    return (
        <div style={ style }>
            <CodeEditor height="100%"/>
        </div>
    )
}

class Editor extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgEditor } theme={ this.props.theme }>에디터 기본 설정</Layout.Title>
                <EditerViewer/>
                <Layout.Margin/>

                <Layout.Title icon={ svgFont } theme={ this.props.theme }>에디터 폰트</Layout.Title>
                <Layout.Content theme={ this.props.theme }>에디터 내부의 폰트를 설정합니다.</Layout.Content>
                <div style={{ height: '15px' }}/>
                <FontSetting theme={ this.props.theme }/>
            </div>
        )
    }
}

export default Editor