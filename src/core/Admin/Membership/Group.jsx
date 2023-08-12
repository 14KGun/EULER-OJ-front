import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Loading from '../../Frame/Loading/Loading';
import axios from '../../Tool/axios';

import svgBrain from '../svg_brain.svg';
import svgEdit from './svg_edit.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>불러오는 중...</div>
        </div>
    )
}

const BtnAdd = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '40px', borderRadius: '10px', marginTop: '10px',
        textAlign: 'center', lineHeight: '40px',
        background: `rgba(120,120,120,${ isHover ? 0.3 : 0.2 })`,
        color: (props.theme==='light' ? 'black' : 'white'),
        config: { duration: 100 }
    });

    return (
        <Link to="/nadmin/membership/group/add">
            <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={ style }>새로운 멤버십 그룹 추가</animated.div>
        </Link>
    )
}

const Group = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '50px', position: 'relative', overflow: 'hidden',
        background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)',
        borderBottom: '1px solid rgba(100,100,100,0.3)',
        config: { duration: 100 }
    });

    const styleName = {
        position: 'absolute', top: '0px', left: '15px',
        height: '50px', lineHeight: '50px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleLeader = {
        position: 'absolute', top: '0px', right: '100px',
        height: '50px', lineHeight: '50px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleProf = {
        position: 'absolute', top: '10px', right: '60px', overflow: 'hidden',
        width: '30px', height: '30px', borderRadius: '16px',
        border: '1px solid rgba(120,120,120,0.5)',
        background: 'white'
    }
    const styleEdit = {
        position: 'absolute', top: '7px', right: '13px',
        width: '24px'
    }
    const styleEditText = {
        position: 'absolute', bottom: '7px', right: '13px', textAlign: 'center',
        width: '24px', fontSize: '10px', color: 'gray', fontWeight: 500,
    }

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div style={ styleName }>{ props.name }</div>
            <Link to={ `/profile/${ props.leader }` }>
                <div style={ styleProf }>
                    <img style={{ width: '100%', height: '100%' }} src={ `https://euleroj.io/profile-img/${ props.leader }.webp?size=40` } alt=""/>
                </div>
                <div style={ styleLeader }>{ props.leader }</div>
            </Link>
            <Link to={ `/nadmin/membership/group/edit?id=${ props.id }` }>
                <img src={ svgEdit } style={ styleEdit }/>
                <div style={ styleEditText }>수정</div>
            </Link>
        </animated.div>
    )
}

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let container = <LoadingLay/>;

        if(!this.onCall){
            if(this.state.list === undefined){
                this.onCall = true;
                axios.get("/json/admin/membership/group/list").then(({ data }) => {
                    if(data.groups) this.setState({ list: data.groups });
                })
            }
        }
        if(this.state.list){
            container = this.state.list.map((item, index) => {
                return (
                    <Group key={ index } theme={ this.props.theme }
                    name={ item.name } leader={ item.leader } id={ item._id }/>
                )
            })
        }

        return (
            <div className="ND">
                <Layout.Title icon={ svgBrain } theme={ this.props.theme }>모든 멤버십 그룹</Layout.Title>
                <Layout.Content theme={ this.props.theme }>멤버십 그룹들을 수정합니다.</Layout.Content>
                <BtnAdd theme={ this.props.theme }/>

                <div style={{ borderBottom: '2px solid rgba(120,120,120,0.5)', height: '30px' }}/>
                { container }
            </div>
        )
    }
}

export default Edit;