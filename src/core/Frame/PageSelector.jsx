import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

let pageStyle = {
    display: 'inline-block', fontSize: '16px', fontWeight: '300', fontFamily: 'Nanum Gothic',
    height: '30px', lineHeight: '30px', minWidth: '10px',
    paddingLeft: '10px', paddingRight: '10px', borderRadius: '15px'
}
const Page = (props) => {
    const [isHover, setHover] = useState(false);
    const backgroundColor = (props.selected ? `rgba(${ props.colorSelected },${ props.colorSelected },${ props.colorSelected },1)` : `rgba(${ props.color },${ props.color },${ props.color },0)`);
    const backgroundColorHover = (props.selected ? `rgba(${ props.colorSelected },${ props.colorSelected },${ props.colorSelected },1)` : `rgba(${ props.color },${ props.color },${ props.color },1)`);
    const background = useSpring({
        background: isHover ? backgroundColorHover : backgroundColor,
        config: { duration: 100 }
    }).background;

    return (
        <Link to={ props.url }>
            <animated.span
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...pageStyle, background: background }}>{ props.page }</animated.span>
        </Link>
    )
}
const PageLeft = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? `rgba(${ props.color },${ props.color },${ props.color },1)` : `rgba(${ props.color },${ props.color },${ props.color },0)`,
        config: { duration: 100 }
    }).background;

    return (
        <Link to={ props.url }>
            <animated.span
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...pageStyle, background: background }}>&lt;</animated.span>
        </Link>
    )
}
const PageRight = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? `rgba(${ props.color },${ props.color },${ props.color },1)` : `rgba(${ props.color },${ props.color },${ props.color },0)`,
        config: { duration: 100 }
    }).background;

    return (
        <Link to={ props.url }>
            <animated.span
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...pageStyle, background: background }}>&gt;</animated.span>
        </Link>
    )
}

class PageSelector extends Component {
    render() {
        const page = parseInt(this.props.page);
        var left = Math.max(1, page-4);
        var right = Math.min(this.props.max, page+4);

        if(this.props.theme === 'dark') pageStyle.color = 'white';
        else pageStyle.color = 'black';

        while(true){
            var keep = false;
            if(right < this.props.max && right-left < 8){ right++; keep = true; }
            if(left > 1 && right-left < 8){ left--; keep = true; }
            if(keep === false) break;
        }

        if(left >= right || this.props.max <= 1) return <></>;

        const content = [];
        if(left < page){
            const color = (this.props.theme === 'light' ? 227 : 50);
            content.push(<PageLeft key="left" page={ Math.max(1, left-1) } url={ this.props.get(Math.max(1, left-1)) } color={ color }/>)
            content.push(<span key="left-sp">&nbsp;</span>)
        }
        for(var i=left; i<=right; i++){
            const colorSelected = (this.props.theme === 'light' ? 200 : 70);
            const color = (this.props.theme === 'light' ? 227 : 50);
            content.push(<Page key={ i*2-1 } page={ i } url={ this.props.get(i) } selected={ i === page } color={ color } colorSelected={ colorSelected }/>);
            content.push(<span key={ i*2 }>&nbsp;</span>)
        }
        if(page < right){
            const color = (this.props.theme === 'light' ? 227 : 50);
            content.push(<PageRight key="right" page={ Math.min(this.props.max, right+1) } url={ this.props.get(Math.min(this.props.max, right+1)) } color={ color }/>)
        }

        return (
            <div className="ND" style={{ paddingTop: '30px', textAlign: 'center' }}>
                { content }
            </div>
        );
    }
}

PageSelector.defaultProps = {
    theme: 'light'
}
export default PageSelector;