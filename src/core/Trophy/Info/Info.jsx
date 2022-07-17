import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import Layout from '../../Frame/Layout/Layout';
import Footer from '../../Frame/Footer/Footer';
import PageNotFound from '../../Frame/PageNotFound/PageNotFound';
import getTrophyInfo from '../../Tool/getTrophyInfo';
import axios from '../../Tool/axios';

import svgCondi from './svg_condi.svg';
import svgPercent from './svg_percent.svg';
import svgPerson from './svg_person.svg';

const Stat = (props) => {
    const style = {
        height: '30px', borderRadius: '10px',
        position: 'relative', overflow: 'hidden',
        background: 'rgb(120,120,120,0.05)',
        border: '2px solid rgba(120,120,120,0.2)'
    }
    const styleBar = useSpring({
        width: `${ props.value }%`, height: '100%', opacity: 0.7,
        backgroundImage: 'linear-gradient(to right, rgb(51,126,191) 0%,rgb(41,153,71) 100%)'
    })
    const styleText = {
        fontSize: '16px', fontWeight: 300, textAlign: 'right',
        color: props.theme === 'light' ? 'black' : '#aaa'
    }

    return (
        <div>
            <div style={ style }>
                <animated.div style={ styleBar }/>
            </div>
            <div style={ styleText }>전체 사용자 중 { props.value }%가 이 업적을 달성</div>
        </div>
    )
}

const Info = (props) => {
    const info = getTrophyInfo.getInfoById(props.id);
    const [solveNum, setSolveNum] = useState(undefined);
    const styleHint = {
        padding: '20px', fontSize: '16px', fontWeight: 300,
        color: props.theme === 'light' ? 'black' : '#aaa'
    }
    const stylePerson = {
        position: 'relative',
        padding: '20px', display: 'flex', gap: '4px',
        justifyContent: 'center', flexWrap: 'wrap'
    }

    useEffect(() => {
        if(info){
            axios.get(`/json/trophy/info/${ props.id }`).then(({ data }) => {
                data.users.sort(() => Math.random() - 0.5);
                setSolveNum(data);
            })
        }
    }, [props.id])

    if(!info) return <PageNotFound theme={ props.theme }/>;

    let container = <Layout.Loading theme={ props.theme }/>;
    if(solveNum){
        container = (
            <>
                <div style={{ height: '50px' }}/>
                <Layout.Title icon={ svgPercent } theme={ props.theme }>통계</Layout.Title>
                <Stat value={ (solveNum.users.length / solveNum.tot * 100).toFixed(2) } theme={ props.theme }/>

                <div style={{ height: '50px' }}/>
                <Layout.Title icon={ svgPerson } theme={ props.theme }>업적 달성자</Layout.Title>
                <Layout.Container>
                    {
                        solveNum.users.length > 100 ? (
                            <>
                                <div style={ stylePerson } className="ND">
                                    { solveNum.users.slice(0,100).map((item, index) => <Layout.ProfBtn key={ index } id={ item }/>) }
                                </div>
                                <div style={{
                                    textAlign: 'center',
                                    paddingBottom: '20px',
                                    fontSize: '16px', fontWeight: '300',
                                    color: props.theme==='light' ? 'black' : 'white'
                                }}>
                                    외 { solveNum.users.length - 100 }명
                                </div>
                            </>
                        ) : (
                            <div style={ stylePerson } className="ND">
                                { solveNum.users.map((item, index) => <Layout.ProfBtn key={ index } id={ item }/>) }
                            </div>
                        )
                    }
                </Layout.Container>
            </>
        )
    }

    return (
        <div>
            <Helmet><title>{ info.name } : 오일러OJ</title></Helmet>
            <Layout.HeaderTitle theme={ props.theme } icon={ info.icon } title={ info.name }/>
            <div className="FRAME_MAIN">
                <Layout.Title icon={ svgCondi } theme={ props.theme }>업적 획득 조건</Layout.Title>
                <Layout.Container>
                    <div style={ styleHint }>{ info.hint }</div>
                </Layout.Container>

                { container }
            </div>
            <div className="BTM_EMPTY"></div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default Info;