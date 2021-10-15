import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Top from '../../Frame/Top/Top';
import SearchBox from '../../Search/SearchBox/SearchBox';

import imgBackground from './img_background.png';
import svgCoding from './svg_coding.svg';

const Icon = () => {
    return (
        <img src={ svgCoding } style={{ paddingTop: '6px' }} alt=""/>
    )
}
const TopBackground = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'rgb(200,200,200)' }}>
            <img src={ imgBackground } style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
        </div>
    )
}

const TopBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgba(150,150,150,0.15)' : 'rgba(150,150,150,0)',
        config: { duration: 150 }
    });
    const opacity = useSpring({
        opacity : props.selected ? 1 : 0,
        config: { duration: 150 }
    });
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
        style={{ height: '50px', float: 'left', ...background }}>
            <div style={{ height: '46px', lineHeight: '46px', paddingLeft: '14px', paddingRight: '14px',
            fontSize: '17px', fontWeight: 300, color: 'rgb(220,220,220)' }}>{ props.name }</div>
            <animated.div style={{ width: '100%', height: '4px', background: 'rgb(0,150,200)', ...opacity }}/>
        </animated.div>
    )
}
const TopFixedLay = (props) => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Link to="/problemset/list/tag"><TopBtn name="태그" selected={ props.category === 'tag' }/></Link>
            <Link to="/problemset/list/books"><TopBtn name="코딩마법서" selected={ props.category === 'level' || props.category === 'books' }/></Link>
            <Link to="/problemset/list/number"><TopBtn name="문제 번호" selected={ props.category === 'number' }/></Link>
            <div style={{ position: 'absolute', width: '250px', top: '12px', right: '0px' }}>
                <SearchBox/>
            </div>
        </div>
    );
}

const ProblemsetTop = (props) => {
    return (
        <Top icon={ <Icon/> } title="문제" background={ <TopBackground/> } fixedLay={ <TopFixedLay category={ props.category }/> }/>
    )
}

export default ProblemsetTop;