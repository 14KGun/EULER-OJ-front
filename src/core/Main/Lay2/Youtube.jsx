import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import Frame from './Lay2Frame';
import Loading from '../../Frame/Loading/Loading';

const YoutubeItem = (props) => {
    const [isHover, setHover] = useState(false);

    const top = props.position[0]*205;
    const left = props.position[1]*173;
    const itemStyle = useSpring({
        position: 'absolute', overflow: 'hidden',
        textAlign: 'left', textAlignLast: 'left',
        background: 'rgb(240,240,240)', borderRadius: '15px',
        top: isHover ? `${top-3}px` : `${top}px`,
        left: isHover ? `${left-3}px` : `${left}px`,
        width: isHover ? `166px` : `160px`,
        height: isHover ? `196px` : `190px`,
        boxShadow: isHover ? '0 0 5px 5px rgba(0,0,0,0.1)' : '0 0 5px 5px rgba(0,0,0,0)',
        border: isHover ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0)'
    });
    const imgStyle = useSpring({
        width: '100%',
        height: `${90 + (isHover ? 6 : 0)}px`,
        objectFit: 'cover'
    });
    const titleStyle = useSpring({
        position: 'absolute', overflow: 'hidden', textOverflow: 'ellipsis', 
        top: `${100 + (isHover ? 6 : 0)}px`, bottom: '30px', left: '15px', right: '15px',
        fontSize: '14px', fontWeight: '400', color: 'black',
    });
    const timeStyle = {
        position: 'absolute',
        bottom: '10px', right: '15px',
        textAlign: 'right', textAlignLast: 'right',
        fontSize: '13px', fontWeight: '300', color: 'gray'
    };

    return (
        <a href={ `https://youtu.be/${ props.id }` } target="_blank" rel="noreferrer">
            <animated.div style={ itemStyle }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <animated.img style={ imgStyle } src={ props.imgSrc }/>
                <animated.div style={ titleStyle }>{ props.title }</animated.div>
                <div style={ timeStyle }>{ props.time }</div>
            </animated.div>
        </a>
    );
}
class Youtube extends Component {
    state = { youtubeList: undefined }
    constructor(props){
        super(props);

        axios.get('/json/main/youtubelist').then((youtubeList) => {
            this.setState({ youtubeList: youtubeList.data });
        });
    }
    render() {
        if(this.state.youtubeList === undefined){
            return (
                <Frame title="오일러TV">
                    <div style={{ position: 'relative', paddingTop: '100px' }}>
                        <Loading/>
                    </div>
                </Frame>
            );
        }
        else{
            return (
                <Frame title="오일러TV">
                    <div style={{ position: 'relative' }}>
                        { this.state.youtubeList.map((item, index) => {
                            const y = parseInt(index/2);
                            const x = index - y*2;
                            return <YoutubeItem key={ index } id={ item.yotubeId } title={ item.title } imgSrc={ item.img.medium.url } time="" position={[y,x]}/>;
                        }) }
                    </div>
                </Frame>
            );
        }
    }
}

export default Youtube;