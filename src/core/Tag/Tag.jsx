import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Top from '../Frame/Top/Top';
import TopBackground from './TagTopBackground/TagTopBackground';
import TagIcon from './TagIcon/TagIcon';
import TagTable from './TagTable';
import ProblemTable from '../Probelmset/ProblemTable'
import Loading from '../Frame/Loading/Loading';
import Footer from '../Frame/Footer'
import svgArrow from './svg_arrow.svg';

const TopFixedLayIcon = (props) => {
    const [isHover, setHover] = useState(false);
    const iconStyle = {
        display: 'inline-block', height: '30px', lineHeight: '30px', borderRadius: '12px',
        marginTop: '10px', position: 'relative',
    };
    const background = useSpring({ background: isHover ? 'rgba(200,200,200,0.2)' : 'rgba(200,200,200,0)', config: { duration: 100 } }).background;
    return (
        <Link to={ `/tags/${ props.id }` }>
            <animated.span style={{ ...iconStyle, background: background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={{ position: 'absolute', left: '6px', top: '1px', width: '20px', height: '30px' }}><TagIcon type={ props.type } scale="20px"/></div>
                <span style={{ paddingLeft: '30px', paddingRight: '8px', fontSize: '16px', fontWeight: '300', color: 'white' }}>{ props.name }</span>
            </animated.span>
        </Link>
    );
}
const TopFixedLayArrow = () => {
    return (
        <img src={ svgArrow } style={{ height: '10px', marginLeft: '6px', marginRight: '6px' }}/>
    )
}
const TopFixedLay = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <TopFixedLayIcon type="folder" name="태그" id="1"/>
            <TopFixedLayArrow/>
            <TopFixedLayIcon type="youtube" name="유튜브" id="2"/>
            <TopFixedLayArrow/>
            <TopFixedLayIcon type="blog" name="블로그" id="3"/>
        </div>
    )
}

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}

const TableLay = () => {
    return (
        <div style={{ paddingTop: '50px' }}>
            <TagTable/>
            <ProblemTable/>
        </div>
    );
}

class Tag extends Component {
    componentDidMount(){
        document.title = "태그 : 오일러OJ"
    }
    render() {
        return (
            <div>
                <Top icon={ <TagIcon type="tag" scale="40px" on="top"/> } title="태그" background={ <TopBackground/> } fixedLay={ <TopFixedLay/> }/>
                <div className="FRAME_MAIN ND">
                    <TableLay/>
                    <div className="BTM_EMPTY"></div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Tag;