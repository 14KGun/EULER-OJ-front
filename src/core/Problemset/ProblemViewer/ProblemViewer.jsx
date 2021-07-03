import React, { Component, useState } from 'react';
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from  '../../Tool/tooltip';
import axios from '../../Tool/axios';
import Loading from '../../Frame/Loading/Loading';
import TopMessage from './TopMessage';
import Bookmark from './Bookmark/Bookmark';
import Res from '../../Frame/Res/Res';
import PageNotFound from '../../Frame/PageNotFound/PageNotFound';
import Footer from '../../Frame/Footer'
import './ProblemViewer.css';
import imgEditor from './img_editor.png';
import imgSubmit from './img_submit.png';
import imgBoard1 from './img_board1.png';
import imgBoard3 from './img_board3.png';
import imgNext from './img_next.png';
import imgCopy from './img_copy.png';
import imgYoutube from '../../Tag/TagIcon/img_youtubeLight.png';
import imgBlog from '../../Tag/TagIcon/img_blogLight.png';

const htmlParser = (html) => {
    html = html.split('/sysfile/problems/img/').join('/exposure/problemsImg/');
    html = html.split('src="/exposure/problemsImg/').join('src="https://euleroj.io/exposure/problemsImg/');
    if(html.indexOf('<!--Separation:Bottom-->') !== -1){
        const sep = html.split('<!--Separation:Bottom-->');
        return [sep[0], sep[1]];
    }
    else return [html, '']
}
const sampleTransfer = (html) => {
    return html.split("\n").join("<br>").split(" ").join("&nbsp;");
}

