import { useState, useRef } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import ProblemView from './ProblemView/ProblemView';
import Footer from '../../Frame/Footer/Footer';
import axios from '../../Tool/axios';

import svgEditor from './svg_editor.svg';
import svgSubmit from './svg_submit.svg';
import svgYoutube from './svg_youtube.svg';

const ViewerFlexLay = (props) => {
    const getWidth = () => document.body.clientWidth;
    const widthR = useRef(getWidth());
    const [bodyWidth, setWidth] = useState(widthR.current); // range = 200 ~ 130
    useState(() => {
        const resizeEvent = () => {
            const _width = getWidth();
            if(widthR.current !== _width){
                widthR.current = _width;
                setWidth(_width);
            }
        }
        resizeEvent();
        window.addEventListener('resize', resizeEvent);
        return () => window.removeEventListener('resize', resizeEvent);
    }, []);

    const widthEnv = {
        main: 1200, sub: 230, gap: 30, margin: 20
    };

    if(bodyWidth >= widthEnv.margin*2 + widthEnv.sub*2 + widthEnv.main + widthEnv.gap*2){
        return (
            <div style={{ display: 'flex', gap: widthEnv.gap, justifyContent: 'center' }}>
                <div style={{ width: widthEnv.sub }}></div>
                <div style={{ width: widthEnv.main }}>{ props.children }</div>
                <div style={{ width: widthEnv.sub }}>{ props.subLay }</div>
            </div>
        )
    }
    if(bodyWidth >= widthEnv.margin*2 + widthEnv.sub + widthEnv.main + widthEnv.gap*2){
        return (
            <div style={{ display: 'flex', gap: widthEnv.gap, justifyContent: 'center' }}>
                <div style={{ width: `calc(100% - ${ widthEnv.main + widthEnv.sub + widthEnv.gap*2 + widthEnv.margin*2 }px)` }}></div>
                <div style={{ width: widthEnv.main }}>{ props.children }</div>
                <div style={{ width: widthEnv.sub }}>{ props.subLay }</div>
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', gap: widthEnv.gap, justifyContent: 'center' }}>
            <div style={{ width: `calc(100% - ${ widthEnv.sub + + widthEnv.gap + widthEnv.margin*2 }px)` }}>{ props.children }</div>
            <div style={{ width: widthEnv.sub }}>{ props.subLay }</div>
        </div>
    );
}

const Tag = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '24px', borderRadius: '14px',
        border: '2px solid rgb(0,134,191)',
        background: `rgba(0,134,191,${ isHover ? 1 : 0 })`,
        config: { duration: 100 }
    });
    const styleText = useSpring({
        paddingLeft: '10px', paddingRight: '10px',
        height: '24px', lineHeight: '24px',
        fontSize: '15px', fontWeight: 500,
        color: isHover ? 'rgb(255,255,255)' : 'rgb(0,134,191)',
        config: { duration: 100 }
    })

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Link to={ `/tags/${ props.id }` }>
                <animated.div style={ styleText }>
                    { props.name }
                </animated.div>
            </Link>
        </animated.div>
    )
}
const Header = (props) => {
    const getHeight = () => {
        const scrolledHeight = Math.max(document.documentElement.scrollTop, 0);
        return Math.max(220 - scrolledHeight, 130);
    }

    const heightR = useRef(getHeight());
    const [height, setHeight] = useState(heightR.current); // range = 220 ~ 130
    useState(() => {
        const scrollEvent = () => {
            const _height = getHeight();
            if(heightR.current !== _height){
                heightR.current = _height;
                setHeight(_height);
            }
        }
        document.addEventListener('scroll', scrollEvent);
        return () => {
            document.removeEventListener('scroll', scrollEvent);
        }
    }, []);

    const bgdN = (props.theme === 'light' ? 255 : 30);
    const heightS = useSpring({ height: height }).height;
    const style = {
        position: 'fixed', top: '0px', left: '0px', width: '100%',
        overflow: 'hidden', zIndex: 80,
        height: heightS.to(x => `${ x }px`),
        background: heightS.to(x => `rgba(${ bgdN },${ bgdN },${ bgdN },${ 1-(x-130)/70 })`), // 0 ~ 1
        borderBottom: heightS.to(x => `1px solid rgba(120,120,120,${ height === 130 ? 0.2 : 0 })`)
    }
    const styleId = {
        position: 'absolute', left: '0px',
        top: heightS.to(x => `${ (x-130)/90*30 }px`), // 30 ~ 0
        opacity: heightS.to(x => (x-130)/90), // 1 ~ 0
        fontSize: '16px', fontWeight: 400, color: '#888'
    }
    const styleTitle = {
        position: 'absolute', left: '0px',
        top: heightS.to(x => `${ (x-130)/90*37+13 }px`), // 50 ~ 13
        fontSize: heightS.to(x => `${ (x-130)/90*9+23 }px`), // 32 ~ 23
        fontWeight: 500, color: 'rgb(0,134,191)'
    }
    const styleTags = {
        position: 'absolute', left: '0px',
        top: heightS.to(x => `${ (x-130)/90*50+50 }px`), // 100 ~ 50
        opacity: heightS.to(x => (x-130)/90), // 1 ~ 0
        display: 'flex', gap: '3px'
    }

    return (
        <>
            <animated.div style={ style } className="ND">
                <div style={{ height: '70px' }}/>
                <ViewerFlexLay  subLay={ null }>
                    <div style={{ position: 'relative' }}>
                        <animated.div style={ styleId }>#{ props.id }</animated.div>
                        <animated.div style={ styleTitle }>{ props.title }</animated.div>
                        <animated.div style={ styleTags }>
                            <Tag id={ 123 } name="KOI"/>
                            <Tag id={ 123 } name="Dijkstra"/>
                        </animated.div>
                    </div>
                </ViewerFlexLay>
            </animated.div>
            <div style={{ height: '220px' }}/>
        </>
    )
}

