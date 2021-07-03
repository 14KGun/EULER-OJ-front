import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const BtnItem = (props) => {
    const [isHover, setHover] = useState(false);

    const style = {
        height: '60px', position: 'relative'
    }
    const springStyle = useSpring({
        background: isHover ? 'rgba(120,120,120,0.1)' : 'rgba(120,120,120,0)',
        config: { duration: 100 }
    })
    const imgStyle = {
        position: 'absolute', top: '15px', left: '15px',
        width: `${ 30 - 2*props.padding }px`,
        height: `${ 30 - 2*props.padding }px`,
        padding: `${ props.padding }px`
    }
    const txtStyle = {
        position: 'absolute', top: '0px', left: '60px',
        width: '200px', height: '60px', lineHeight: '60px',
        textAlign: 'center', fontSize: '16px', fontWeight: '300', color: 'black'
    }

    const content = (
        <animated.div style={{ ...style, ...springStyle }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img style={ imgStyle } src={ props.icon } alt={ props.name }/>
            <div style={ txtStyle }>{ props.name }</div>
        </animated.div>
    )

    if(props.newtab) return <a href={ props.url } target="_blank" rel="noreferrer">{ content }</a>;
    else return <Link to={ props.url } onClick={ props.close }>{ content }</Link>;
}

BtnItem.defaultProps = {
    padding: 0
}

export default BtnItem;