const Tag = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgb(230,230,230)' : 'white',
        config: { duration: 100 }
    }).background;

    return (
        <Link to={ props.url } style={{ marginRight: '3px' }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <animated.span className="TAG" style={{ background: background }}>{ props.name }</animated.span>
        </Link>
    )
}
const TagsLay = (props) => {
    return (
        <>
            { props.tags.map((item, index) => {
                const url = item.url;
                const name = item.name.replace('(','ooppeenn').replace(')','cclloossee').replace(/ooppeenn.*cclloossee/,'').trim();
                return <Tag key={ index } url={ url } name={ name }/>
            }) }
        </>
    );
}
const BtnEditor = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        background: isHover ? 'rgb(0,150,200)' : 'rgb(0,134,191)',
        boxShadow: isHover ? '0 0 10px 5px rgb(0,0,0,0.2)' : '0 0 6px 3px rgb(0,0,0,0.12)',
        config: { duration: 150 }
    });

    return (
        <a href={`/problemset/editor/${props.id}`}>
            <animated.div className="right_TOPBTN" id="btn_editor" style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ imgEditor } alt=""/>
                <div>코딩 시작하기</div>
            </animated.div>
        </a>
    )
}
const BtnSubmit = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        background: isHover ? 'rgb(50,190,100)' : 'rgb(34,177,76)',
        boxShadow: isHover ? '0 0 10px 5px rgb(0,0,0,0.2)' : '0 0 6px 3px rgb(0,0,0,0.12)',
        config: { duration: 150 }
    });

    return (
        <a href={`/problemset/submit/${props.id}`}>
            <animated.div className="right_TOPBTN" id="btn_submit" style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ imgSubmit } alt=""/>
                <div>제출하기</div>
            </animated.div>
        </a>
    )
}
const BoxLink = (props) => {
    const urlYoutube = props.youtube ? props.youtube : '';
    const urlBlog = props.blog ? props.blog : '';
    
    const [isYoutubeHover, setYoutubeHover] = useState(false);
    const [tooltipYoutube, setTooltipYoutube] = useState(false);
    const YoutubeHover = () => {
        setYoutubeHover(true);
        const id = props.tooltip.create(document.getElementById(`btnYoutube`), 'top', '유튜브를 새 탭에서 엽니다');
        setTooltipYoutube(id);
    }
    const YoutubeHoverOut = () => {
        setYoutubeHover(false);
        props.tooltip.remove(tooltipYoutube);
    }
    const youtubeStyle = useSpring({
        background: isYoutubeHover ? 'rgb(235,235,235)' : 'white',
        config: { duration: 150 }
    })
    const youtubeNextStyle = useSpring({
        opacity: isYoutubeHover ? 1 : 0,
        config: { duration: 150 }
    });
    
    const [isBlogHover, setBlogHover] = useState(false);
    const [tooltipBlog, setTooltipBlog] = useState(false);
    const BlogHover = () => {
        setBlogHover(true);
        const id = props.tooltip.create(document.getElementById(`btnBlog`), 'top', '블로그를 새 탭에서 엽니다');
        setTooltipBlog(id);
    }
    const BlogHoverOut = () => {
        setBlogHover(false);
        props.tooltip.remove(tooltipBlog);
    }
    const blogStyle = useSpring({
        background: isBlogHover ? 'rgb(235,235,235)' : 'white',
        config: { duration: 150 }
    })
    const blogNextStyle = useSpring({
        opacity: isBlogHover ? 1 : 0,
        config: { duration: 150 }
    });

    const BtnYoutube = (
        <a href={ urlYoutube } target="_blank" rel="noreferrer">
            <animated.div className="right_TOBBOX-BTN" id="btnYoutube" style={ youtubeStyle }
            onMouseEnter={ YoutubeHover } onMouseLeave={ YoutubeHoverOut }>
                <img className="right_TOBBOX-BTN-LOGO1" src={ imgYoutube } alt=""/>
                <div className="right_TOBBOX-BTN-TXT">유튜브</div>
                <animated.img className="right_TOBBOX-next" src={ imgNext } alt="" style={ youtubeNextStyle }/>
            </animated.div>
        </a>
    );
    const BtnBlog = (
        <a href={ urlBlog } target="_blank" rel="noreferrer">
            <animated.div className="right_TOBBOX-BTN" id="btnBlog" style={ blogStyle }
            onMouseEnter={ BlogHover } onMouseLeave={ BlogHoverOut }>
                <img className="right_TOBBOX-BTN-LOGO1" src={ imgBlog } alt=""/>
                <div className="right_TOBBOX-BTN-TXT">블로그</div>
                <animated.img className="right_TOBBOX-next" src={ imgNext } alt="" style={ blogNextStyle }/>
            </animated.div>
        </a>
    )

    if(urlYoutube === '' && urlBlog === '') return <></>;
    return (
        <div className="right_TOPBOX">
            <div className="right_TOPBOX-TITLE">해설 바로가기</div>
            { urlYoutube !== '' ? BtnYoutube : <></> }
            { urlBlog !== '' ? BtnBlog : <></> }
        </div>
    )
}
const BoxStat = (props) => {
    const solveInt = parseInt(props.solve);
    const submitInt = parseInt(props.submit);
    const dataPercent = isNaN(solveInt / submitInt) ? 'NaN' : (solveInt / submitInt * 100.0).toFixed(1);

    const [isHover, setHover] = useState(false);
    const style = useSpring({
        background: isHover ? 'rgb(245,245,245)' : 'white',
        config: { duration: 100 }
    })

    return (
        <>
            <Helmet>
                <script>{`
                    require(['https://euleroj.io/exposure/scripts/easypiechart.min.js'], () => {
                        const donutchart = document.getElementById('donutchart');
                        new EasyPieChart(donutchart, {
                            barColor: 'rgb(240,100,40)', //차트가 그려질 색 
                            trackColor: 'rgb(230,230,230)', // 차트가 그려지는 트랙의 기본 배경색(chart1 의 회색부분) 
                            scaleColor: 'rgb(240,240,240)', // 차트 테두리에 그려지는 기준선 (chart2 의 테두리 선) 
                            lineCap: 'round', // 차트 선의 모양 chart1 butt / chart2 round / chart3 square 
                            lineWidth: 20, // 차트 선의 두께 
                            size: 130, // 차트크기 
                            animate: 1000, // 그려지는 시간 
                        });
                    });
                `}</script>
            </Helmet>
            <div className="right_TOPBOX">
                <div className="right_TOPBOX-TITLE">통계</div>
                <a href={`/problemset/stats/${ props.id }`}>
                    <animated.div id="donutchart-container" style={ style }
                    onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                        <div id="donutchart" data-percent={ dataPercent }>
                            <div id="percent">{ dataPercent }%</div>
                        </div>
                    </animated.div>
                </a>
                <div className="right_TOPBOX-L right_TOPBOX-L-BORDER">
                    <div className="right_TOPBOX-L-LEFT">맞은 사람</div>
                    <div className="right_TOPBOX-L-RIGHT">{ props.solve }</div>
                </div>
                <div className="right_TOPBOX-L">
                    <div className="right_TOPBOX-L-LEFT">제출 횟수</div>
                    <div className="right_TOPBOX-L-RIGHT">{ props.submit }</div>
                </div>
            </div>
        </>
    )
}
const BoxStatus = (props) => {
    const [isHover1, setHover1] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const background1 = useSpring({
        background: isHover1 ? 'rgb(235,235,235)' : 'white',
        config: { duration: 100 }
    }).background;
    const background2 = useSpring({
        background: isHover2 ? 'rgb(235,235,235)' : 'white',
        config: { duration: 100 }
    }).background;
    const next1Style = useSpring({
        opacity: isHover1 ? 1 : 0,
        config: { duration: 100 }
    })
    const next2Style = useSpring({
        opacity: isHover2 ? 1 : 0,
        config: { duration: 100 }
    })

    return (
        <div className="right_TOPBOX">
            <div className="right_TOPBOX-TITLE">채점 기록</div>
            <a href={`/status?pid=${props.id}`}>
                <animated.div className="right_TOBBOX-BTN" style={{ background: background1 }}
                onMouseEnter={ () => setHover1(true) } onMouseLeave={ () => setHover1(false) }>
                    <img className="right_TOBBOX-BTN-LOGO1" src={ imgBoard3 } alt=""/>
                    <div className="right_TOBBOX-BTN-TXT">전체 채점 기록</div>
                    <animated.img className="right_TOBBOX-next" src={ imgNext } alt="" style={ next1Style }/>
                </animated.div>
            </a>
            <a href={`/status?pid=${props.id}&lid=${props.loginId ? props.loginId : ''}`}>
                <animated.div className="right_TOBBOX-BTN" style={{ background: background2 }}
                onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }>
                    <img className="right_TOBBOX-BTN-LOGO1" src={ imgBoard1 } alt=""/>
                    <div className="right_TOBBOX-BTN-TXT">내 채점 기록</div>
                    <animated.img className="right_TOBBOX-next" src={ imgNext } alt="" style={ next2Style }/>
                </animated.div>
            </a>
            { props.res !== undefined && props.res !== 0 ? <div id="res"><Res res={ props.res }/></div> : <></> }
        </div>
    )
}
const BoxLimit = (props) => {
    return (
        <div className="right_TOPBOX">
            <div className="right_TOPBOX-TITLE">제한</div>
            <div className="right_TOPBOX-L right_TOPBOX-L-BORDER" style={{ marginTop: '10px' }}>
                <div className="right_TOPBOX-L-LEFT">시간</div>
                <div className="right_TOPBOX-L-RIGHT">{ props.time }초</div>
            </div>
            <div className="right_TOPBOX-L right_TOPBOX-L-BORDER">
                <div className="right_TOPBOX-L-LEFT">메모리</div>
                <div className="right_TOPBOX-L-RIGHT">{ props.memory }MB</div>
            </div>
            <div className="right_TOPBOX-L right_TOPBOX-L-BORDER">
                <div className="right_TOPBOX-L-LEFT">입력 방식</div>
                <div className="right_TOPBOX-L-RIGHT">{ props.input }</div>
            </div>
            <div className="right_TOPBOX-L">
                <div className="right_TOPBOX-L-LEFT">출력 방식</div>
                <div className="right_TOPBOX-L-RIGHT">{ props.output }</div>
            </div>
        </div>
    )
}
const CopyBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const [tooltipId, settooltipId] = useState('undefined');
    const onMouseEnter = () => {
        setHover(true);
        const id = props.tooltip.create(document.getElementById(`copyBtn-${ props.index }`), 'top', '클립보드에 복사하기');
        settooltipId(id);
    }
    const onMouseLeave = () => {
        setHover(false);
        props.tooltip.remove(tooltipId);
    }
    const onClick = () => {
        props.tooltip.remove(tooltipId);
        const id = props.tooltip.create(document.getElementById(`copyBtn-${ props.index }`), 'top', '클립보드에 복사되었습니다', 'rgb(34,177,76)');
        settooltipId(id);
    }
    const style = useSpring({
        background: isHover ? 'rgb(145,145,145)' : 'rgb(165,165,165)',
        config: { duration: 100 }
    })

    return (
        <>
            <CopyToClipboard text={ props.txt } onCopy={ onClick }>
                <animated.div id={ `copyBtn-${ props.index }` } className="EXBTN-TOP-COPYBTN BTNC" style={ style }
                onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave }>
                    <img src={ imgCopy } alt="copy"/>
                </animated.div>
            </CopyToClipboard>
        </>
    );
}

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }} className="ND">
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>문제 불러오는 중...</div>
        </div>
    )
}

