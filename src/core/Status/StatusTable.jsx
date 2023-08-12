import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from "@react-spring/web";
import Res from '../Frame/Res/Res';
import trans from '../Tool/trans';

import svgEmpty from './svg_empty.svg';

const StatusTop = (props) => {
    const borderLine = '2px solid rgb(0,150,200)';
    const ItemStyle = {
        height: '60px', lineHeight: '60px',
        fontSize: '17px', fontWeight: '700', color: 'rgb(0,150,200)',
        position: 'absolute', top: '0px'
    }
    const Item1Style = { left: '20px', width: '52px', textAlign: 'center' };
    const Item2Style = { left: '92px', width: '52px', textAlign: 'center' };
    const Item3Style = { left: '174px', right: '595px' };
    const Item4Style = { right: '510px', width: '65px', textAlign: 'center' };
    const Item5Style = { right: '290px', width: '200px', textAlign: 'center' };
    const Item6Style = { right: '20px', width: '250px', textAlign: 'center' };

    return (
        <div className="ND" style={{ height: '60px', borderTop: borderLine, borderBottom: borderLine, position: 'relative' }}>
            <div style={{ ...Item1Style, ...ItemStyle }}>채점</div>
            <div style={{ ...Item2Style, ...ItemStyle }}>문제</div>
            <div style={{ ...Item3Style, ...ItemStyle }}>아이디</div>
            <div style={{ ...Item4Style, ...ItemStyle }}>언어</div>
            <div style={{ ...Item5Style, ...ItemStyle }}>제출 시각</div>
            <div style={{ ...Item6Style, ...ItemStyle }}>채점 결과</div>
        </div>
    )
}

const StatusItem = (props) => {
    const [isHover, setHover] = useState(false);
    
    const style = {
        height: '60px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', overflow: 'hidden'
    }
    const ItemStyle = {
        height: '60px', lineHeight: '60px',
        fontSize: '16px', position: 'absolute', top: '0px'
    }
    const Item1Style = {
        left: '20px', width: '52px', textAlign: 'center',
        fontWeight: 300, color: 'rgb(120,120,120)'
    }
    const Item2Style = {
        left: '92px', width: '52px', textAlign: 'center',
        fontWeight: 500, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const Item3ImgStyle = {
        top: '12px', left: '174px', width: '36px', height: '36px',
        border: '1px solid rgba(100,100,100,0.3)',
        borderRadius: '19px', overflow: 'hidden', background: 'white'
    }
    const Item3Style = {
        left: '220px', right: '595px',
        fontWeight: 500, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const Item4Style = {
        right: '510px', width: '65px', textAlign: 'center',
        fontWeight: 500, color: (props.theme === 'light' ? 'black' : 'white')
    };
    const Item5Style = {
        right: '290px', width: '200px', textAlign: 'center',
        fontWeight: 300, color: 'rgb(120,120,120)'
    };
    const Item6Style = {
        right: '20px', top: '17px', width: '250px', height: '26px'
    }
    const styleBackground = useSpring({ background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)', config: { duration: 100 } });

    return (
        <animated.div style={{ ...style, ...styleBackground }} onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Link to={ `/status/result/${ props.id }` }>
                <div style={{ ...ItemStyle, ...Item1Style }}>{ props.id }</div>
            </Link>
            <Link to={ `/problemset/problem/${ props.problemId }` }>
                <div style={{ ...ItemStyle, ...Item2Style }}>#{ props.problemId }</div>
            </Link>
            <Link to={ `/profile/${ props.loginId }` }>
                <div style={{ ...ItemStyle, ...Item3ImgStyle }}>
                    <img style={{ width: '100%', height: '100%', verticalAlign: 'top' }} alt="" src={ `/profile-img/${ props.loginId }.webp?size=60` }/>
                </div>
            </Link>
            <Link to={ `/profile/${ props.loginId }` }>
                <div style={{ ...ItemStyle, ...Item3Style }}>{ props.loginId }</div>
            </Link>
            <Link to={ `/status/result/${ props.id }` }>
                <div style={{ ...ItemStyle, ...Item4Style }}>{ props.lang }</div>
            </Link>
            <div style={{ ...ItemStyle, ...Item5Style }}>{ trans.date(new Date(props.date)) }</div>
            <Link to={ `/status/result/${ props.id }` }>
                <div style={{ ...ItemStyle, ...Item6Style }} className="ND">
                    <Res theme={ props.theme } res={ props.status }/>
                </div>
            </Link>
        </animated.div>
    )
}

const Empty = (props) => {
    return (
        <div className="ND">
            <div style={{ textAlign: 'center' }}>
                <img src={ svgEmpty } alt="" style={{ width: '30px', height: '30px' }}/>
            </div>
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white') }}>일치하는 검색 결과가 없습니다.</div>
        </div>
    )
}

const StatusTable = (props) => {
    if(props.list.length <= 0) return <Empty theme={ props.theme }/>;
    return (
        <div>
            <StatusTop/>
            { props.list.map((item, index) => <StatusItem key={ index } theme={ props.theme } { ...item }/>) }
        </div>
    )
}

StatusTable.defaultProps = {
    theme: 'light', list: []
}
export default StatusTable;