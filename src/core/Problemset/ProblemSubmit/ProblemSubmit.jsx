import { Component, useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Helmet } from "react-helmet";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import CodeEditor from '../../Frame/CodeEditor/CodeEditor';
import Popup from './ProblemSubmitPopup';
import TopMessage from '../ProblemViewer/TopMessage';
import Footer from '../../Frame/Footer/Footer';
import Tooltip from  '../../Tool/tooltip';
import axios from '../../Tool/axios';
import getHref from '../../Tool/getHref';
import possibleInput from '../../Tool/possibleInput';
import imgSubmit from './img_submit.png';
import svgSort from './svg_sort.svg';
import svgSetting from './svg_setting.svg';

const Top = (props) => {
    const txtStyle = {
        height: '50px', lineHeight: '50px', display: 'inline-block',
        fontSize: '27px', fontWeight: 700, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleImg = {
        width: '50px', height: '50px', verticalAlign: 'middle', marginTop: '-13px'
    }
    return (
        <div style={{ paddingTop: '100px', marginBottom: '15px' }}>
            <img style={ styleImg } src={ imgSubmit } alt=""/>
            <span style={ txtStyle }>소스 코드 제출</span>
        </div>
    )
}

const BtnBack = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgba(120,120,120,0.3)' : 'rgba(120,120,120,0)',
        config: { duration: 150 }
    }).background;
    const onMouseEnter = () => {
        setHover(true);
    };
    const onMouseLeave = () => {
        setHover(false);
    }
    const style = {
        display: 'inline-block',
        height: '26px', lineHeight: '26px',
        borderRadius: '15px',
        paddingLeft: '20px', paddingRight: '20px', marginRight: '10px',
        fontSize: '16px', fontWeight: '500', border: '2px solid rgb(150,150,150)',
        color: (props.theme === 'light' ? 'rgb(100,100,100)' : 'rgb(150,150,150)')
    }
    return (
        <Link to={ `/problemset/viewer/${ props.id }` }>
            <animated.span style={{ ...style, background: background }}
            onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>문제로 돌아가기</animated.span>
        </Link>
    )
}
const BtnSubmit = (props) => {
    const onSubmit = useRef(false);
    const [submitId, setSubmitId] = useState(undefined);
    const [isHover, setHover] = useState(false);

    const background = useSpring({
        background: isHover ? 'rgb(0,110,170)' : 'rgb(0,134,191)',
        config: { duration: 150 }
    }).background;
    const onMouseEnter = () => {
        setHover(true);
    };
    const onMouseLeave = () => {
        setHover(false);
    }
    const style = {
        display: 'inline-block',
        height: '30px', lineHeight: '30px',
        borderRadius: '15px',
        paddingLeft: '20px', paddingRight: '20px',
        color: 'white', fontSize: '16px', fontWeight: '300'
    }

    const onClick = () => {
        const editor = document.getElementById('code-editor').editor;
        if(!props.lang) return;
        if(!editor) return;

        const source = editor.getValue();
        if(source === ''){ alert('소스 코드를 입력하세요.'); return; }
        if(!possibleInput.source(source)){ alert('소스 코드가 너무 길어요.'); return; }

        if(!onSubmit.current){
            onSubmit.current = true;
            axios.post(`/json/problems/submit/${ props.id }`, { source: source, lang: props.lang }).then(result => {
                if(result.data.id){
                    setSubmitId(result.data.id)
                }
                else{
                    alert('서버 오류로 제출에 실패하였습니다.');
                }
            })
        }
    }

    return (
        <>
            <animated.span style={{ ...style, background: background }} className="BTNC" onClick={ () => onClick() }
            onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>이 소스 코드 제출하기</animated.span>
            { submitId ? <Redirect to={ `/status/result/${ submitId }` }/> : <></> }
        </>
    )
}
const BtnSort = (props) => {
    const [isHover, setHover] = useState(false);
    const [tooltipId, settooltipId] = useState('undefined');
    const background = useSpring({
        background: isHover ? 'rgba(150,150,150,0.3)' : 'rgba(150,150,150,0)',
        config: { duration: 150 }
    }).background;
    const onMouseEnter = () => {
        setHover(true);
        const id = props.tooltip.create(document.getElementById(`btn-sort`), 'top', '언어 정렬 설정으로 이동');
        settooltipId(id);
    };
    const onMouseLeave = () => {
        setHover(false);
        props.tooltip.remove(tooltipId);
    }
    const style = {
        position: 'absolute', top: '0px', left: '225px', width: '30px', height: '30px', borderRadius: '10px'
    };
    const styleImg = {
        width: '60%', height: '60%', margin: '20%'
    }
    return (
        <Link to="/setting/profile/langsort">
            <animated.div id="btn-sort" style={{ ...style, background: background }} onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>
                <img src={ svgSort } style={ styleImg } alt="sort"/>
            </animated.div>
        </Link>
    )
}