const problemDefaultState = {
    id: undefined, loaded: false, err: false,
    title: undefined, problemHtml: undefined, tags: [], loginId: undefined,
    sampleInput: [], sampleOutput: [], youtube: '', blog: '',
    solve: '', submit: '', timelimit: '', memorylimit: '', inputmethod: '', outputmethod: '',
    res: undefined
}
class ProblemViewer extends Component {
    constructor(props){
        super(props);
        this.state = problemDefaultState;
        this.tooltip = new Tooltip();
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.id !== prevState.id){
            window.scrollTo(0,0);
            return { ...problemDefaultState, id: nextProps.id, loaded: false };
        }
        return prevState;
    }

    isneedMsg1(){
        if(this.state.tags === undefined) return false;
        for(var i=0; i<this.state.tags.length; i++){
            if(this.state.tags[i].name === '제출이 금지됨') return true;
        }
        return false;
    }
    isneedMsg2(){
        return false;
    }

    render() {
        if(this.state.loaded === false){
            axios.get(`/json/problems/problem/${ this.state.id }`).then((probInfo) => {
                this.setState({
                    loaded: true, err: probInfo.data.err,
                    title: probInfo.data.title, problemHtml: probInfo.data.problemHtml, tags: probInfo.data.tags, loginId: probInfo.data.loginId,
                    sampleInput: probInfo.data.sampleInput, sampleOutput: probInfo.data.sampleOutput, youtube: probInfo.data.youtube, blog: probInfo.data.blog,
                    solve: probInfo.data.solve, submit: probInfo.data.submit,
                    timelimit: probInfo.data.timelimit, memorylimit: probInfo.data.memorylimit, inputmethod: probInfo.data.inputmethod, outputmethod: probInfo.data.outputmethod,
                });
            });
            axios.get(`/json/problems/problemres/${ this.state.id }`).then((resInfo) => {
                this.setState({ res: resInfo.data.res });
            });
        }
        if(this.state.err) return <PageNotFound msg={ `요청하신 문제 #${this.props.id}는 존재하지 않거나 관리자에 의하여 비공개된 문제일 수 있습니다.` }/>;

        var layLeft = <LoadingLay/>;
        if(this.state.loaded){
            const problems = htmlParser(this.state.problemHtml);
            const samples = [];

            for(var i=0; i<this.state.sampleInput.length; i++){
                samples.push(
                    <div key={ i } className="content EX-BORDER">
                        <span className="EXBOX EXBOX-INPUT">
                            <div className="EXBOX-TOP ND">
                                <div className="EXBOX-TOP-TXT">예제{ i+1 } - 입력</div>
                                <CopyBtn index={ i } tooltip={ this.tooltip } txt={ this.state.sampleInput[i] }/>
                            </div>
                            <div className="EXBOX-CONTENT content-d" dangerouslySetInnerHTML={{  __html: sampleTransfer(this.state.sampleInput[i]) }}/>
                        </span>
                        <span className="ND">&nbsp;</span>
                        <span className="EXBOX EXBOX-OUTPUT">
                            <div className="EXBOX-TOP ND">
                                <div className="EXBOX-TOP-TXT">예제{ i+1 } - 출력</div>
                            </div>
                            <div className="EXBOX-CONTENT content-d" dangerouslySetInnerHTML={{  __html: sampleTransfer(this.state.sampleOutput[i]) }}/>
                        </span>
                    </div>
                );
            }

            layLeft = (
                <>
                    <div id="prob-id">#{ this.state.id }</div>
                    <div id="prob-title">{ this.state.title }</div>
                    <div id="prob-tag" className="ND">
                        <TagsLay tags={ this.state.tags }/>
                        <Bookmark tooltip={ this.tooltip } id={ this.state.id }/>
                    </div>
                    <div className="txt0">문제</div>
                    <div dangerouslySetInnerHTML={{ __html: problems[0] }}/>
                    <div className="txt1">입출력 예제</div>
                    { samples }
                    <div dangerouslySetInnerHTML={{ __html: problems[1] }}/>
                </>
            );
        }

        return (
            <>
                <Helmet>
                    <title>{ this.state.title ? `#${ this.state.id } ${ this.state.title } : 오일러OJ` : `#${ this.props.id } : 오일러OJ` }</title>
                </Helmet>
                <div className="FRAME_MAIN" style={{ paddingTop: '110px' }}>
                    { this.isneedMsg1() ? <TopMessage type="banwarn"/> : <></> }
                    { this.isneedMsg2() ? <TopMessage type="bookmark"/> : <></> }
                    <div id="lay_main">
                        <div id="lay_left">{ layLeft }</div>
                        <div id="lay_right" className="ND">
                            <BtnEditor id={ this.props.id }/>
                            <BtnSubmit id={ this.props.id }/>
                            <BoxLink id={ this.props.id } youtube={ this.state.youtube } blog={ this.state.blog } tooltip={ this.tooltip }/>
                            <BoxStat id={ this.props.id } solve={ this.state.solve } submit={ this.state.submit }/>
                            <BoxStatus id={ this.props.id } loginId={ this.state.loginId } res={ this.state.res }/>
                            <BoxLimit time={ this.state.timelimit } memory={ this.state.memorylimit } input={ this.state.inputmethod } output={ this.state.outputmethod }/>
                        </div>
                    </div>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer/>
            </>
        );
    }
    resizeEvent(){
        const bodyWidth = document.body.clientWidth;

        const clist = document.getElementsByClassName('EX-BORDER');
        for(var i=0; i<clist.length; i++){
            const item = clist[i];
            const inputElement = item.getElementsByClassName('EXBOX-INPUT')[0];
            const outputElement = item.getElementsByClassName('EXBOX-OUTPUT')[0];

            inputElement.style.height = 'auto'; outputElement.style.height = 'auto';

            if(bodyWidth >= 1140){
                const height = Math.max(inputElement.clientHeight, outputElement.clientHeight);
                inputElement.style.width = '48%'; outputElement.style.width = '48%';
                inputElement.style.height = `${height}px`; outputElement.style.height = `${height}px`;
                outputElement.style.marginTop = '0px';
            }
            else{
                inputElement.style.width = '100%'; outputElement.style.width = '100%';
                outputElement.style.marginTop = '-20px';
            }
        }

        try{
            const heightLeft = document.getElementById('lay_left').clientHeight;
            const heightRight = document.getElementById('lay_right').clientHeight;
            document.getElementById("lay_main").style.height = `${ Math.max(heightLeft, heightRight) }px`
        } catch(error){
        }
    }
    componentDidMount(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
        this.resizeEventInterval = setInterval(this.resizeEvent, 500);
    }
    componentDidUpdate(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
    }
    componentWillUnmount(){
        this.tooltip.clear();
        window.removeEventListener('resize', this.resizeEvent);
        clearInterval(this.resizeEventInterval);
    }
}

export default ProblemViewer;