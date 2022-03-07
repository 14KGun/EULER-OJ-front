import { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import Chart from "react-apexcharts";
import Layout from '../../Frame/Layout/Layout';
import Top from '../Top/Top';
import RankTable from  './RankTable/RankTable';
import Loading from '../../Frame/Loading/Loading';
import Footer from '../../Frame/Footer/Footer';

import svgChart from './svg_chart.svg';
import svgTag from './svg_tag.svg';
import svgPerson from './svg_person.svg';
import svgRank from './svg_rank.svg';

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
        <Link>
            <animated.div style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={ styleTxt1 }>{ props.name }</div>
                <div style={ styleTxt2 }>{ props.value }</div>
            </animated.div>
        </Link>
    )
}
const Stat = (props) => {
    const chartOptions = {
        colors: ["#20E647"],
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
            gradient: { shade: "dark", type: "horizontal", gradientToColors: ["#87D4F9"], stops: [0, 100] }
        },
        stroke: { lineCap: "round" },
        labels: ["성공률"]
    }
    const styleTxt1 = {
        height: '22px', lineHeight: '22px',
        textAlign: 'center', fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? '#555' : '#888')
    }
    const styleTxt2 = {
        height: '25px', lineHeight: '25px',
        textAlign: 'center', fontSize: '17px', fontWeight: 400,
        color: (props.theme==='light' ? 'black' : '#aaa')
    }
    const styleBorder = {
        borderBottom: '1px solid rgba(120,120,120,0.3)'
    }
    return (
        <Layout.Container>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap',
            paddingLeft: '20px', paddingRight: '20px' }}>
                <div style={{ width: '220px', paddingBottom: '30px', gap: '40px' }}>
                    <Chart type="radialBar" options={ chartOptions } series={ ['37.15'] } width="100%" height="250px"/>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <div style={{ width: '100px' }}>
                            <div style={ styleTxt1 }>맞은 사람</div>
                            <div style={ styleTxt2 }>123</div>
                        </div>
                        <div style={{ width: '1px', height: '36px', marginTop: '7px', background: 'rgba(120,120,120,0.3)' }}/>
                        <div style={{ width: '100px' }}>
                            <div style={ styleTxt1 }>제출 횟수</div>
                            <div style={ styleTxt2 }>512</div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '300px', paddingTop: '30px', paddingBottom: '30px' }}>
                    <StatLine theme={ props.theme } name="맞았습니다" value={ 1 }/>
                    <div style={ styleBorder }/>
                    <StatLine theme={ props.theme } name="부분 점수" value={ 1 }/>
                    <div style={ styleBorder }/>
                    <StatLine theme={ props.theme } name="시간 초과" value={ 441 }/>
                    <div style={ styleBorder }/>
                    <StatLine theme={ props.theme } name="메모리 초과" value={ 13 }/>
                    <div style={ styleBorder }/>
                    <StatLine theme={ props.theme } name="출력 초과" value={ 1 }/>
                    <div style={ styleBorder }/>
                    <StatLine theme={ props.theme } name="런타임 에러" value={ 1 }/>
                    <div style={ styleBorder }/>
                    <StatLine theme={ props.theme } name="컴파일 에러" value={ 1233 }/>
                </div>
            </div>
        </Layout.Container>
    )
}
const Tag = (props) => {
    const styleTag = useSpring({
        background: `rgba(120,120,120,0.15)`,
        height: '36px', lineHeight: '36px', borderRadius: '10px',
        paddingLeft: '15px', paddingRight: '15px',
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa')
    });
    return (
        <>
            <div style={{ height: '50px' }}/>
            <Layout.Title theme={ props.theme } icon={ svgTag }>태그</Layout.Title>
            <Layout.Container>
                <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link>
                        <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    </Link>
                    
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    <animated.div style={ styleTag }>KOI</animated.div>
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                    <animated.div style={ styleTag }>우리들의 일그러진 영웅</animated.div>
                </div>
            </Layout.Container>
        </>
    )
}

class Stats extends Component {
    render() {
        let container = <LoadingLay/>

        container = (
            <div className="ND">
                <div style={{ height: '50px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgChart }>통계</Layout.Title>
                <Stat theme={ this.props.theme }/>

                <Tag theme={ this.props.theme }/>

                <div style={{ height: '70px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgRank }>실행 시간 Top 5</Layout.Title>
                <RankTable theme={ this.props.theme }/>

                <div style={{ height: '70px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgRank }>숏코딩 Top 5</Layout.Title>
                <RankTable theme={ this.props.theme }/>
                

                { /*<div style={{ height: '50px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgPerson }>맞은 사람 (52)</Layout.Title> */ }

                <div style={{ height: '70px' }}/>
                <Layout.Title theme={ this.props.theme }>사용된 언어</Layout.Title>
            </div>
        )

        return (
            <div>
                <Helmet><title>통계 (#{ this.props.id }) : 오일러OJ</title></Helmet>
                <Top id={ this.props.id } type="stats"/>
                <div className="FRAME_MAIN">{ container }</div>
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Stats;