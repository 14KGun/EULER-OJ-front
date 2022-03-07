import { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

// import svgSearch from './svg_search.svg';
import svgSearchFocus from './svg_search_focus.svg';
import svgSearchWhite from './svg_search_white.svg';

const encoding = (x) => {
    return x.split('&').join(';and;');
}
const goSearch = (text, option = {}) => {
    let props = '';
    if(option.user) props += 'user*';
    if(option.tag) props += 'tag*';
    if(option.prob) props += 'prob*';
    if(option.page) props += `&page=${ option.page }`;
    window.location.href = `https://euleroj.io/search?txt=${ encoding(text) }&option=${ props }`;
}
const SearchBox = (props) => {
    const input = useRef(undefined);
    const [isOpen, setOpen] =  useState(false);
    const [isHover, setHover] =  useState(false);
    const [isFocus, setFocus] = useState(false);
    const [value, valueHandler] = useState('');
    const style = useSpring({
        width: isOpen ? props.width : '34px',
        background: `rgba(255,255,255,${ isOpen ? 0.8 : (isHover ? 0.4 : 0.3) })`,
        height: '34px', borderRadius: '17px',
        position: 'relative', overflow: 'hidden',
        config: { duration: 100 }
    })
    const styleImg = {
        width: '16px', height: '16px',
        position: 'absolute', top: '0px', left: '0px',
        padding: '9px'
    }
    const styleImg2 = useSpring({
        opacity: isOpen ? 1 : 0
    })
    const styleInput = {
        background: 'none', border: 'none', outline: 'none',
        position: 'absolute', left: '30px', width: 'calc(100% - 40px)',
        top: '0px', height: '100%', lineHeight: '34px', 
        fontSize: '15px', fontWeight: 300, color: 'black'
    }

    const onClick = () => {
        if(isOpen === false && input.current){
            input.current.focus();
        }
        setOpen(!isOpen)
    }
    const onChange = (e) => valueHandler(e.target.value);
    const onKeyUp = () => {
        console.log(input.current)
        if(window.event.keyCode === 13) goSearch(value, { tag: true, prob: true });
    }

    return (
        <animated.div style={{ ...style }} className="ND"
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img src={ svgSearchWhite } alt="search" style={{ ...styleImg }}/>
            <animated.img src={ svgSearchFocus } alt="search" className="BTNC"
            onClick={ () => onClick() } style={{ ...styleImg, ...styleImg2 }}/>
            <input type="text" style={ styleInput } value={ value }
            ref={ input }
            onFocus={ () => setFocus(true) } onBlur={ () => setFocus(false) }
            onChange={ (e) => onChange(e) } onKeyUp={ () => onKeyUp() }/>
        </animated.div>
    )
}
SearchBox.defaultProps = {
    width: '250px'
}

export default SearchBox;
