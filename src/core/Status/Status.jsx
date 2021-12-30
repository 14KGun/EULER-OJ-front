import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Top from './StatusTop/StatusTop';
import StatusTable from './StatusTable';
import PageSelector from '../Frame/PageSelector';
import Footer from '../Frame/Footer/Footer';
import Loading from '../Frame/Loading/Loading';
import axios from '../Tool/axios';
import getHref from '../Tool/getHref';

import svgFilter from './svg_filter.svg';
import svgClose from './svg_close.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}

const FilterBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        borderRadius: '10px', overflow: 'hidden', position: 'relative',
        height: '30px',
        background: `rgba(120,120,120,${ isHover ? 0.2 : 0 })`,
        config: { duration: 100 }
    });
    const styleTxt = {
        height: '30px', lineHeight: '30px', paddingLeft: '8px', paddingRight: '25px',
        fontSize: '16px', fontWeight: 400, color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleClose = {
        position: 'absolute', top: '6px', right: '5px',
        width: '20px', height: '20px',
    }

    return (
        <Link to={ props.to }>
            <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={ styleTxt }>{ props.text }</div>
                <img src={ svgClose } alt="close" style={ styleClose }/>
            </animated.div>
        </Link>
    )
}
const Filter = (props) => {
    const [isHover, setHover] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [problemId, setProblemId] = useState(props.problemId);
    const [loginId, setLoginId] = useState(props.loginId);
    const [result, setResult] = useState(props.result);
    const [lang, setLang] = useState(props.lang);

    let background = (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)');
    if(isHover || isOpen) background = (props.theme==='light' ? 'rgb(215,215,215)' : 'rgb(60,60,60)');
    
    const style = useSpring({
        background: background,
        borderRadius: '10px', overflow: 'hidden', position: 'relative',
        width: '100px', height: '30px', marginRight: '7px',
        config: { duration: 100 }
    });
    const styleFilterText = {
        position: 'absolute', top: '0px', left: '28px', height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 400, color: 'gray'
    }
    const styleBox = useSpring({
        background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'),
        borderRadius: '15px', overflow: 'hidden', position: 'relative',
        width: '100%',
        marginTop: (isOpen ? '10px' : '0px'), opacity: (isOpen ? 1 : 0),
        height: (isOpen ? '107px' : '0px'),
    });
    const styleBoxBtn = useSpring({
        background: (isHover2 ? 'rgb(0,110,170)' : 'rgb(0,134,191)'),
        paddingLeft: '17px', paddingRight: '17px', height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 300, color: 'white', borderRadius: '15px',
        config: { duration: 100 }
    })
    const styleInput = {
        border: '1px solid gray', outline: 'none', borderRadius: '5px', verticalAlign: 'top',
        background: (props.theme==='light' ? 'white' : 'black'),
        paddingLeft: '8px', paddingRight: '8px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white'),
        height: '30px', lineHeight: '30px'
    }
    const styleSelect = {
        border: 'none', outline: 'none',
        background: (props.theme==='light' ? 'white' : 'black'),
        paddingLeft: '8px', paddingRight: '8px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white'),
        width: '100%', height: '30px', lineHeight: '30px'
    }
    const styleSelectBorder = {
        border: '1px solid gray', outline: 'none', borderRadius: '5px',
        display: 'inline-block', verticalAlign: 'top',
        background: (props.theme==='light' ? 'white' : 'black'),
        height: '30px', overflow: 'hidden'
    }

    const FilterList = [];
    if(props.problemId !== '') {
        FilterList.push(<FilterBtn theme={ props.theme } text={ props.problemId } to={ `/status/${ getHref.encodeObject({ loginId: props.loginId, result: props.result, lang: props.lang }) }` }/>)
    }
    if(props.loginId !== '') {
        FilterList.push(<FilterBtn theme={ props.theme } text={ props.loginId } to={ `/status/${ getHref.encodeObject({ problemId: props.problemId, result: props.result, lang: props.lang }) }` }/>)
    }
    if(props.result !== '') {
        let text = props.result;
        if(text === 'accepted') text = '맞았습니다';
        else if(text === 'partial') text = '부분 점수';
        else if(text === 'time') text = '시간 초과';
        else if(text === 'memory') text = '메모리 초과';
        else if(text === 'output') text = '출력 초과';
        else if(text === 'runtime') text = '런타임 에러';
        else if(text === 'compile') text = '컴파일 에러';
        else if(text === 'wait') text = '채점 대기중';
        FilterList.push(<FilterBtn theme={ props.theme } text={ text } to={ `/status/${ getHref.encodeObject({ problemId: props.problemId, loginId: props.loginId, lang: props.lang }) }` }/>)
    }
    if(props.lang !== '') {
        let text = props.lang;
        if(text === 'c') text = 'C';
        else if(text === 'cpp') text = 'C++';
        else if(text === 'python') text = 'Python';
        else if(text === 'java') text = 'Java';
        else if(text === 'r') text = 'R';
        FilterList.push(<FilterBtn theme={ props.theme } text={ text } to={ `/status/${ getHref.encodeObject({ problemId: props.problemId, loginId: props.loginId, result: props.result }) }` }/>)
    }

    return (
        <>
            <div style={{ display: 'flex' }} className="ND">
                <animated.div style={ style } className="BTNC" onClick={ () => setOpen(!isOpen) }
                onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                    <img src={ svgFilter } alt="" style={{ position: 'absolute', top: '4px', left: '4px', height: '22px' }}/>
                    <div style={ styleFilterText }>검색 필터</div>
                </animated.div>
                { FilterList }
            </div>
            <animated.div style={ styleBox } className="ND">
                <div style={{ marginTop: '15px', marginLeft: '15px', marginRight: '15px' }}>
                    <input style={{ ...styleInput, marginRight: '6px', width: '120px' }} type="txt" placeholder="문제 번호(#)"
                    value={ problemId } onChange={ (e) => setProblemId(e.target.value) }/>
                    <animated.input style={{ ...styleInput, marginRight: '6px', width: '200px' }} type="txt" placeholder="아이디"
                    value={ loginId } onChange={ (e) => setLoginId(e.target.value) }/>
                    <animated.span style={{ ...styleSelectBorder, width: '170px', marginRight: '6px' }}>
                        <select style={{ ...styleSelect }} value={ result } onChange={ (e) => setResult(e.target.value) }>
                            <option value="">모든 결과</option>
                            <option value="accepted">맞았습니다</option>
                            <option value="partial">부분 점수</option>
                            <option value="time">시간 초과</option>
                            <option value="memory">메모리 초과</option>
                            <option value="output">출력 초과</option>
                            <option value="runtime">런타임 에러</option>
                            <option value="compile">컴파일 에러</option>
                            <option value="wait">채점 대기중</option>
                        </select>
                    </animated.span>
                    <animated.span style={{ ...styleSelectBorder, width: '170px' }}>
                        <select style={{ ...styleSelect }} value={ lang } onChange={ (e) => setLang(e.target.value) }>
                            <option value="">모든 언어</option>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="r">R</option>
                        </select>
                    </animated.span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '15px' }}>
                    <Link to={ `/status/${ getHref.encodeObject({ problemId: problemId, loginId: loginId, result: result, lang: lang }) }` }>
                        <animated.div style={ styleBoxBtn }
                        onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }>적용</animated.div>
                    </Link>
                </div>
            </animated.div>
        </>
    )
}

