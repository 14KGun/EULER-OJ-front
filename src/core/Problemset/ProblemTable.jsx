import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import getHref from '../Tool/getHref';
import axios from '../Tool/axios';

import svgPersonGreen from './svg_personGreen.svg';
import svgPersonGray from './svg_personGray.svg';
import imgNosolve from '../Tag/TagIcon/img_nosolveLight.png'
import imgYoutube from '../Tag/TagIcon/img_youtubeLight.png'
import imgBlog from '../Tag/TagIcon/img_blogLight.png'
import svgEmpty from './svg_empty.svg';

const ProblemTop = () => {
    const borderLine = '2px solid rgb(0,150,200)';
    const ItemStyle = {
        height: '60px', lineHeight: '60px',
        fontSize: '17px', fontWeight: '700', color: 'rgb(0,150,200)',
        position: 'absolute', top: '0px',
        textAlign: 'center'
    }
    const Item1Style = { left: '20px', width: '78px' };
    const Item2Style = { left: '130px' }; 
    const Item3Style = { right: '20px', width: '80px' };
    const Item4Style = { right: '120px', width: '80px' };
    return (
        <div className="ND" style={{ height: '60px', borderTop: borderLine, borderBottom: borderLine, position: 'relative' }}>
            <div style={{ ...Item1Style, ...ItemStyle }}>#</div>
            <div style={{ ...Item2Style, ...ItemStyle }}>제목</div>
            <div style={{ ...Item3Style, ...ItemStyle }}>제출 횟수</div>
            <div style={{ ...Item4Style, ...ItemStyle }}>맞은 사람</div>
        </div>
    )
}
const ProblemItem = (props) => {
    const Item1Style = {
        float: 'left',
        width: '16px', marginLeft: '20px',
        height: '16px', marginTop: '22px', borderRadius: '8px',
        background: (props.res==='0' ? 'rgb(220,220,220)' : (props.res==='100' ? 'rgb(34,177,76)' : 'rgb(255,127,39)'))
    };
    const Item2Style = {
        float: 'left',
        width: 'auto', marginLeft: '20px',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: '300',
        color: props.theme === 'light' ? 'rgb(70,70,70)' : 'rgb(150,150,150)'
    }
    const Item3Style = {
        position: 'absolute', top: '0px', left: '130px',
        height: '60px', overflow: 'hidden',
        width: 'calc(100% - 330px)'
    }
    const Item3TxtStyle = {
        display: 'inline-block',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: '500',
        color: props.theme === 'light' ? 'black' : 'white'
    }
    const Item3ImgStyle = {
        width: '20px', height: '20px',
        verticalAlign: 'middle', paddingBottom: '5px', marginLeft: '2px'
    }
    const Item4Style = {
        float: 'right', width: '80px', height: '60px', position: 'relative', marginRight: '20px'
    }
    const Item4Imgstye = {
        position: 'absolute', top: '22px', left: '0px',
        width: '16px', height: '16px'
    }
    const Item4Txtstye = {
        position: 'absolute', top: '0px', left: '22px',
        height: '60px', lineHeight: '60px',
        color: props.theme === 'light' ? 'black' : 'white'
    }
    
    const [ isHover, setHover ] = useState(false);
    const background = useSpring({ background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)', config: { duration: 100 } }).background;

    const tagList = [];
    if(props.tags.nosolve){ tagList.push(<span key="sp1">&nbsp;</span>); tagList.push(<img key="nosolve" src={ imgNosolve } style={ Item3ImgStyle } alt="nosolve"/>); }
    if(props.tags.youtube){ tagList.push(<span key="sp2">&nbsp;</span>); tagList.push(<img key="youtube" src={ imgYoutube } style={ Item3ImgStyle } alt="youtube"/>); }
    if(props.tags.blog){ tagList.push(<span key="sp3">&nbsp;</span>); tagList.push(<img key="blog" src={ imgBlog } style={ Item3ImgStyle } alt="blog"/>); }

    return (
        <animated.div style={{ height: '60px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', overflow: 'hidden', background: background }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Link to={ props.myId === undefined || props.myId === '' ? getHref.loginCurrentUrl() : `/status/${ getHref.encodeObject({ problemId: props.id, loginId: props.myId }) }` }>
                <div style={ Item1Style }></div>
            </Link>
            <Link to={`/problemset/problem/${ props.id }`}>
                <div style={ Item2Style }>#{ props.id }</div>
            </Link>
            <Link to={`/problemset/problem/${ props.id }`}>
                <div style={ Item3Style }>
                    <span style={ Item3TxtStyle }>{ props.title }</span>
                    { tagList }
                </div>
            </Link>
            <Link to={`/status/${ getHref.encodeObject({ problemId: props.id }) }`}>
                <div style={{ ...Item4Style }}>
                    <img style={ Item4Imgstye } src={ svgPersonGray } alt="submit"/>
                    <div style={ Item4Txtstye }>{ props.submit }</div>
                </div>
            </Link>
            <Link to={`/status/${ getHref.encodeObject({ problemId: props.id, result: 'accepted' }) }`}>
                <div style={{ ...Item4Style }}>
                    <img style={ Item4Imgstye } src={ svgPersonGreen } alt="solve"/>
                    <div style={ Item4Txtstye }>{ props.solve }</div>
                </div>
            </Link>
        </animated.div>
    )
}

const Empty = (props) => {
    return (
        <div className="ND">
            <div style={{ textAlign: 'center' }}>
                <img src={ svgEmpty } alt="" style={{ width: '30px', height: '30px' }}/>
            </div>
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white') }}>{ props.children }</div>
        </div>
    )
}

class ProblemTable extends Component {
    constructor(props){
        super(props);

        this.state = { loginId: undefined }
        axios.get('/json/logininfo').then(({ data }) => {
            this.setState({ loginId: data.id });
        })
    }
    render() {
        if(this.props.content.length <= 0 && this.props.empty) return <Empty theme={ this.props.theme }>{ this.props.empty }</Empty>;
        return (
            <>
                { this.props.content.length > 0 ? <ProblemTop/> : <></> }
                { this.props.content.map((item, index) => <ProblemItem key={ index } id={ item.id } title={ item.title } solve={ item.solve } submit={ item.submit } res={ item.res } tags={ item.tags } theme={ this.props.theme } myId={ this.state.loginId }/>) }
            </>
        );
    }
}

ProblemTable.defaultProps = {
    theme: 'light'
}
export default ProblemTable;