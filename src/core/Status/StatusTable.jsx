import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Res from '../Frame/Res/Res';

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
    const ItemBackground = useSpring({ background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)', config: { duration: 100 } });

    return (
        <animated.div style={{ ...style, ...ItemBackground }} onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Link><div style={{ ...ItemStyle, ...Item1Style }}>12345</div></Link>
            <Link><div style={{ ...ItemStyle, ...Item2Style }}>#2038</div></Link>
            <Link>
                <div style={{ ...ItemStyle, ...Item3ImgStyle }}>
                    <img style={{ width: '100%', height: '100%', verticalAlign: 'top' }} alt=""/>
                </div>
            </Link>
            <Link>
                <div style={{ ...ItemStyle, ...Item3Style }}>supernova</div>
            </Link>
            <Link><div style={{ ...ItemStyle, ...Item4Style }}>C++17</div></Link>
            <div style={{ ...ItemStyle, ...Item5Style }}>2021년 10월 30일 12시 6분</div>
            <Link>
                <div style={{ ...ItemStyle, ...Item6Style }} className="ND">
                    <Res theme={ props.theme } res="100"/>
                </div>
            </Link>
        </animated.div>
    )
}

const StatusTable = (props) => {
    if(props.list.length <= 0) return <div/>;
    return (
        <div>
            <StatusTop/>
            { props.list.map((item, index) => <StatusItem theme={ props.theme }/>) }
        </div>
    )
}

StatusTable.defaultProps = {
    theme: 'light', list: []
}
export default StatusTable;