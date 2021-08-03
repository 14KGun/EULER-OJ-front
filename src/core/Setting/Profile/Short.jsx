import { Component } from 'react';
import { useSpring, animated } from 'react-spring';
import Layout from './Layout';
import svgShort from './svg_short.svg';

const SwitchBox = (props) => {
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
    return (
        <animated.div style={{ ...style, ...background }}>
            <div style={ styleTxt }>{ props.children }</div>
            <div style={{ position: 'absolute', bottom: '11px', right: '20px' }}>
                <Layout.Switch theme={ props.theme } value={ 'off' } onChange={ (x) => {} }/>
            </div>
        </animated.div>
    )
}
class Short extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgShort } theme={ this.props.theme }>문제 클릭시 에디터로 바로 이동</Layout.Title>
                <SwitchBox theme={ this.props.theme }>문제 클릭시 에디터로 바로 이동합니다</SwitchBox>
            </div>
        )
    }
}

export default Short