import { useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Link } from 'react-router-dom';

import svgEmpty from './svg_empty.svg';

const ContestLine = (props) => {
    const styleName = {
        fontSize: '14px', fontWeight: 400,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleContent = {
        fontSize: '14px', fontWeight: 300, opacity: 0.9,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <div style={ styleName }>{ props.name }</div>
            <div style={ styleContent }>{ props.children }</div>
        </div>
    )
}
const Contest = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: '240px', height: '310px', borderRadius: '12px',
        overflow: 'hidden', position: 'relative',
        border: `1px solid ${ props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(40,40,40)' }`,
        background: (props.theme==='light' ? 'rgb(255,255,255)' : 'rgb(20,21,22)'),
        boxShadow: `0px 5px 30px 5px rgba(50,50,50,${ isHover ? 0.1 : 0 })`,
        transform: `scale(${ isHover ? 1.01 : 1.0 })`,
        config: { duration: 100 }
    })
    const styleImg = {
        width: '240px', height: '180px'
    }
    const styleTitle = {
        paddingTop: '10px', paddingLeft: '15px', paddingRight: '15px',
        fontSize: '16px', fontWeight: 400, opacity: 0.9,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    return (
        <Link to={ props.url }>
            <animated.div style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img style={ styleImg } src={ props.img }/>
                <div style={ styleTitle }>{ props.name }</div>
                <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px' }}>
                    <ContestLine theme={ props.theme } name="시작">{ props.start }</ContestLine>
                    <ContestLine theme={ props.theme } name="종료">{ props.end }</ContestLine>
                    <ContestLine theme={ props.theme } name="대상">{ props.target }</ContestLine>
                </div>
            </animated.div>
        </Link>
    )
}

const Empty = (props) => {
    return (
        <div className="ND">
            <div style={{ height: '30px' }}/>
            <div style={{ textAlign: 'center' }}>
                <img src={ svgEmpty } alt="" style={{ width: '30px', height: '30px' }}/>
            </div>
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white') }}>{ props.children }</div>
        </div>
    )
}

const Table = (props) => {
    if (props.list.length <= 0 && props.empty) {
        return <Empty theme={ props.theme }>{ props.empty }</Empty>;
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className="ND">
            { props.list.map((item, index) => <Contest key={ index } theme={ props.theme } { ...item }/>) }
        </div>
    )
}

Table.defaultProps = {
    list: []
}

export default Table;