const BoxLay = (props) => {
    const style = useSpring({
        marginTop: '20px', overflow: 'hidden',
        background: props.theme==='light' ? 'white' : 'black',
        borderLeft: '1px solid rgba(140,140,140,0.3)',
        borderRight: '1px solid rgba(140,140,140,0.3)',
        borderBottom: '1px solid rgba(140,140,140,0.3)',
        boxShadow: '0px 10px 10px 5px rgba(0,0,0,0.05)'
    })
    const styleTitle = {
        paddingTop: '15px', paddingLeft: '15px', paddingRight: '15px',
        lineHeight: '25px',
        fontSize: '17px', fontWeight: 400,
        color: props.theme==='light' ? 'black' : '#ddd',
    }
    return (
        <animated.div style={ style } className="ND">
            <div style={{ borderTop: '2px solid rgb(20, 134, 191)' }}/>
            <div style={ styleTitle }>{ props.title }</div>
            <div>
                { props.children }
            </div>
        </animated.div>
    )
}
const StatLay = (props) => {
    const [isHover1, setHover1] = useState(false);
    const styleLay1 = useSpring({
        paddingLeft: '10px', paddingRight: '10px',
        paddingTop: '10px', paddingBottom: '10px',
        borderRadius: '10px',
        background: `rgba(170,170,170,${ isHover1 ? 0.15 : 0 })`,
        config: { duration: 100 }
    })
    const styleStat = {
        width: '100%', height: '24px', borderRadius: '13px',
        overflow: 'hidden',
        background: 'rgba(160,160,160,0.2)',
        border: '1px solid rgba(160,160,160,0.4)'
    }
    const styleStatBar = useSpring({
        height: '100%', width: '50%', opacity: 0.5,
        backgroundImage: 'linear-gradient(to left, #4facfe 0%, #00f2fe 100%)'
    })
    const styleStatTxt = {
        fontSize: '14px', fontWeight: 300,
        textAlign: 'right', color: 'gray'
    }

    return (
        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <Link>
                <animated.div style={ styleLay1 }
                onMouseEnter={ () => setHover1(true) } onMouseLeave={ () => setHover1(false) }>
                    <div style={ styleStat }>
                        <animated.div style={ styleStatBar }/>
                    </div>
                    <div style={ styleStatTxt }>성공률: 15%</div>
                </animated.div>
            </Link>
            <div style={{ height: '15px' }}/>
        </div>
    )
}

