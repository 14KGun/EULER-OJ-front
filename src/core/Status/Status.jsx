import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Top from './StatusTop/StatusTop';
import StatusTable from './StatusTable';
import PageSelector from '../Frame/PageSelector';
import Footer from '../Frame/Footer/Footer';
import Loading from '../Frame/Loading/Loading';
import axios from '../Tool/axios';

import svgFilter from './svg_filter.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}

const Filter = (props) => {
    const [isHover, setHover] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const [isOpen, setOpen] = useState(false);

    let background = (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)');
    if(isHover || isOpen) background = (props.theme==='light' ? 'rgb(215,215,215)' : 'rgb(60,60,60)');
    
    const style = useSpring({
        background: background,
        borderRadius: '10px', overflow: 'hidden', position: 'relative',
        width: '100px', height: '30px',
        config: { duration: 100 }
    });
    const styleFilterText = {
        position: 'absolute', top: '0px', left: '28px', height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 400, color: 'gray'
    }
    const styleBox = useSpring({
        background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'),
        borderRadius: '15px', overflow: 'hidden', position: 'relative',
        width: '100%',
        marginTop: (isOpen ? '10px' : '0px'), opacity: (isOpen ? 1 : 0),
        height: (isOpen ? '100px' : '0px'),
    });
    const styleBoxBtn = useSpring({
        background: (isHover2 ? 'rgb(0,110,170)' : 'rgb(0,134,191)'),
        paddingLeft: '17px', paddingRight: '17px', height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 300, color: 'white', borderRadius: '15px',
        config: { duration: 100 }
    })

    return (
        <>
            <div style={{ display: 'flex' }} className="ND">
                <animated.div style={ style } className="BTNC" onClick={ () => setOpen(!isOpen) }
                onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                    <img src={ svgFilter } alt="" style={{ position: 'absolute', top: '4px', left: '4px', height: '22px' }}/>
                    <div style={ styleFilterText }>검색 필터</div>
                </animated.div>
            </div>
            <animated.div style={ styleBox } className="ND">
                <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '15px' }}>
                    <Link>
                        <animated.div style={ styleBoxBtn }
                        onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }>적용</animated.div>
                    </Link>
                </div>
            </animated.div>
        </>
    )
}

class Status extends Component {
    render() {
        let container = <LoadingLay/>

        if(true){
            container = (
                <div>
                    <div style={{ height: '30px' }}/>
                    <Filter theme={ this.props.theme }/>
                    <div style={{ height: '30px' }}/>
                    <StatusTable theme={ this.props.theme } list={ [123] }/>
                    <div className="BTM_EMPTY"></div>
                    <div className="BTM_EMPTY"></div>
                    <div className="BTM_EMPTY"></div>
                    <div className="BTM_EMPTY"></div>
                </div>
            )
        }

        return (
            <div>
                <Helmet><title>채점 : 오일러OJ</title></Helmet>
                <Top/>
                <div className="FRAME_MAIN">{ container }</div>
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Status;