import { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';

const ProfBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: `${ props.size }px`, height: `${ props.size }px`, borderRadius: `${ props.size/2 + 1 }px`,
        background: 'white', position: 'relative', overflow: 'hidden',
        border: '1px solid rgba(120,120,120,0.2)',
        transform: `scale(${ isHover ? 1.1 : 1.0 })`,
        boxShadow: `0px 5px 10px 5px rgba(50,50,50,${ isHover ? 0.1 : 0 })`,
        config: { duration: 100 }
    });
    const styleImg = {
        position: 'absolute', top: '0px', left: '0px',
        width: '100%', height: '100%'
    }

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Link to={ `/profile/${ props.id }` }>
                <img style={ styleImg } src={ `https://euleroj.io/profile-img/${ props.id }.webp?size=${ props.size }` } alt={ props.id }/>
            </Link>
        </animated.div>
    )
}
ProfBtn.defaultProps = {
    size: 36
}

export default ProfBtn;