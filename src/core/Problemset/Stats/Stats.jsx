import { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import Chart from "react-apexcharts";
import Layout from '../../Frame/Layout/Layout';
import Top from '../Top/Top';
import Loading from '../../Frame/Loading/Loading';
import Footer from '../../Frame/Footer/Footer';
import getHref from '../../Tool/getHref';

import svgChart from './svg_chart.svg';
import svgTag from './svg_tag.svg';
import svgTagEmpty from './svg_tagno.svg';
// import svgRank from './svg_rank.svg';
import svgAssess from './svg_assess.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}
const StatLine = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '30px', position: 'relative',
        background: `rgba(120,120,120,${ isHover ? 0.05 : 0 })`,
        config: { duration: 100 }
    });
    const styleTxt1 = {
        position: 'absolute', top: '0px', left: '10px',
        height: '30px', lineHeight: '30px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? '#555' : '#888')
    }
    const styleTxt2 = {
        position: 'absolute', top: '0px', left: '50%',
        height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa')
    }

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div style={ styleTxt1 }>{ props.name }</div>
            <div style={ styleTxt2 }>{ props.value }</div>
        </animated.div>
    )
}
const Stat = (props) => {
    const [isHover1, setHover1] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const chartOptions = {
        colors: ["rgb(250,150,60)"],
        plotOptions: {
            radialBar: {
                hollow: { size: "50%" },
                track: {
                    dropShadow: { enabled: true, top: 2, left: 0, blur: 4, opacity: 0.15 },
                    background: 'rgba(120,120,120,0.15)',
                },
                dataLabels: {
                    name: { fontSize: "15px", color: "#888", fontWeight: 300, offsetY: -10, show: true },
                    value: { fontSize: "20px", color: "#888", fontWeight: 900, offsetY: -2, show: true }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: { shade: "dark", type: "horizontal", gradientToColors: ["rgb(255,200,100)"], stops: [0, 100] }
        },
        stroke: { lineCap: "round" },
        labels: ["성공률"]
    }
    const styleBtn1 = useSpring({
        paddingTop: '5px', paddingBottom: '5px', borderRadius: '10px',
        background: `rgba(120,120,120,${ isHover1 ? 0.1 : 0 })`,
        config: { duration: 100 }
    })
    const styleBtn2 = useSpring({
        paddingTop: '5px', paddingBottom: '5px', borderRadius: '10px',
        background: `rgba(120,120,120,${ isHover2 ? 0.1 : 0 })`,
        config: { duration: 100 }
    })
    const styleTxt1 = {
        height: '22px', lineHeight: '22px',
        textAlign: 'center', fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? '#555' : '#888')
    }
    const styleTxt2 = {
        height: '25px', lineHeight: '25px',
        textAlign: 'center', fontSize: '17px', fontWeight: 500,
        color: (props.theme==='light' ? 'black' : '#aaa')
    }
    const styleBorder = {
        borderBottom: '1px solid rgba(120,120,120,0.3)'
    }
    return (
        <>
            <div style={{ height: '50px' }}/>
            <Layout.Title theme={ props.theme } icon={ svgChart }>통계</Layout.Title>
            <Layout.Container>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap',
                paddingLeft: '30px', paddingRight: '30px', gap: '20px' }}>
                    <div style={{ width: '220px', paddingBottom: '30px' }}>
                        <Chart type="radialBar" options={ chartOptions } series={ ['37.15'] } width="100%" height="250px"/>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '-20px' }}>
                            <div style={{ width: '100px' }}>
                                <Link to={ `/problemset/solves/${ props.id }` }>
                                    <animated.div style={ styleBtn1 }
                                    onMouseEnter={ () => setHover1(true) } onMouseLeave={ () => setHover1(false) }>
                                        <div style={ styleTxt1 }>맞은 사람</div>
                                        <div style={{ ...styleTxt2, color: 'green' }}>123</div>
                                    </animated.div>
                                </Link>
                            </div>
                            <div style={{ width: '1px', height: '36px', marginTop: '7px', background: 'rgba(120,120,120,0.3)' }}/>
                            <div style={{ width: '100px' }}>
                                <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id }) }` }>
                                    <animated.div style={ styleBtn2 }
                                    onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }>
                                        <div style={ styleTxt1 }>제출 횟수</div>
                                        <div style={ styleTxt2 }>512</div>
                                    </animated.div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '300px', paddingTop: '30px', paddingBottom: '30px' }}>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "accepted" }) }` }>
                            <StatLine theme={ props.theme } name="맞았습니다" value={ 1 }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "partial" }) }` }>
                            <StatLine theme={ props.theme } name="부분 점수" value={ 1 }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "time" }) }` }>
                            <StatLine theme={ props.theme } name="시간 초과" value={ 441 }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "memory" }) }` }>
                            <StatLine theme={ props.theme } name="메모리 초과" value={ 13 }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "output" }) }` }>
                            <StatLine theme={ props.theme } name="출력 초과" value={ 1 }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "runtime" }) }` }>
                            <StatLine theme={ props.theme } name="런타임 에러" value={ 1 }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "compile" }) }` }>
                            <StatLine theme={ props.theme } name="컴파일 에러" value={ 1233 }/>
                        </Link>
                    </div>
                </div>
            </Layout.Container>
        </>
    )
}
const TagItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        background: `rgba(120,120,120,${ isHover ? 0.19 : 0.12 })`,
        height: '36px', lineHeight: '36px', borderRadius: '10px',
        paddingLeft: '15px', paddingRight: '15px',
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa'),
        config: { duration: 100 }
    });

    return (
        <Link to={ props.to }>
            <animated.div style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                { props.children }
            </animated.div>
        </Link>
    )
}
const TagEmpty = (props) => {
    const styleText = {
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa'),
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <img src={ svgTagEmpty } alt="" style={{ height: '24px' }}/>
            <div style={ styleText }>지정된 태그가 없습니다.</div>
        </div>
    )
}
const Tag = (props) => {
    return (
        <>
            <div style={{ height: '50px' }}/>
            <Layout.Title theme={ props.theme } icon={ svgTag }>태그</Layout.Title>
            <Layout.Container>
                <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    { /*<TagItem theme={ props.theme }>우리들의 일그러진 영웅</TagItem>
                    <TagItem theme={ props.theme }>KOI</TagItem>*/ }
                    <TagEmpty theme={ props.theme }/>
                </div>
            </Layout.Container>
        </>
    )
}

const LangStatItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: `${ props.value }%`, height: '100%',
        overflow: 'hidden', backgroundImage: props.color,
        opacity: isHover ? 1 : 0.8,
        config: { duration: 50 }
    })
    const styleText = {
        height: '100%', lineHeight: '30px',
        paddingLeft: '7px', fontSize: '15px', fontWeight: 300,
        color: props.theme==='light' ? 'black' : 'white'
    }
    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Link>
                <div style={ styleText }>{ props.text }</div>
            </Link>
        </animated.div>
    )
}
const LangStat = (props) => {
    const colorSet = [
        'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(120deg, #fda085 0%, #f6d365 100%)',
        'linear-gradient(120deg, #96e6a1 0%, #d4fc79 100%)',
        'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        'linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)',
        'linear-gradient(to right, #0ba360 0%, #3cba92 100%)',
        'linear-gradient(to right, #e6b980 0%, #eacda3 100%)'
    ];
    const styleStat = {
        width: '100%', height: '30px', borderRadius: '10px',
        position: 'relative', display: 'flex', overflow: 'hidden',
        border: '2px solid rgba(120,120,120,0.2)'
    }
    const styleBtm = {
        paddingLeft: '5px', paddingTop: '7px',
        fontSize: '16px', fontWeight: 300,
        color: props.theme==='light' ? 'black' : '#aaa'
    }

    return (
        <>
            <div style={{ height: '70px' }}/>
            <Layout.Title theme={ props.theme } icon={ svgAssess }>사용된 언어</Layout.Title>
            <Layout.Container>
                <div style={{ padding: '20px' }}>
                    <div style={ styleStat }>
                        <LangStatItem theme={ props.theme } color={ colorSet[0] } value={ 20 } text="C++"/>
                        <LangStatItem theme={ props.theme } color={ colorSet[1] } value={ 20 } text="C"/>
                        <LangStatItem theme={ props.theme } color={ colorSet[2] } value={ 20 } text="Python3"/>
                        <LangStatItem theme={ props.theme } color={ colorSet[3] } value={ 20 } text="Java"/>
                        <LangStatItem theme={ props.theme } color={ colorSet[4] } value={ 10 } text="R"/>
                        <LangStatItem theme={ props.theme } color={ colorSet[5] } value={ 5 } text="Go"/>
                        <LangStatItem theme={ props.theme } color={ colorSet[6] } value={ 0.4 } text="Ruby"/>
                    </div>
                    <div style={ styleBtm }>전체 제출 횟수 : 1000</div>
                </div>
            </Layout.Container>
        </>
    )

}

const Stats = (props) => {
    let container = <LoadingLay/>

    container = (
        <div className="ND">
            <Stat id={ props.id } theme={ props.theme }/>
            <Tag theme={ props.theme }/>
            <LangStat theme={ props.theme }/>
        </div>
    )

    return (
        <div>
            <Helmet><title>통계 (#{ props.id }) : 오일러OJ</title></Helmet>
            <Top id={ props.id } type="stats"/>
            <div className="FRAME_MAIN">{ container }</div>
            <div className="BTM_EMPTY"></div>
            <Footer theme={ props.theme }/>
        </div>
    );
}

export default Stats;