import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import svgGood from './svg_good.svg';
import svgGoodFill from './svg_good_fill.svg';

const TableTop = () => {
    const borderLine = '2px solid rgb(0,150,200)';
    return (
        <div style={{ height: '0px', borderTop: borderLine }}/>
    )
}

const TableItem = (props) => {
    const [isHover, setHover] = useState(false);
    const [isHoverGood, setHoverGood] = useState(false);

    const style = {
        height: '70px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', overflow: 'hidden'
    }
    const styleTitle = {
        position: 'absolute', top: '13px', left: '20px',
        height: '25px'
    }
    const styleTitleText = {
        display: 'inline-block', height: '25px', lineHeight: '25px',
        fontSize: '16px', fontWeight: 500, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleGood = useSpring({
        display: 'inline-block', height: '25px', borderRadius: '13px',
        marginLeft: '3px', paddingLeft: '10px', paddingRight: '10px',
        background: `rgba(160,160,160,${ isHoverGood ? 0.3 : 0 })`,
        config: { duration: 100 }
    })
    const styleGoodImg = {
        verticalAlign: 'top', width: '20px', height: '20px', marginTop: '3px'
    }
    const styleGoodText = {
        display: 'inline-block', verticalAlign: 'top', height: '25px', lineHeight: '25px',
        fontSize: '15px', fontWeight: 500, color: 'orange'
    }
    const styleSubtitle = {
        position: 'absolute', bottom: '13px', left: '20px',
        fontSize: '14px', fontWeight: 300, color: 'gray'
    }
    const styleProf = {
        position: 'absolute', top: '15px', right: '20px', width: '40px', height: '40px',
        borderRadius: '20px', border: '1px solid rgba(120,120,120,0.5)', overflow: 'hidden'
    }
    const styleLoginId = {
        position: 'absolute', top: '15px', right: '70px',
        fontSize: '16px', fontWeight: 400, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleDate = {
        position: 'absolute', bottom: '15px', right: '70px',
        fontSize: '13px', fontWeight: 300, color: 'gray'
    }
    const styleBackground = useSpring({ background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)', config: { duration: 100 } });
    
    return (
        <animated.div style={{ ...style, ...styleBackground }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div style={ styleTitle }>
                <Link>
                    <span style={ styleTitleText }>새로운 미지의 영역을 찾아서</span>
                </Link>
                <animated.span style={ styleGood } className="BTNC ND"
                onMouseEnter={ () => setHoverGood(true) } onMouseLeave={ () => setHoverGood(false) }>
                    <img style={ styleGoodImg } src={ svgGood }/>
                    <span style={ styleGoodText }>123</span>
                </animated.span>
            </div>
            <div style={ styleSubtitle } className="ND">#1023 - 블로깅</div>
            <Link>
                <div style={ styleProf } className="ND">
                    <img style={{ width: '100%', height: '100%' }} alt="profile image"
                    src={ `/profile-img/supernova.webp?size=40` }/>
                </div>
            </Link>
            <Link>
                <div style={ styleLoginId }>supernova</div>
            </Link>
            <div style={ styleDate } className="ND">2021년 12월 30일</div>
        </animated.div>
    )
}

const Table = (props) => {
    if(props.list.length <= 0) return <div/>;
    return (
        <div>
            <TableTop/>
            { props.list.map((item, index) => <TableItem key={ index } theme={ props.theme }/>) }
        </div>
    )
}
Table.defaultProps = {
    theme: 'light', list: []
}

export default Table;