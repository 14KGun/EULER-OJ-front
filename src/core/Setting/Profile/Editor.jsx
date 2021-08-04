import { Component , useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Layout from './Layout';
import CodeEditor from '../../Frame/CodeEditor/CodeEditor';
import axios from '../../Tool/axios';
import svgEditor from './svg_editor.svg';
import svgFont from './svg_font.svg';
import svgSelect from './svg_select.svg'

const FontItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        height: '30px', marginBottom: '7px', borderRadius: '7px', position: 'relative', overflow: 'hidden'
    }
    const bgdColor = (props.theme === 'light' ? 215 : 65);
    const background = useSpring({
        background: `rgba(${ bgdColor },${ bgdColor },${ bgdColor },${ isHover || props.select ? 1 : 0 })`,
        config: { duration: 100 }
    })
    const imgStyle = {
        position: 'absolute', top: '5px', left: '2px',
        width: '20px', height: '20px'
    }
    const txtStyle = {
        position: 'absolute', top: '0px', left: '30px',
        height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 300, fontFamily: `${ props.font }, sens-serif`,
        color: (props.theme === 'light' ? 'black' : 'white')
    }
    return (
        <animated.div style={{ ...style, ...background }} onClick={ () => props.onClick() }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) } className="BTNC">
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
        background: props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'
    })

    return (
        <animated.div style={{ ...style, ...background }}>
            <FontItem font="D2Coding" theme={ props.theme } select={ props.font === 'D2Coding' } onClick={ () => props.changeFont('D2Coding') }>Naver D2Coding</FontItem>
            <FontItem font="Consolas" theme={ props.theme } select={ props.font === 'Consolas' } onClick={ () => props.changeFont('Consolas') }>Microsoft Consolas</FontItem>
            <FontItem font="UbuntuMono" theme={ props.theme } select={ props.font === 'UbuntuMono' } onClick={ () => props.changeFont('UbuntuMono') }>Ubuntu Monospace</FontItem>
            <FontItem font="Monaco" theme={ props.theme } select={ props.font === 'Monaco' } onClick={ () => props.changeFont('Monaco') }>Apple Monaco</FontItem>
            <FontItem font="Menlo" theme={ props.theme } select={ props.font === 'Menlo' } onClick={ () => props.changeFont('Menlo') }>Apple Menlo</FontItem>
            <FontItem font="SourceCodePro" theme={ props.theme } select={ props.font === 'SourceCodePro' } onClick={ () => props.changeFont('SourceCodePro') }>Adobe Source Code Pro</FontItem>
            <FontItem font="IbmPlex" theme={ props.theme } select={ props.font === 'IbmPlex' } onClick={ () => props.changeFont('IbmPlex') }>IBM Plex</FontItem>
        </animated.div>
    )
}

const ThemeItem = (props) => {
    const styleLeft = {
        position: 'absolute', top: '0px', left: '0px',
        height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 400, color: (props.theme === 'light' ? 'black' : 'white')
    }
    return (
        <div style={{ position: 'relative', height: '30px', marginBottom: '5px' }}>
            <div style={ styleLeft }>{ props.leftText }</div>
            <div style={{ position: 'absolute', top: '0px', left: '140px', right: '0px', bottom: '0px' }}>
                { props.children }
            </div>
        </div>
    )
}
const UpDownSwitch = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', width: '24px', height: '24px', borderRadius: '12px', marginTop: '3px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'black' : 'white'),
        textAlign: 'center', lineHeight: '24px',
        background: 'gray'
    }
    const palette = (props.theme === 'light' ? ['rgb(230,230,230)', 'rgb(210,210,210)'] : ['rgb(50,50,50)', 'rgb(70,70,70)'])
    const background = useSpring({
        background: palette[isHover ? 1 : 0],
        config: { duration: 100 }
    })
    return (
        <animated.span style={{ ...style, ...background }} className="BTNC" onClick={ props.onClick }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>{ props.children }</animated.span>
    )
}
const UpDown = (props) => {
    const style = {
        display: 'inline-block', width: '100px', height: '26px', borderRadius: '10px',
        border: '1px solid gray', marginLeft: '6px', marginRight: '6px', marginTop: '2px',
        textAlign: 'center', lineHeight: '26px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const clickUp = () => {
        if(props.value < props.max) props.handler(props.value + 1);
    }
    const clickDown = () => {
        if(props.value > props.min) props.handler(props.value - 1);
    }
    return (
        <div>
            <UpDownSwitch theme={ props.theme } onClick={ () => clickDown() }>-</UpDownSwitch>
            <span style={ style }>{ props.value }</span>
            <UpDownSwitch theme={ props.theme } onClick={ () => clickUp() }>+</UpDownSwitch>
        </div>
    )
}
const ThemeSpan = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', height: '30px', lineHeight: '30px', borderRadius: '15px',
        paddingLeft: '10px', paddingRight: '10px', marginRight: '5px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const bgdColor = (props.theme === 'light' ? 230 : 50);
    const background = useSpring({
        background: `rgba(${ bgdColor },${ bgdColor },${ bgdColor },${ props.selected || isHover ? 1 : 0 })`,
        config: { duration: 100 }
    })
    return (
        <animated.span style={{ ...style, ...background }} onClick={ props.onClick }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) } className="BTNC">{ props.children }</animated.span>
    )
}
const ThemeSetting = (props) => {
    return (
        <div>
            <ThemeItem theme={ props.theme } leftText="에디터 테마">
                <ThemeSpan theme={ props.theme } onClick={ () => props.changeTheme('vs') } selected={ props.etheme === 'vs' }>기본</ThemeSpan>
                <ThemeSpan theme={ props.theme } onClick={ () => props.changeTheme('vs-dark') } selected={ props.etheme === 'vs-dark' }>다크</ThemeSpan>
                <ThemeSpan theme={ props.theme } onClick={ () => props.changeTheme('hc-black') } selected={ props.etheme === 'hc-black' }>고대비</ThemeSpan>
            </ThemeItem>
            <ThemeItem theme={ props.theme } leftText="텍스트 크기">
                <UpDown theme={ props.theme } value={ props.fontSize } handler={ props.changeFontSize } min={ 10 } max={ 30 }/>
            </ThemeItem>
            <ThemeItem theme={ props.theme } leftText="자간">
                <UpDown theme={ props.theme } value={ props.letterSpacing } handler={ props.changeLetterSpacing } min={ 0 } max={ 5 }/>
            </ThemeItem>
            <ThemeItem theme={ props.theme } leftText="탭(들여쓰기) 크기">
                <UpDown theme={ props.theme } value={ props.tabSize } handler={ props.changeTabSize } min={ 1 } max={ 10 }/>
            </ThemeItem>
        </div>
    )
}

