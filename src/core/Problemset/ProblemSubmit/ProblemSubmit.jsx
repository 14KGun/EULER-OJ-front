import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import CodeEditor from '../../Frame/CodeEditor/CodeEditor';
import Footer from '../../Frame/Footer';
import Tooltip from  '../../Tool/tooltip';
import imgSubmit from './img_submit.png';
import svgSort from './svg_sort.svg';
import svgSetting from './svg_setting.svg';

const Top = () => {
    const txtStyle = {
        height: '50px', lineHeight: '50px', display: 'inline-block',
        fontSize: '27px', fontWeight: 700, color: 'black'
    }
    const styleImg = {
        width: '50px', height: '50px', verticalAlign: 'middle', marginTop: '-13px'
    }
    return (
        <div style={{ marginTop: '100px', marginBottom: '15px' }}>
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
        color: 'rgb(100,100,100)', fontSize: '16px', fontWeight: '500', border: '2px solid rgb(150,150,150)'
    }
    return (
        <Link to={ `/problemset/problem/${ props.id }` }>
            <animated.span style={{ ...style, background: background }} onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>문제로 돌아가기</animated.span>
        </Link>
    )
}
const BtnSubmit = (props) => {
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
    return (
        <animated.span style={{ ...style, background: background }} onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>이 소스 코드 제출하기</animated.span>
    )
}
const BtnSort = (props) => {
    const [isHover, setHover] = useState(false);
    const [tooltipId, settooltipId] = useState('undefined');
    const background = useSpring({
        background: isHover ? 'rgba(200,200,200,1)' : 'rgba(200,200,200,0)',
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
        <a href="/setting/profile?page=langsort">
            <animated.div id="btn-sort" style={{ ...style, background: background }} onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>
                <img src={ svgSort } style={ styleImg } alt="sort"/>
            </animated.div>
        </a>
    )
}

class Lay1 extends Component {
    constructor(props){
        super(props);
        this.style = {
            position: 'absolute', top: '0px', left: '0px',
            width: '200px', height: '200px',
            background: 'rgb(230,230,230)', borderRadius: '15px'
        }
        this.txt1Style = { fontSize: '15px', fontWeight: '400', color: 'gray' }
        this.txt2Style = { fontSize: '18px', fontWeight: '500', color: 'black' }
    }
    render() {
        return (
            <div style={ this.style }>
                <div style={{ ...this.txt1Style, marginTop: '20px', marginLeft: '20px' }}>예상 채점 대기시간</div>
                <div style={{ ...this.txt2Style, marginTop: '0px', marginLeft: '20px' }}>17.02초</div>
                <div style={{ ...this.txt1Style, marginTop: '20px', marginLeft: '20px' }}>채점 대기 중인 소스코드</div>
                <div style={{ ...this.txt2Style, marginTop: '0px', marginLeft: '20px' }}>2개</div>
            </div>
        );
    }
}
class Lay2 extends Component {
    constructor(props){
        super(props);
        this.state = { lang: 'c++11' };
        this.style = {
            position: 'absolute', top: '0px', left: '210px', right: '0px',
            height: '200px',
            background: 'rgb(230,230,230)', borderRadius: '15px'
        }
        this.txt1Style = { fontSize: '15px', fontWeight: '400', color: 'gray' }
        this.txt2Style = { fontSize: '20px', fontWeight: '800', color: 'black' }
        this.selectStyle = { marginLeft: '20px', width: '200px', height: '30px' }
    }
    onChange(lang){
        this.setState({ lang: lang });
        if(this.props.python3Warning === false && lang === 'python3'){
            this.props.setPython3Warning(true);
        }
        else if(this.props.python3Warning === true && lang !== 'python3'){
            this.props.setPython3Warning(false);
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps === this.props) return false;
        return true;
    }
    render() {
        return (
            <div style={ this.style }>
                <div style={{ ...this.txt1Style, marginTop: '20px', marginLeft: '20px' }}>#{ this.props.id }</div>
                <div style={{ ...this.txt2Style, marginTop: '0px', marginLeft: '20px' }}>가로세로 낱말퀴즈</div>
                <div style={{ ...this.txt1Style, marginTop: '20px', marginLeft: '20px' }}>제출 언어</div>
                <div style={{ position: 'relative' }}>
                    <select style={ this.selectStyle } onChange={ (e) => this.onChange(e.target.value) }>
                        <option value="c++11">C++11</option>
                        <option value="python3">Python3</option>
                    </select>
                    <BtnSort tooltip={ this.props.tooltip }/>
                </div>
                <div style={{ position: 'absolute', left: '20px', right: '20px', bottom: '20px', textAlign: 'right' }}>
                    <BtnBack id={ this.props.id }/>
                    <BtnSubmit id={ this.props.id }/>
                </div>
            </div>
        );
    }
}

const Editor = (props) => {
    const [isHover, setHover] = useState(false);
    const [tooltipId, settooltipId] = useState('undefined');
    const background = useSpring({
        background: isHover ? 'rgba(100,100,100,1)' : 'rgba(100,100,100,0)',
        config: { duration: 150 }
    }).background;
    const onMouseEnter = () => {
        setHover(true);
        const id = props.tooltip.create(document.getElementById(`btn-editorsetting`), 'top', '언어 정렬 설정으로 이동');
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
    return (
        <div style={ style }>
            <div style={ styleTxt }>소스 코드 입력</div>
            <a href="/setting/profile?page=theme2">
                <animated.div id="btn-editorsetting" style={{ ...styleBtnSetting, background: background }} onMouseEnter={ () => onMouseEnter() } onMouseLeave={ () => onMouseLeave() }>
                    <img style={ styleImg } src={ svgSetting } alt="setting"/>
                </animated.div>
            </a>
            <CodeEditor/>
        </div>
    )
}

class ProblemSubmit extends Component {
    constructor(props){
        super(props);
        this.tooltip = new Tooltip();
        this.state = { python3Warning: false }
    }
    setPython3Warning(val){
        this.setState({ python3Warning: val });
    }
    render() {
        return (
            <>
                <div className="FRAME_MAIN ND">
                    <Top/>
                    <div style={{ height: 200, position: 'relative' }}>
                        <Lay1 id={ this.props.id }/>
                        <Lay2 id={ this.props.id } tooltip={ this.tooltip }
                        setPython3Warning={ (val) => this.setPython3Warning(val) } python3Warning={ this.state.python3Warning }/>
                    </div>
                    <Editor tooltip={ this.tooltip }/>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer/>
            </>
        );
    }
    componentWillUnmount(){
        this.tooltip.clear();
    }
}

export default ProblemSubmit;