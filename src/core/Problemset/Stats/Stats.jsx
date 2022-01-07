import { Component } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
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

const Title = (props) => {
    const style = {
        fontSize: '27px', fontWeight: 700, marginLeft: '45px',
        color: (props.theme==='light' ? 'black' : 'white'),
        lineHeight: '40px'
    }
    const styleImg = {
        position: 'absolute', top: '2px', left: '0px',
        width: '36px'
    }
    return (
        <div style={{ position: 'relative' }}>
            <img src={ props.icon } style={ styleImg } alt=""/>
            <div style={ style }>{ props.children }</div>
        </div>
    )
}
const Stat = (props) => {
    const style = useSpring({
        background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), borderRadius: '10px'
    })
    return (
        <animated.div style={ style }>
            123
        </animated.div>
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
                <Title theme={ this.props.theme } icon={ svgChart }>통계</Title>
                <Stat theme={ this.props.theme }/>

                <div style={{ height: '40px' }}/>
                <Title theme={ this.props.theme } icon={ svgTag }>태그</Title>
                <Tag theme={ this.props.theme }/>

                <div style={{ height: '40px' }}/>
                <Title theme={ this.props.theme } icon={ svgRank }>실행 시간 Top 5</Title>
                <TimeTop5 theme={ this.props.theme }/>

                <div style={{ height: '40px' }}/>
                <Title theme={ this.props.theme } icon={ svgRank }>숏코딩 Top 5</Title>
                <TimeTop5 theme={ this.props.theme }/>

                <div style={{ height: '40px' }}/>
                <Title theme={ this.props.theme } icon={ svgPerson }>맞은 사람 (52)</Title>

                <div style={{ height: '40px' }}/>
                <Title theme={ this.props.theme }>사용된 언어</Title>
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