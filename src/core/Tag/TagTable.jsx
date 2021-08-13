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
        fontSize: '16px', fontWeight: '500', color: (props.theme==='light' ? 'black' : 'white')
    }
    const Item3Style = {
        right: '24px', top: '0px',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: '300', color: (props.theme==='light' ? 'rgb(70,70,70)' : 'rgb(180,180,180)')
    }

    const [ isHover, setHover ] = useState(false);
    const ItemBackground = useSpring({ background: isHover ? 'rgba(200,200,200,0.2)' : 'rgba(200,200,200,0)', config: { duration: 100 } }).background;

    var subTxt = '빈 태그';
    if(props.sub.tag > 0 && props.sub.problem > 0) subTxt = `${props.sub.tag}개의 태그와 ${props.sub.problem}개의 문제`;
    else if(props.sub.tag > 0) subTxt = `${props.sub.tag}개의 태그`;
    else if(props.sub.problem > 0) subTxt = `${props.sub.problem}개의 문제`;

    return (
        <Link to={`/tags/${ props.id }`}>
            <animated.div style={{ height: '60px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', background: ItemBackground }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={{ ...ItemStyle, ...Item1Style }}><TagIcon type={ props.type } scale="26px" theme="light"/></div>
                <div style={{ ...ItemStyle, ...Item2Style }}>{ props.name }</div>
                <div style={{ ...ItemStyle, ...Item3Style }}>{ subTxt }</div>
            </animated.div>
        </Link>
    )
}
class TagTable extends Component {
    render() {
        return (
            <>
                { this.props.content.length > 0 ? <TagTop/> : <></> }
                { this.props.content.map((item, index) => <TagItem key={ index } id={ item.id } type={ item.icon } name={ item.name } sub={{ tag: item.subTagLength, problem: item.subProblemLength }} theme={ this.props.theme }/>) }
            </>
        );
    }
}

TagTable.defaultProps = {
    theme: 'light'
}
export default TagTable;