const Lay1 = (props) => {
    const style = {
        position: 'absolute', top: '0px', left: '0px',
        width: '200px', height: '200px', borderRadius: '15px'
    }
    const txt1Style = {
        fontSize: '15px', fontWeight: '400', color: 'gray'
    }
    const txt2Style = {
        fontSize: '18px', fontWeight: '700', color: (props.theme === 'light' ? 'black' : 'white')
    }
    const background = useSpring({
        background: props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'
    })

    return (
        <animated.div style={{ ...style, ...background }}>
            <div style={{ ...txt1Style, marginTop: '20px', marginLeft: '20px' }}>{ props.waitTime !== undefined ? '예상 채점 대기시간' : '' }</div>
            <div style={{ ...txt2Style, marginTop: '0px', marginLeft: '20px' }}>{ props.waitTime !== undefined ? `${ props.waitTime }초` : '' }</div>
            <div style={{ ...txt1Style, marginTop: '20px', marginLeft: '20px' }}>{ props.waitCount !== undefined ? '채점 대기 중인 소스코드' : '' }</div>
            <div style={{ ...txt2Style, marginTop: '0px', marginLeft: '20px' }}>{ props.waitCount !== undefined ? `${ props.waitCount }개` : '' }</div>
        </animated.div>
    );
}
const Lay2 = (props) => {
    const [lang, changeLang] = useState('');
    const style = {
        position: 'absolute', top: '0px', left: '210px', right: '0px',
        height: '200px', borderRadius: '15px'
    }
    const txt1Style = {
        fontSize: '15px', fontWeight: '400', color: 'gray'
    }
    const txt2Style = {
        fontSize: '20px', fontWeight: '800',
        color: (props.theme === 'light' ? 'black' : 'white')
    }
    const selectStyle = {
        marginLeft: '20px', width: '200px', height: '30px',
        background: (props.theme === 'light' ? 'white' : 'black'),
        color: (props.theme === 'light' ? 'black' : 'white')
    }
    const background = useSpring({ background: props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)' })

    const onChange = (x) => {
        changeLang(x);
        props.langHandler(x);
        if(props.python3Warning === false && x === 'python3'){
            props.setPython3Warning(true);
        }
        else if(props.python3Warning === true && x !== 'python3'){
            props.setPython3Warning(false);
        }
    }

    if(lang==='' && props.langSubmit.length>0){
        changeLang(props.langSubmit[0]);
        props.langHandler(props.langSubmit[0]);
    }
    return (
        <animated.div style={{ ...style, ...background }}>
            <div style={{ ...txt1Style, marginTop: '20px', marginLeft: '20px' }}>#{ props.id }</div>
            <div style={{ ...txt2Style, marginTop: '0px', marginLeft: '20px' }}>{ props.title }</div>
            <div style={{ ...txt1Style, marginTop: '20px', marginLeft: '20px' }}>제출 언어</div>
            <div style={{ position: 'relative' }}>
                <select style={ selectStyle } onChange={ (e) => onChange(e.target.value) } value={ lang }>
                    { props.langSubmit.map((element, index) => <option value={ element } key={ index }>{ props.langShow[index] }</option>) }
                </select>
                <BtnSort tooltip={ props.tooltip } theme={ props.theme }/>
            </div>
            <div style={{ position: 'absolute', left: '20px', right: '20px', bottom: '20px', textAlign: 'right' }}>
                <BtnBack id={ props.id } theme={ props.theme }/>
                <BtnSubmit id={ props.id } theme={ props.theme } lang={ lang }/>
            </div>
        </animated.div>
    );
}

const Editor = (props) => {
    const [isHover, setHover] = useState(false);
    const [height, setHeight] = useStateWithCallbackLazy('500px');
    const [tooltipId, settooltipId] = useState('undefined');
    const background = useSpring({
        background: isHover ? 'rgba(100,100,100,1)' : 'rgba(100,100,100,0)',
        config: { duration: 150 }
    }).background;
    const onMouseEnter = () => {
        setHover(true);
        const id = props.tooltip.create(document.getElementById(`btn-editorsetting`), 'top', '에디터 설정으로 이동');
        settooltipId(id);
    };
    const onMouseLeave = () => {
        setHover(false);
        props.tooltip.remove(tooltipId);
    }

    const style = {
        marginTop: '10px', position: 'relative',
        background: 'rgb(80,80,80)', borderRadius: '15px', overflow: 'hidden',
        border: '1px solid rgb(80,80,80)'
    }
    const styleTxt = {
        height: '50px', lineHeight: '50px', paddingLeft: '20px',
        color: 'white', fontSize: '16px', fontWeight: '400'
    }
    const styleBtnSetting = {
        position: 'absolute', top: '10px', right: '15px', width: '30px', height: '30px', borderRadius: '10px'
    }
    const styleImg = {
        width: '20px', height: '20px', margin: '5px'
    }

    const onChange = (code) => {
        let lineHeight = 22;
        const lines = document.getElementsByClassName('view-line');
        if(lines.length > 0){
            lineHeight = lines[0].clientHeight;
        }

        const codeHeight = code.split('\n').length;
        const newHeight = Math.max(500, codeHeight*lineHeight+200);
        if(`${ newHeight }px` !== height){
            setHeight(`${ newHeight }px`, () => props.reFooter());
        }
    }

    useEffect(() => {
        props.reFooter();
    });

    if(!props.option){
        return (
            <></>
        )
    }
    return (
        <div style={ style }>
            <div style={ styleTxt }>소스 코드 입력</div>
            <Link to="/setting/profile/editor">
                <animated.div id="btn-editorsetting" style={{ ...styleBtnSetting, background: background }} onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>
                    <img style={ styleImg } src={ svgSetting } alt="setting"/>
                </animated.div>
            </Link>
            <div style={{ width: '100%', height: height }}>
                <CodeEditor lang={ props.lang } theme={ props.option.theme } letterSpacing={ props.option.letterSpacing }
                fontSize={ props.option.size } tabSize={ props.option.tab } font={ props.option.font } initCode="" height="100%" onChange={ (x) => onChange(x) }/>
            </div>
        </div>
    )
}

class ProblemSubmit extends Component {
    constructor(props){
        super(props);
        this.tooltip = new Tooltip();
        this.state = {
            python3Warning: false, lang: undefined,
            id: undefined, title: undefined, waitTime: undefined, waitCount: undefined, editor: undefined, langShow: [], langSubmit: [], err: undefined
        };
        this.onCall = false;
    }
    setPython3Warning(val){
        this.setState({ python3Warning: val });
    }
    render() {
        if(this.state.id !== this.props.id){
            if(!this.onCall){
                this.onCall = true;
                axios.post('/json/problems/submit/getInfo', { id: String(this.props.id) }).then((result) => {
                    this.onCall = false;
                    if(result.data.err) this.setState({ err: result.data.err });
                    else this.setState({
                        err: undefined, id: result.data.problemId, title: result.data.title,
                        waitCount: result.data.waitCount, waitTime: result.data.waitTime,
                        editor: result.data.editor, langShow: result.data.langShow, langSubmit: result.data.langSubmit
                    })
                })
            }
        }

        const Python3DengerMsg = () => (
            <>
                <div style={{ height: '10px' }}/>
                <TopMessage type="python3Warning"/>
            </>
        );

        if(this.state.err === 'login'){
            return (
                <Redirect to={ getHref.loginCurrentUrl() }/>
            )
        }
        if(this.state.err){
            return (
                <>
                    <Helmet><title>소스 코드 제출 : 오일러OJ</title></Helmet>
                    <div className="FRAME_MAIN ND">
                        <div style={{ height: '100px' }}/>
                        <div style={{ fontSize: '16px', color: (this.props.theme==='light'?'black':'white') }}>제출을 할 수 없음</div>
                        <div style={{ fontSize: '16px', color: (this.props.theme==='light'?'black':'white') }}>해당 문제는 제출이 금지된 문제이거나 존재하지 않는 문제입니다.</div>
                    </div>
                    <div className="BTM_EMPTY"/>
                    <Footer theme={ this.props.theme }/>
                </>
            )
        }
        return (
            <>
                <Helmet><title>소스 코드 제출 : 오일러OJ</title></Helmet>
                <div className="FRAME_MAIN ND">
                    <Top theme={ this.props.theme }/>
                    <div style={{ height: 200, position: 'relative' }}>
                        <Lay1 theme={ this.props.theme } waitTime={ this.state.waitTime } waitCount={ this.state.waitCount }/>
                        <Lay2 theme={ this.props.theme } id={ this.props.id } title={ this.state.title } tooltip={ this.tooltip } langSubmit={ this.state.langSubmit } langShow={ this.state.langShow }
                        setPython3Warning={ (val) => this.setPython3Warning(val) } python3Warning={ this.state.python3Warning } langHandler={ (x) => this.setState({ lang: x }) }/>
                    </div>
                    { this.state.python3Warning && <Python3DengerMsg/> }
                    <Editor option={ this.state.editor } lang={ this.state.lang } tooltip={ this.tooltip } reFooter={ this.props.reFooter }/>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
                {/* { this.state.popup ? <Popup/> : <></> } */}
            </>
        );
    }
    componentWillUnmount(){
        this.tooltip.clear();
    }
}

export default ProblemSubmit;