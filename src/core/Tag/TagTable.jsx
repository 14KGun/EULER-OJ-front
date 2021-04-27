import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import TagIcon from './TagIcon/TagIcon';

const TagTop = () => {
    const borderLine = '2px solid rgb(0,150,200)';
    const ItemStyle = {
        height: '60px', lineHeight: '60px',
        fontSize: '17px', fontWeight: '700', color: 'rgb(0,150,200)',
        position: 'absolute', top: '0px',
        textAlign: 'center'
    }
    const Item1Style = { left: '64px' }
    return (
        <div style={{ height: '60px', borderTop: borderLine, borderBottom: borderLine, position: 'relative' }}>
            <div style={{ ...Item1Style, ...ItemStyle }}>태그명</div>
        </div>
    )
}
const TagItem = (props) => {
    const ItemStyle = {
        position: 'absolute'
    }
    const Item1Style = {
        left: '20px', top: '17px'
    }
    const Item2Style = {
        left: '64px', top: '0px',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: '500', color: 'black'
    }
    const Item3Style = {
        right: '24px', top: '0px',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: '300', color: 'rgb(70,70,70)'
    }

    const [ isHover, setHover ] = useState(false);
    const ItemBackground = useSpring({ background: isHover ? 'rgba(200,200,200,0.2)' : 'rgba(200,200,200,0)', config: { duration: 100 } }).background;

    return (
        <Link>
            <animated.div style={{ height: '60px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', background: ItemBackground }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={{ ...ItemStyle, ...Item1Style }}><TagIcon type={ props.type } scale="26px"/></div>
                <div style={{ ...ItemStyle, ...Item2Style }}>{ props.name }</div>
                <div style={{ ...ItemStyle, ...Item3Style }}>{ props.sub }</div>
            </animated.div>
        </Link>
    )
}
class TagTable extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <TagTop/>
                <TagItem type="youtube" name="123" sub="6개의 하위 태그"/>
                <TagItem type="folder" name="정보올림피아드" sub="6개의 하위 태그"/>
            </>
        );
    }
}

export default TagTable;