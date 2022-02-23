import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

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
        <Link to={ `/contest/1` }>
            <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img style={ styleImg } src="https://euleroj.io/contest/save/logo/1.png"/>
                <div style={ styleTitle }>제251회 Open Challenge</div>
                <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px' }}>
                    <ContestLine theme={ props.theme } name="시작">2021.02.27 / 12:00</ContestLine>
                    <ContestLine theme={ props.theme } name="종료">2021.02.27 / 12:00</ContestLine>
                    <ContestLine theme={ props.theme } name="대상">누구나</ContestLine>
                </div>
            </animated.div>
        </Link>
    )
}

const Table = (props) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className="ND">
            <Contest theme={ props.theme }/>
            <Contest theme={ props.theme }/>
        </div>
    )
}

export default Table;