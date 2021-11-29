import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import Frame from './Lay2Frame';
import Loading from '../../Frame/Loading/Loading';

import svgBlogging from './svg_blogging.svg';

const LoadingLay = () => {
    return (
        <div style={{ position: 'relative', paddingTop: '100px' }}>
            <Loading/>
        </div>
    )
}
const Item = (props) => {
    const [isHover, setHover] = useState(false);

    const style = useSpring({
        height: '54px', position: 'relative', overflow: 'hidden',
        borderBottom: `1px solid ${ props.theme === 'light' ? 'rgb(220,220,220)' : 'rgb(60,60,60)' }`,
        background: isHover ? 'rgba(150,150,150,0.1)' : 'rgba(150,150,150,0)',
        config: { duration: 100 }
    });
    const styleImg = {
        position: 'absolute', left: '7px', top: '14px',
        width: '26px', height: '26px'
    }
    const styleTxt = {
        position: 'absolute', top: '3px', left: '50px', right: '10px', overflow: 'hidden',
        height: '44px', lineHeight: '22px', textOverflow: 'ellipsis', /*whiteSpace: 'nowrap',*/
        fontSize: '16px', fotnWeight: 300, color: (props.theme==='light' ? 'black' : 'white')
    }

    return (
        <a href={ props.url } target="_blank" rel="noreferrer">
            <animated.div style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ svgBlogging } alt="blogging" style={ styleImg }/>
                <div style={ styleTxt }>{ props.name }</div>
            </animated.div>
        </a>
    )
}
class Blogging extends Component {
    state = { list: undefined }
    constructor(props){
        super(props);

        this.state = {};
        axios.get('/json/main/blogginglist').then(({ data }) => {
            this.setState({ list: data.list });
        });
    }
    render() {
        let container = <LoadingLay/>;

        if(this.state.list){
            container = this.state.list.map((item, index) => {
                return (
                    <Item key={ index } theme={ this.props.theme } { ...item }/>
                )
            })
        }

        return (
            <Frame title="새로운 블로깅" theme={ this.props.theme }>
                { container }
            </Frame>
        );
    }
}

export default Blogging;