import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import Layout from '../../Frame/Layout/Layout';
import PageNotFound from '../../Frame/PageNotFound/PageNotFound';
//import RankTable from  './RankTable/RankTable';
import Top from '../Top/Top';
import Footer from '../../Frame/Footer/Footer';
import axios from '../../Tool/axios';

//import svgTime from './svg_time.svg';
//import svgShort from './svg_short.svg';
import svgPerson from './svg_person.svg';

const Solves = (props) => {
    const [info, setInfo] = useState(undefined);

    useEffect(() => {
        axios.get(`/json/problems/stats/solves/${ props.id }`).then(({ data }) => {
            setInfo(data);
        })
    }, [props.id]);

    const styleSolves = {
        position: 'relative',
        padding: '20px', display: 'flex', gap: '4px',
        justifyContent: 'center', flexWrap: 'wrap'
    }

    let container = <Layout.Loading theme={ props.theme }/>;
    if(info && info.err){
        return <PageNotFound theme={ props.theme } msg="요청하신 문제를 찾을 수 없습니다."/>;
    }
    if(info){
        container = (
            <div className="ND">
                <div style={{ height: '50px' }}/>
                {/*<Layout.Title theme={ props.theme } icon={ svgTime }>실행 시간 Top 5</Layout.Title>
                <RankTable theme={ props.theme }/>
    
                <div style={{ height: '70px' }}/>
                <Layout.Title theme={ props.theme } icon={ svgShort }>숏코딩 Top 5</Layout.Title>
                <RankTable theme={ props.theme }/>
    
                <div style={{ height: '70px' }}/>*/}
                <Layout.Title theme={ props.theme } icon={ svgPerson }>맞은 사람들</Layout.Title>
                <Layout.Container>
                    <div style={ styleSolves } className="ND">
                        { info.solves.map((item, index) => <Layout.ProfBtn key={ index } id={ item }/>) }
                    </div>
                </Layout.Container>
            </div>
        )
    }

    return (
        <div>
            <Helmet><title>맞은 사람들 (#{ props.id }) : 오일러OJ</title></Helmet>
            <Top id={ props.id } type="solves"/>
            <div className="FRAME_MAIN">{ container }</div>
            <div className="BTM_EMPTY"></div>
            <Footer theme={ props.theme }/>
        </div>
    );
}

export default Solves;