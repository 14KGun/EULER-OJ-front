import { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import Layout from '../../Frame/Layout/Layout';
import RankTable from  './RankTable/RankTable';
import Top from '../Top/Top';
import Loading from '../../Frame/Loading/Loading';
import Footer from '../../Frame/Footer/Footer';

import svgTime from './svg_time.svg';
import svgShort from './svg_short.svg';
import svgPerson from './svg_person.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}
class Solves extends Component {
    render() {
        let container = <LoadingLay/>

        container = (
            <div className="ND">
                <div style={{ height: '50px' }}/>
                {/*<Layout.Title theme={ this.props.theme } icon={ svgTime }>실행 시간 Top 5</Layout.Title>
                <RankTable theme={ this.props.theme }/>

                <div style={{ height: '70px' }}/>
                <Layout.Title theme={ this.props.theme } icon={ svgShort }>숏코딩 Top 5</Layout.Title>
                <RankTable theme={ this.props.theme }/>

                <div style={{ height: '70px' }}/>*/}
                <Layout.Title theme={ this.props.theme } icon={ svgPerson }>맞은 사람들</Layout.Title>
                <Layout.Container>
                    <div style={{ padding: '20px' }}>

                    </div>
                </Layout.Container>
            </div>
        )

        return (
            <div>
                <Helmet><title>맞은 사람들 (#{ this.props.id }) : 오일러OJ</title></Helmet>
                <Top id={ this.props.id } type="solves"/>
                <div className="FRAME_MAIN">{ container }</div>
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Solves;