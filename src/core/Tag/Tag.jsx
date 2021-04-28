import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from '../Tool/axios';
import Top from '../Frame/Top/Top';
import TopBackground from './TagTopBackground/TagTopBackground';
import TagIcon from './TagIcon/TagIcon';
import TagTable from './TagTable';
import ProblemTable from '../Probelmset/ProblemTable'
import Loading from '../Frame/Loading/Loading';
import Footer from '../Frame/Footer'
import svgArrow from './svg_arrow.svg';

const TopFixedLayIcon = (props) => {
    const [isHover, setHover] = useState(false);
    const iconStyle = {
        display: 'inline-block', height: '30px', lineHeight: '30px', borderRadius: '12px',
        marginTop: '10px', position: 'relative',
    };
    const background = useSpring({ background: isHover ? 'rgba(200,200,200,0.2)' : 'rgba(200,200,200,0)', config: { duration: 100 } }).background;
    return (
        <Link to={ `/tags/${ props.id }` }>
            <animated.span style={{ ...iconStyle, background: background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={{ position: 'absolute', left: '6px', top: '1px', width: '20px', height: '30px' }}><TagIcon type={ props.type } scale="20px"/></div>
                <span style={{ paddingLeft: '30px', paddingRight: '8px', fontSize: '16px', fontWeight: '300', color: 'white' }}>{ props.name }</span>
            </animated.span>
        </Link>
    );
}
const TopFixedLayArrow = () => {
    return (
        <img src={ svgArrow } style={{ height: '10px', marginLeft: '6px', marginRight: '6px' }}/>
    )
}
const TopFixedLay = (props) => {
    const content = [];
    for(var i=0; i<props.list.length; i++){
        content.push(<TopFixedLayIcon type={ props.list[i].icon } name={ props.list[i].name } id={ props.list[i].id }/>);
        if(i < props.list.length-1) content.push(<TopFixedLayArrow/>);
    }
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            { content }
        </div>
    )
}

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}
const TableLay = (props) => {
    return (
        <div style={{ paddingTop: '50px' }}>
            <TagTable content={ props.tags }/>
            <ProblemTable content={ props.problems }/>
        </div>
    );
}
const ErrorLay = (props) => {
    return <div style={{ paddingTop: '50px' }}>{ props.msg || '해당 태그를 찾을 수 없습니다.' }</div>
}

class Tag extends Component {
    constructor(props){
        super(props);

        this.state = { err: undefined, msg: undefined, info: undefined, route: [], tagChild: undefined, problemChild: undefined };
        axios.get(`/json/tags/getInfo/${ props.id }`).then((tagInfo) => {
            if(!tagInfo.data.err) document.title = `${ tagInfo.data.info.name } : 오일러OJ`;
            else{ tagInfo.data.info = { title: '', icon: 'tag' }; tagInfo.data.route = [] }
            this.setState({ err: tagInfo.data.err, msg: tagInfo.data.msg, info: tagInfo.data.info, route: tagInfo.data.route, tagChild: tagInfo.data.tagChild, problemChild: tagInfo.data.problemChild });
        });
    }
    componentDidMount(){
        document.title = "태그 : 오일러OJ"
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        if(prevProps.id != this.props.id){
            this.setState({ err: undefined, msg: undefined, info: undefined, route: [], tagChild: undefined, problemChild: undefined });
            axios.get(`/json/tags/getInfo/${ this.props.id }`).then((tagInfo) => {
                if(!tagInfo.data.err) document.title = `${ tagInfo.data.info.name } : 오일러OJ`;
                else{ tagInfo.data.info = { title: '', icon: 'tag' }; tagInfo.data.route = [] }
                this.setState({ err: tagInfo.data.err, msg: tagInfo.data.msg, info: tagInfo.data.info, route: tagInfo.data.route, tagChild: tagInfo.data.tagChild, problemChild: tagInfo.data.problemChild });
            });
        }
    }
    render() {
        return (
            <div>
                <Top icon={ <TagIcon type={ this.state.info ? this.state.info.icon : 'tag' } scale="40px" on="top"/> }
                title={ this.state.info ? this.state.info.name : '' }
                background={ <TopBackground/> } fixedLay={ <TopFixedLay list={ this.state.route }/> }/>
                
                <div className="FRAME_MAIN ND">
                    { this.state.err ? <ErrorLay msg={ this.state.msg }/> : 
                        (this.state.tagChild || this.state.problemChild ? <TableLay tags={ this.state.tagChild } problems={ this.state.problemChild }/> : <LoadingLay/>)  
                    }
                    <div className="BTM_EMPTY"></div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Tag;