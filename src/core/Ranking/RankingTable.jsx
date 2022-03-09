import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import trans from '../Tool/trans';
import svgAccept from './svg_accpet.svg';
import svgTrophy from './svg_trophy.svg';
import svgActivity from './svg_activity.svg';
import svgClock from './svg_clock.svg';

const RangkingTop = () => {
    const borderLine = '2px solid rgb(0,150,200)';
    return (
        <div style={{ height: '0px', borderTop: borderLine }}/>
    )
}
const RankSubItem = (props) => {
    const styleImg = {
        position: 'absolute', top: '0px', left: '0px',
        width: '20px', height: '20px'
    }
    const styleTxt = {
        position: 'absolute', top: '0px', left: '25px',
        height: '20px', lineHeight: '20px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'rgb(70,70,70)' : 'rgb(180,180,180)')
    }
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }} className="ND">
            <img src={ props.icon } style={ styleImg } alt=""/>
            <div style={ styleTxt }>{ props.txt }</div>
        </div>
    )
}
const RankItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        height: '80px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', overflow: 'hidden'
    }
    const styleLay1 = {
        position: 'absolute', top: '0px', left: '15px', height: '80px', lineHeight: '80px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'black' : 'white'),
        width: '40px', textAlign: 'center'
    }
    const styleLay2 = {
        position: 'absolute', top: '15px', left: '70px', overflow: 'hidden',
        width: '50px', height: '50px', border: '1px solid gray', borderRadius: '26px', background: 'white'
    }
    const styleLay3 = {
        position: 'absolute', top: '17px', left: '135px',
        fontSize: '16px', fontWeight: 500, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleLay4 = {
        position: 'absolute', bottom: '20px', left: '135px',
        fontSize: '13px', fontWeight: 300, color: (props.theme === 'light' ? 'rgb(70,70,70)' : 'rgb(180,180,180)')
    }
    const styleLay5 = {
        position: 'absolute', top: '30px', right: '150px', width: '70px', height: '20px'
    }
    const styleLay6 = {
        position: 'absolute', top: '30px', right: '80px', width: '70px', height: '20px'
    }
    const styleLay7 = {
        position: 'absolute', top: '30px', right: '10px', width: '70px', height: '20px'
    }
    const styleLay8 = {
        position: 'absolute', top: '30px', right: '230px', width: '120px', height: '20px'
    }
    const styleBackground = useSpring({ background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)', config: { duration: 100 } });

    return (
        <Link to={ `/profile/${ props.id }` }>
            <animated.div style={{ ...style, ...styleBackground }} onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={ styleLay1 } className="ND">{ props.rank }</div>
                <div style={ styleLay2 } className="ND">
                    <img src={ `https://euleroj.io/profile-img/${ props.id }.webp?size=50` } alt="" style={{ height: '100%', width: '100%' }}/>
                </div>
                <div style={ styleLay3 }>{ props.id }</div>
                <div style={ styleLay4 }>{ props.msg }</div>
                <div style={ styleLay5 }><RankSubItem icon={ svgAccept } txt={ props.solve } theme={ props.theme }/></div>
                <div style={ styleLay6 }><RankSubItem icon={ svgTrophy } txt={ props.trophy } theme={ props.theme }/></div>
                <div style={ styleLay7 }><RankSubItem icon={ svgActivity } txt={ props.activity } theme={ props.theme }/></div>
                { props.time === 'online' ? <div style={ styleLay8 }><RankSubItem icon={ svgClock } txt={ props.time } theme={ props.theme }/></div>
                : <div style={ styleLay8 }><RankSubItem icon={ svgClock } txt={ `${ trans.timeParsePositive(props.time) } 전` } theme={ props.theme }/></div> }
            </animated.div>
        </Link>
    )
}
const RankingTable = (props) => {
    if(props.list.length <= 0) return <div/>;
    return (
        <div>
            <RangkingTop/>
            { props.list.map((item, index) => <RankItem rank={ item.rank } id={ item.id } solve={ item.solve } trophy={ item.trophy } activity={ item.activity } time={ item.time } msg={ item.msg } theme={ props.theme }/>) }
        </div>
    )
}

RankingTable.defaultProps = {
    theme: 'light'
}
export default RankingTable;