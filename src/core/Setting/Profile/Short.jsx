import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import Layout from './Layout';
import axios from '../../Tool/axios';
import svgShort from './svg_short.svg';

let onCall = false;

const SwitchBox = (props) => {
    const [value, setValue] = useState(props.value === 'true' ? 'on' : 'off');
    const style = {
        position: 'relative', borderRadius: '15px'
    }
    const styleTxt = {
        marginLeft: '20px', marginRight: '70px', paddingTop: '10px', paddingBottom: '10px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const background = useSpring({
        background: props.theme === 'light' ? 'white' : 'rgb(20,20,20)',
        border: `1px solid ${ props.theme === 'light' ? 'rgb(200,200,200)' : 'rgb(35,35,35)' }`
    });

    const onClick = (x) => {
        if(!onCall){
            onCall = true;
            setValue('undefined');
            axios.post('/json/setting/profile/short/quickeditor', { content: (x === 'on' ? 'true' : 'false') }).then(result => {
                onCall = false;
                if(result.err){ setValue('null'); }
                else if(result.data.content === 'true'){ setValue('on'); props.update('quickeditor', 'true'); }
                else if(result.data.content === 'false'){ setValue('off'); props.update('quickeditor', 'false'); }
            })
        }
    }

    return (
        <animated.div style={{ ...style, ...background }}>
            <div style={ styleTxt }>{ props.children }</div>
            <div style={{ position: 'absolute', bottom: '11px', right: '20px' }}>
                <Layout.Switch theme={ props.theme } value={ value } onChange={ (x) => onClick(x) }/>
            </div>
        </animated.div>
    )
}
class Short extends Component {
    update(key, value){
        const tmp = this.props.data.shortcut;
        tmp[key] = value;
        this.props.stateHandler('shortcut', tmp);
    }
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgShort } theme={ this.props.theme }>문제 클릭시 에디터로 바로 이동</Layout.Title>
                <SwitchBox theme={ this.props.theme } value={ this.props.data.shortcut.quickeditor } update={ (x,y) => this.update(x,y) }>문제 클릭시 에디터로 바로 이동합니다</SwitchBox>
            </div>
        )
    }
}

export default Short