class Status extends Component {
    constructor(props){
        super(props);
        this.state = { myLoginId: undefined, problemId: undefined, loginId: undefined, result: undefined, lang: undefined, page: 1 }
    }
    render() {
        /* query */
        let query = {};
        try { query = getHref.decodeObject(this.props.id); }
        catch(e){ query = {}; }
        if(query.problemId && query.problemId[0] !== '#') query.problemId = '#'+query.problemId;
        if(!query.problemId || query.problemId.length > 30) query.problemId = '';
        if(!query.loginId || query.loginId.length > 30) query.loginId = '';
        if(!query.result || query.result.length > 30) query.result = '';
        if(!query.lang || query.lang.length > 30) query.lang = '';
        if(!query.page) query.page = 1;

        /* login-id */
        if(!this.onCallLoginId){
            this.onCallLoginId = true;
            axios.get('/json/logininfo').then(({ data }) => {
                this.setState({ myLoginId: data.id });
            })
        }

        /* container */
        const needLoad = (query.problemId !== this.state.problemId || query.loginId !== this.state.loginId || query.result !== this.state.result ||
            query.lang !== this.state.lang || query.page !== this.state.page);
        let container = <LoadingLay/>
        if(needLoad){
            if(!this.onCall){
                this.setState({ problemId: query.problemId, loginId: query.loginId, result: query.result, lang: query.lang, page: query.page }, () => {
                    this.onCall = false;
                })
            }
        }
        else{
            container = (
                <div>
                    <div style={{ height: '30px' }}/>
                    <Filter theme={ this.props.theme } problemId={ this.state.problemId } loginId={ this.state.loginId }
                    result={ this.state.result } lang={ this.state.lang }/>
                    <div style={{ height: '30px' }}/>
                    <StatusTable theme={ this.props.theme } list={ [123,123] }/>
                </div>
            )
        }

        /* top layout */
        const link1 = `/status/${ getHref.encodeObject({ problemId: query.problemId, result: query.result, lang: query.lang }) }`;
        const link2 = (this.state.myLoginId ? `/status/${ getHref.encodeObject({ problemId: query.problemId, result: query.result, lang: query.lang, loginId: this.state.myLoginId }) }` : undefined);
        let subtitle = '';
        if(query.problemId) subtitle = ` - ${ query.problemId }`;
        else if(query.loginId) subtitle = ` - ${ query.loginId }`;
        // else if(query.loginId) subtitle = ` - ${ query.loginId }`;

        return (
            <div>
                <Helmet><title>채점 : 오일러OJ</title></Helmet>
                <Top category1={ query.loginId==='' } category2={ query.loginId===this.state.myLoginId } link1={ link1 } link2={ link2 } subtitle={ subtitle }/>
                <div className="FRAME_MAIN">{ container }</div>
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Status;