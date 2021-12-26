import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import Tooltip from '../../Tool/tooltip';
import trans from '../../Tool/trans';

import svgGood from './svg_good.svg';
import svgGoodFill from './svg_good_fill.svg';

const TableTop = () => {
    const borderLine = '2px solid rgb(0,150,200)';
    return (
        <div style={{ height: '0px', borderTop: borderLine }}/>
    )
}

const Good = (props) => {
    const [isHoverGood, setHoverGood] = useState(false);
    const [goods, setGoods] = useState(props.good);
    const [pushed, setPushed] = useState(props.pushed);
    const onCall = useRef(false);
    const goodItem = useRef();

    const styleGood = useSpring({
        display: 'inline-block', height: '25px', borderRadius: '13px', verticalAlign: 'top',
        marginLeft: '3px', paddingLeft: '10px', paddingRight: '10px',
        background: `rgba(160,160,160,${ isHoverGood ? 0.3 : 0 })`,
        config: { duration: 100 }
    })
    const styleGoodImg = {
        verticalAlign: 'top', width: '20px', height: '20px', marginTop: '3px'
    }
    const styleGoodText = {
        display: 'inline-block', verticalAlign: 'top', height: '25px', lineHeight: '25px',
        fontSize: '15px', fontWeight: 500, color: 'orange'
    }
    const onClick = () => {
        if(!onCall.current){
            onCall.current = true;
            axios.get(`json/stats/blogging/good/${ props.id }`).then(({ data }) => {
                setGoods(data.tot);

                if(pushed === false && data.me === true){
                    /*const id = props.tooltip.create(goodItem.current, 'top', '좋아요 하셨습니다!');

                    if(goodItem.current.goofTooltipId) props.tooltip.remove(goodItem.current.goofTooltipId);
                    goodItem.current.goofTooltipId = undefined;

                    goodItem.current.goofTooltipId = id;
                    setTimeout(() => {
                        if(goodItem.current.goofTooltipId === id) props.tooltip.remove(id);
                        goodItem.current.goofTooltipId = undefined;
                    }, 1000);*/
                }
                else{
                    /*const id = props.tooltip.create(goodItem.current, 'top', '좋아요를 취소하셨습니다!');

                    if(goodItem.current.goofTooltipId) props.tooltip.remove(goodItem.current.goofTooltipId);
                    goodItem.current.goofTooltipId = undefined;

                    goodItem.current.goofTooltipId = id;
                    setTimeout(() => {
                        if(goodItem.current.goofTooltipId === id) props.tooltip.remove(id);
                        goodItem.current.goofTooltipId = undefined;
                    }, 1000);*/
                }

                setPushed(data.me);
                onCall.current = false;
            });
        }
    }

    return (
        <Link to="#">
            <animated.span style={ styleGood } className="BTNC ND" ref={ goodItem } onClick={ () => onClick() }
            onMouseEnter={ () => setHoverGood(true) } onMouseLeave={ () => setHoverGood(false) }>
                <img style={ styleGoodImg } src={ pushed ? svgGoodFill : svgGood }/>
                <span style={ styleGoodText }>{ goods }</span>
            </animated.span>
        </Link>
    )
}

const TableItem = (props) => {
    const [isHover, setHover] = useState(false);

    const style = {
        height: '70px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', overflow: 'hidden'
    }
    const styleTitle = {
        position: 'absolute', top: '13px', left: '20px', right: '200px',
        height: '25px'
    }
    const styleTitleText = {
        display: 'inline-block', height: '25px', lineHeight: '25px', maxWidth: 'calc(100% - 70px)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        fontSize: '16px', fontWeight: 500, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleSubtitle = {
        position: 'absolute', bottom: '13px', left: '20px',
        fontSize: '14px', fontWeight: 300, color: 'gray'
    }
    const styleProf = {
        position: 'absolute', top: '15px', right: '20px', width: '40px', height: '40px',
        borderRadius: '20px', border: '1px solid rgba(120,120,120,0.5)', overflow: 'hidden'
    }
    const styleLoginId = {
        position: 'absolute', top: '15px', right: '70px',
        fontSize: '16px', fontWeight: 400, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleDate = {
        position: 'absolute', bottom: '15px', right: '70px',
        fontSize: '13px', fontWeight: 300, color: 'gray'
    }
    const styleBackground = useSpring({ background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)', config: { duration: 100 } });
    
    return (
        <a href={ props.url } target="_blank" rel="noreferrer">
            <animated.div style={{ ...style, ...styleBackground }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={ styleTitle }>
                    <a href={ props.url } target="_blank" rel="noreferrer">
                        <span style={ styleTitleText }>{ props.name }</span>
                    </a>
                    <Good id={ props.id } good={ props.good } pushed={ props.dogood } tooltip={ props.tooltip }/>
                </div>
                <div style={ styleSubtitle } className="ND">{ props.subname }</div>
                { props.loginId ? <>
                    <Link to={ `/profile/${ props.loginId }` }>
                        <div style={ styleProf } className="ND">
                            <img style={{ width: '100%', height: '100%' }} alt="profile image"
                            src={ `/profile-img/${ props.loginId }.webp?size=40` }/>
                        </div>
                    </Link>
                    <Link to={ `/profile/${ props.loginId }` }>
                        <div style={ styleLoginId }>{ props.loginId }</div>
                    </Link>
                </> : '' }
                
                <div style={ styleDate } className="ND">{ trans.date2(new Date(props.date)) }</div>
            </animated.div>
        </a>
    )
}

const Table = (props) => {
    const tooltip = useRef(new Tooltip());

    useEffect(() => {
        return () => {
            tooltip.current.clear();
        }
    }, []);

    if(props.list.length <= 0) return <div/>;
    return (
        <div>
            <TableTop/>
            { props.list.map((item, index) => <TableItem key={ index } theme={ props.theme } id={ item.id }
            name={ item.name } subname={ item.subname } good={ item.good } dogood={ item.dogood }
            loginId={ item.loginId } date={ item.date } url={ item.url } tooltip={ tooltip.current }/>) }
        </div>
    )
}
Table.defaultProps = {
    theme: 'light', list: []
}

export default Table;