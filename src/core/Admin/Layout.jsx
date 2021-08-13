import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Title = (props) => {
    return (
        <div style={{ position: 'relative', marginBottom: '10px' }}>
            <img src={ props.icon } alt="" style={{ position: 'absolute', top: '0px', left: '0px', width: '35px', height: '35px' }}/>
            <div style={{
                marginLeft: '42px', fontSize: '20px', fontWeight: 500, lineHeight: '35px',
                color: (props.theme==='light' ? 'rgb(80,80,80)' : 'rgb(170,170,170)')
            }}>{ props.children }</div>
        </div>
    )
}

const Content = (props) => {
    return (
        <div style={{ fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white') }}>
            { props.children }
        </div>
    )
}

const Input = (props) => {
    const [isFocus, setFocus] = useState(false);
    const borderFocus = 'gray';
    const borderDefault = 'rgb(200,200,200)';
    const border = useSpring({
        border: `2px solid ${ isFocus ? borderFocus : borderDefault }`
    }).border

    return (
        <animated.div style={{ paddingBottom: '5px', paddingTop: '5px', borderBottom: border }}>
            <input type={ props.type } onFocus={ () => setFocus(true) } onBlur={ () => setFocus(false) }
            style={{ width: 'calc(100% - 14px)', border: 'none', outline: 'none', paddingLeft: '7px', paddingRight: '7px', background: 'none', fontSize: '16px' }}/>
        </animated.div>
    )
}

const Margin = () => {
    return <div style={{ height: '50px' }}/>
}

const res = { Title, Content, Input, Margin };
export default res;