const ProblemViewer = (props) => {
    const [probInfo, setProbInfo] = useState(undefined);
    useState(() => {
        axios.get(`/json/problems/problem/${ props.id }`).then(({ data }) => {
            setProbInfo(data);
        });
    }, [props.id])

    let subLay = null;
    const [isHoverBtnCod, setHoverBtnCod] = useState(undefined);
    const [isHoverBtnSub, setHoverBtnSub] = useState(undefined);
    const [isHoverBtnYou, setHoverBtnYou] = useState(undefined);
    const styleBtnCoding = useSpring({
        width: '100%', height: '46px', borderRadius: '10px', position: 'relative',
        background: isHoverBtnCod ? `rgba(0,134,191,1)` : `rgba(0,134,191,0.9)`,
        config: { duration: 100 }
    });
    const styleBtnSubmit = useSpring({
        marginTop: '10px',
        width: '100%', height: '46px', borderRadius: '10px', position: 'relative',
        background: isHoverBtnSub ? `rgba(0,120,50,1)` : `rgba(0,120,50,0.9)`,
        config: { duration: 100 }
    });
    const styleBtnYoutube = useSpring({
        marginTop: '10px',
        width: '100%', height: '46px', borderRadius: '10px', position: 'relative',
        background: isHoverBtnYou ? `rgba(240,100,20,1)` : `rgba(240,100,20,0.9)`,
        config: { duration: 100 }
    });
    const styleBtn1tImg = {
        position: 'absolute', top: '10px', left: '10px',
        width: '26px', height: '26px'
    }
    const styleBtn1tTxt = {
        position: 'absolute', top: '0px', left: '36px', right: '10px',
        textAlign: 'center', height: '46px', lineHeight: '46px',
        fontSzie: '16px', fontWeight: 300, color: 'white'
    }

    if (probInfo && probInfo.err){
        return null;
    }
    if (probInfo){
        subLay = (
            <div>
                <Link to={ `/problemset/editor/${ props.id }` }>
                    <animated.div style={ styleBtnCoding }
                    onMouseEnter={ () => setHoverBtnCod(true) } onMouseLeave={ () => setHoverBtnCod(false) }>
                        <img src={ svgEditor } alt="editor" style={ styleBtn1tImg }/>
                        <div style={ styleBtn1tTxt }>코딩 시작하기</div>
                    </animated.div>
                </Link>
                <Link to={ `/problemset/submit/${ props.id }` }>
                    <animated.div style={ styleBtnSubmit }
                    onMouseEnter={ () => setHoverBtnSub(true) } onMouseLeave={ () => setHoverBtnSub(false) }>
                        <img src={ svgSubmit } alt="submit" style={ styleBtn1tImg }/>
                        <div style={ styleBtn1tTxt }>제출 하기</div>
                    </animated.div>
                </Link>
                <Link>
                    <animated.div style={ styleBtnYoutube }
                    onMouseEnter={ () => setHoverBtnYou(true) } onMouseLeave={ () => setHoverBtnYou(false) }>
                        <img src={ svgYoutube } alt="youtube" style={ styleBtn1tImg }/>
                        <div style={ styleBtn1tTxt }>유튜브 해설 바로가기</div>
                    </animated.div>
                </Link>
                <BoxLay title="통계" theme={ props.theme }>
                    <StatLay theme={ props.theme }/>
                </BoxLay>
                <BoxLay title="통계" theme={ props.theme }>
                </BoxLay>
                <BoxLay title="통계" theme={ props.theme }>
                </BoxLay>
            </div>
        )
    }

    return (
        <div>
            <Helmet><title>#{ props.id } { probInfo ? probInfo.title : '' } : 오일러OJ</title></Helmet>
            <Header id={ props.id } theme={ props.theme }
            title={ probInfo ? probInfo.title : '' }/>
            <ViewerFlexLay subLay={ subLay }>
                { probInfo ? 
                    <ProblemView html={ probInfo.problemHtml }
                    theme={ props.theme }/> :
                    null
                }
            </ViewerFlexLay>
            <div className="BTM_EMPTY"></div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default ProblemViewer;