import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Loading from '../../Frame/Loading/Loading';

import svgBrain from '../svg_brain.svg';
import svgAdd from './svg_add.svg';
import svgRemove from './svg_remove.svg';
import svgTime from './svg_time.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>불러오는 중...</div>
        </div>
    )
}

const Member = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '50px', position: 'relative', overflow: 'hidden',
        background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)',
        borderBottom: '1px solid rgba(100,100,100,0.3)',
        config: { duration: 100 }
    });
    const styleId = {
        position: 'absolute', top: '0px', left: '50px',
        height: '50px', lineHeight: '50px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleProf = {
        position: 'absolute', top: '10px', left: '10px', overflow: 'hidden',
        width: '30px', height: '30px', borderRadius: '16px',
        border: '1px solid rgba(120,120,120,0.5)',
        background: 'white'
    }

    const [isHoverAdd1, setHoverAdd1] = useState(false);
    const [isHoverAdd2, setHoverAdd2] = useState(false);
    const [isHoverRemove, setHoverRemove] = useState(false);
    const styleAdd1 = useSpring({
        height: '36px', position: 'relative', borderRadius: '6px',
        background: `rgba(120,120,120,${ isHoverAdd1 ? 0.2 : 0.15 })`,
        config: { duration: 100 }
    })
    const styleAdd2 = useSpring({
        height: '36px', position: 'relative', borderRadius: '6px',
        background: `rgba(120,120,120,${ isHoverAdd2 ? 0.2 : 0.15 })`,
        config: { duration: 100 }
    })
    const styleAddImg = {
        position: 'absolute', top: '6px', left: '10px', width: '24px'
    }
    const styleAddText = {
        height: '36px', lineHeight: '36px',
        paddingLeft: '39px', paddingRight: '10px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    let rightLay = (
        <>
            <animated.div style={ styleAdd1 } className="BTNC"
            onMouseEnter={ () => setHoverAdd1(true) } onMouseLeave={ () => setHoverAdd1(false) }>
                <img src={ svgAdd } alt="add" style={ styleAddImg }/>
                <div style={ styleAddText }>선생님으로 구성원에 추가</div>
            </animated.div>
            <animated.div style={ styleAdd2 } className="BTNC"
            onMouseEnter={ () => setHoverAdd2(true) } onMouseLeave={ () => setHoverAdd2(false) }>
                <img src={ svgAdd } alt="add" style={ styleAddImg }/>
                <div style={ styleAddText }>학생으로 구성원에 추가</div>
            </animated.div>
        </>
    )

    const styleRemove = useSpring({
        height: '36px', position: 'relative', borderRadius: '6px',
        background: `rgba(120,120,120,${ isHoverRemove ? 0.2 : 0.15 })`,
        config: { duration: 100 }
    })
    const stylePos = {
        height: '36px', lineHeight: '36px', width: '50px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleTime = {
        height: '36px', lineHeight: '36px', width: '100px',
        fontSize: '14px', fontWeight: 300,
        color: 'gray', fontWeight: 400
    }
    const styleTimeicon = {
        verticalAlign: 'middle', height: '20px', marginTop: '-3px'
    }
    rightLay = (
        <>
            <div style={ styleTime }><img src={ svgTime } alt="last access" style={ styleTimeicon }/>10시간 전</div>
            <div style={ stylePos }>선생님</div>
            <animated.div style={ styleRemove } className="BTNC"
            onMouseEnter={ () => setHoverRemove(true) } onMouseLeave={ () => setHoverRemove(false) }>
                <img src={ svgRemove } alt="add" style={ styleAddImg }/>
                <div style={ styleAddText }>구성원에서 제거</div>
            </animated.div>
        </>
    )

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Link to={ `/profile/${ props.id }` }>
                <div style={ styleProf }>
                    <img style={{ width: '100%', height: '100%' }} src={ `https://euleroj.io/profile-img/${ props.id }.webp?size=40` } alt=""/>
                </div>
                <div style={ styleId }>{ props.id }</div>
            </Link>
            <div style={{ position: 'absolute', right: '10px', top: '7px',
            display: 'flex', justifyContent: 'flex-end', gap: '7px' }} className="ND">
                { rightLay }
            </div>
            
        </animated.div>
    )
}

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = { inputValue: '', list: undefined }
    }
    onSearch(str){
        if (str.length <= 30) {
            this.setState({ inputValue: str }, () => {
                if(str.length >= 1){

                }
            });
        }
    }
    render(){
        return (
            <div>
                <Layout.Title icon={ svgBrain } theme={ this.props.theme }>모든 멤버십 구성원</Layout.Title>
                <Layout.Content theme={ this.props.theme }>Id 검색을 통해 멤버십 구성원을 등록하고 삭제할 수 있습니다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input theme={ this.props.theme } type="text"
                value={ this.state.inputValue } onChange={ (x) => this.onSearch(x) }/>

                <div style={{ height: '50px' }}/>
                <div style={{ borderBottom: '2px solid rgba(120,120,120,0.5)', height: '30px',
                color: (this.props.theme==='light' ? 'black' : 'white') }}>구성원 리스트</div>
                <Member theme={ this.props.theme } id="supernova"/>
                <Member theme={ this.props.theme } id="euler"/>
            </div>
        )
    }
}

export default Edit;