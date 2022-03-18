import { useSpring, animated } from 'react-spring';
import { Component, useState } from 'react';
import ProblemTable from './ProblemTable';

import svgSort from './svg_sort.svg';

const BtnSortItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        paddingLeft: '15px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '5px',
        fontSize: '15px', fontWeight: 300, color: (props.theme === 'light' ? 'rgb(30,30,30)' : 'gray'),
        background: `rgb(120,120,120,${ isHover ? 0.2 : 0 })`,
        config: { duration: 100 }
    });
    return (
        <animated.div style={ style } className="BTNC" onClick={ () => props.onClick() }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>{ props.children }</animated.div>
    )
}
const BtnSort = (props) => {
    const [isHover, setHover] = useState(false);
    const [isClick, setClick] = useState(false);
    const backgroundColor = (props.theme === 'light' ? 210 : 70);
    const style = useSpring({
        background: `rgba(${ backgroundColor },${ backgroundColor },${ backgroundColor },${ isHover || isClick ? 1 : 0.5 })`,
        borderRadius: '10px', paddingLeft: '5px', paddingRight: '8px', paddingTop: '1px', paddingBottom: '3px',
        config: { duration: 100 }
    });
    const styleText = {
        verticalAlign: 'middle', marginLeft: '5px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'rgb(30,30,30)' : 'gray')
    }
    const styleOptionbox = useSpring({
        position: 'absolute', right: '0px', top: '38px', zIndex: 10,
        borderRadius: '10px', overflow: 'hidden',
        WebkitBackdropFilter: `blur(6px)`, backdropFilter: `blur(6px)`,
        background: `rgba(${ backgroundColor },${ backgroundColor },${ backgroundColor },0.5)`,
        opacity: isClick ? 1 : 0,
        pointerEvents: isClick ? 'auto' : 'none',
        config: { duration: 100 }
    })

    return (
        <>
            <animated.span className="BTNC" style={ style } onClick={ () => setClick(!isClick) }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ svgSort } alt="Sort By" style={{ verticalAlign: 'middle', height: '20px' }}/>
                <span style={ styleText }>{ props.list[props.index].name }</span>
            </animated.span>
            <animated.div style={ styleOptionbox }>
                { props.list.map((item, index) => {
                    const onClick = () => {
                        setClick(false); props.handler(index)
                    }
                    return <BtnSortItem key={ index } theme={ props.theme } onClick={ onClick }>{ item.name }</BtnSortItem>
                }) }
            </animated.div>
        </>
    )
}
class Table extends Component {
    constructor(props){
        super(props);
        this.sortList = [
            { name: '코딩마법서', cmp: (x, y) => this.props.content.indexOf(x) - this.props.content.indexOf(y) },
            { name: '문제 번호', cmp: (x, y) => x.id - y.id },
            { name: '제목', cmp: (x, y) => x.title > y.title ? 1 : -1 },
            { name: '틀린 문제', cmp: (x, y) => {
                const xPoint = (x.res === '100' ? 3 : (x.res === '0' ? 2 : 1));
                const yPoint = (y.res === '100' ? 3 : (y.res === '0' ? 2 : 1));
                return xPoint - yPoint;
            } },
        ];
        this.sortList[0].cmp.bind(this);
        this.state = { sort: 0, content: this.props.content }
    }
    /*static getDerivedStateFromProps(nextProps, prevState){
        return { sort: 0, content: nextProps.content };
    }*/
    doSort(index){
        const array = this.state.content.slice();
        array.sort(this.sortList[index].cmp);
        this.setState({ sort: index, content: array })
    }
    render() {
        return (
            <div>
                <div className="ND" style={{ position: 'relative', display: 'flex', flexDirection: 'row-reverse' }}>
                    <BtnSort theme={ this.props.theme } handler={ (x) => this.doSort(x) }
                    list={ this.sortList } index={ this.state.sort }/>
                </div>
                <div style={{ height: '30px' }}/>
                <ProblemTable content={ this.state.content } theme={ this.props.theme }/>
            </div>
        )
    }
}

export default Table;