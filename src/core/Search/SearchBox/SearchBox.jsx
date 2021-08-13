import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import svgSearch from './svg_search.svg';
import svgSearchFocus from './svg_search_focus.svg';

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
    const [isFocus, setFocus] = useState(false);
    const [value, valueHandler] = useState('');
    const style = {
        width: '100%', height: '25px', position: 'relative', background: 'white',
        borderRadius: '13px', overflow: 'hidden'
    }
    const styleImg = {
        width: '15px', height: '15px', position: 'absolute', top: '5px', left: '7px'
    }
    const styleInput = {
        position: 'absolute', left: '27px', width: 'calc(100% - 30px)', height: '100%',
        lineHeight: '25px', border: 'none', outline: 'none',
        fontSize: '15px', fontWeight: 300, color: 'black'
    }

    const opacity = useSpring({
        opacity: isFocus ? 1 : 0,
        config: { duration: 150 }
    })
    const onChange = (e) => valueHandler(e.target.value);
    const onKeyUp = () => {
        if(window.event.keyCode === 13) goSearch(value, { tag: true, prob: true });
    }

    return (
        <div style={{ ...style }} className="ND">
            <animated.img src={ svgSearch } alt="search" style={{ ...styleImg }}/>
            <animated.img src={ svgSearchFocus } alt="search" style={{ ...styleImg, ...opacity }}/>
            <input type="text" style={ styleInput } value={ value }
            onFocus={ () => setFocus(true) } onBlur={ () => setFocus(false) }
            onChange={ (e) => onChange(e) } onKeyUp={ () => onKeyUp() }/>
        </div>
    )
}

export default SearchBox;
