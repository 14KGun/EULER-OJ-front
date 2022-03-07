import { Component } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import Chart from "react-apexcharts";
import Layout from '../../Frame/Layout/Layout';
import Top from '../Top/Top';
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
    return (
        <Layout.Container>
            <div>
                <Chart type="radialBar" options={ chartOptions } series={ ['37.15'] } width="100%" height="250px"/>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '100px' }}>
                        <div>맞은 사람</div>
                        <div>123</div>
                    </div>
                    <div style={{ width: '100px' }}>
                        <div>제출 횟수</div>
                        <div>512</div>
                    </div>
                </div>
            </div>
        </Layout.Container>
    )
}
const Tag = (props) => {
    const style = useSpring({
        background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), borderRadius: '10px'
    })
    return (
        <animated.div style={ style }>
            123
        </animated.div>
    )
}
const TimeTop5 = (props) => {
    const style = useSpring({
        background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), borderRadius: '10px'
    })
    return (
        <animated.div style={ style }>
            123
        </animated.div>
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

                <div style={{ height: '50px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgTag }>태그</Layout.Title>
                <Tag theme={ this.props.theme }/>

                <div style={{ height: '50px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgRank }>실행 시간 Top 5</Layout.Title>
                <TimeTop5 theme={ this.props.theme }/>

                <div style={{ height: '50px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgRank }>숏코딩 Top 5</Layout.Title>
                <TimeTop5 theme={ this.props.theme }/>

                { /*<div style={{ height: '50px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgPerson }>맞은 사람 (52)</Layout.Title> */ }

                <div style={{ height: '50px' }}/>
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