const EditerViewer = (props) => {
    const style = {
        width: '100%', height: '300px', borderRadius: '15px', overflow: 'hidden'
    }
    return (
        <div style={ style }>
            <CodeEditor height="100%" { ...props }/>
        </div>
    )
}

class Editor extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onCall = false;
    }
    btnConfig(){
        if(this.props.data.editor === undefined) return { background: ['rgb(237,28,36)', 'rgb(237,28,36)'], text: '저장 실패' };
        if(this.props.data.editor === null) return { background: ['rgb(120,120,120)', 'rgb(120,120,120)'], text: '저장 중...' };

        let check = false;
        if(this.props.data.editor.theme !== this.state.editorTheme) check = true;
        if(parseInt(this.props.data.editor.size) !== parseInt(this.state.editorFontSize)) check = true;
        if(parseInt(this.props.data.editor.letterspacing) !== parseInt(this.state.editorLetterSpacing)) check = true;
        if(parseInt(this.props.data.editor.tab) !== parseInt(this.state.editorTabSize)) check = true;

        if(check) return { background: ['rgb(50,140,250)', 'rgb(30,110,220)'], text: '저장하기' }
        else return { background: ['rgb(34,177,76)', 'rgb(34,177,76)'], text: '저장 완료' }
    }
    onClick(){
        if(this.onCall) return;
        this.onCall = true;
        this.props.stateHandler('editor', null, () => {
            const postData = {
                theme: this.state.editorTheme, size: String(this.state.editorFontSize),
                letterspacing: String(this.state.editorLetterSpacing), tab: String(this.state.editorTabSize)
            }
            axios.post('/json/setting/profile/editor/theme', postData).then((result) => {
                this.onCall = false;
                if(result.data.err) this.props.stateHandler('editor', undefined);
                else this.props.stateHandler('editor', result.data.content);
            });
        });
    }
    transStateData(name, value){
        const x = this.props.data.editor;
        x[name] = value;
        return x;
    }
    render(){
        if(this.state.editorTheme === undefined) this.state.editorTheme = this.props.data.editor.theme;
        if(this.state.editorFontSize === undefined) this.state.editorFontSize = parseInt(this.props.data.editor.size);
        if(this.state.editorLetterSpacing === undefined) this.state.editorLetterSpacing = parseInt(this.props.data.editor.letterspacing);
        if(this.state.editorTabSize === undefined) this.state.editorTabSize = parseInt(this.props.data.editor.tab);
        if(this.state.editorFont === undefined) this.state.editorFont = this.props.data.editor.font;

        return (
            <div className="ND">
                <Layout.Title icon={ svgEditor } theme={ this.props.theme }>에디터 기본 설정</Layout.Title>
                <EditerViewer theme={ this.state.editorTheme } letterSpacing={ this.state.editorLetterSpacing }
                fontSize={ this.state.editorFontSize } tabSize={ this.state.editorTabSize } font={ this.state.editorFont }/>

                <div style={{ height: '10px' }}/>
                <ThemeSetting theme={ this.props.theme } etheme={ this.state.editorTheme } fontSize={ this.state.editorFontSize }
                letterSpacing={ this.state.editorLetterSpacing } tabSize={ this.state.editorTabSize }
                changeTheme={ (x) => this.setState({ editorTheme: x }) } changeFontSize={ (x) => this.setState({ editorFontSize: x }) }
                changeLetterSpacing={ (x) => this.setState({ editorLetterSpacing: x }) } changeTabSize={ (x) => this.setState({ editorTabSize: x }) }/>
                <div style={{ height: '10px' }}/>
                <Layout.SubmitBtnLay background={ this.btnConfig().background } onClick={ () => this.onClick() }>{ this.btnConfig().text }</Layout.SubmitBtnLay>
                <Layout.Margin/>

                <Layout.Title icon={ svgFont } theme={ this.props.theme }>에디터 폰트</Layout.Title>
                <Layout.Content theme={ this.props.theme }>에디터 내부의 폰트를 설정합니다.</Layout.Content>
                <div style={{ height: '15px' }}/>
                <FontSetting theme={ this.props.theme } font={ this.state.editorFont } changeFont={ (x) => this.setState({ editorFont: x }) }/>
                <div style={{ height: '10px' }}/>
                <Layout.SubmitBtnAutoLay href="/json/setting/profile/editor/font" ori={ this.props.data.editor ? this.props.data.editor.font : undefined } value={ this.state.editorFont }
                handler={ (x, cb) => this.props.stateHandler('editor', this.transStateData('font', x), cb) }/>
            </div>
        )
    }
}

export default Editor