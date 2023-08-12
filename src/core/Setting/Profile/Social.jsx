import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { useHistory } from 'react-router-dom';
import Layout from './Layout';
import svgSocial from './svg_social.svg';
import imgGoogle from './img_google.png';
import imgNaver from './img_naver.png';
import imgKakao from './img_kakao.png';

const SocialBox = (props) => {
    const style = {
        display: 'inline-block', position: 'relative', marginRight: '10px',
        width: '230px', height: '150px', borderRadius: '15px'
    }
    const styleImg = {
        position: 'absolute', width: '50px', height: '50px', top: '20px', left: '20px',
        border: '1px solid rgb(200,200,200)', borderRadius: '51px'
    }
    const styleTxt = {
        position: 'absolute', height: '50px', lineHeight: '50px', top: '20px', left: '90px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleLine = {
        position: 'absolute', top: '90px', left: '20px', right: '20px',
        borderBottom: `1px solid ${ props.theme==='light' ? 'rgb(200,200,200)' : 'rgb(50,50,50)' }`
    }
    const styleSwitch = {
        position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '20px'
    }
    const background = useSpring({
        background: props.theme==='light' ? 'white' : 'rgb(20,20,20)',
        border: `1px solid ${ props.theme==='light' ? 'rgb(200,200,200)' : 'rgb(35,35,35)' }`
    })

    const [value, valueHandler] = useState(props.initValue);
    const history = useHistory();
    const onChange = (x) => {
        valueHandler('center');
        if(x === 'on') history.push(`/login/auth/${ props.id }`);
        if(x === 'off') history.push(`/login/unlink/step1/${ props.id }`);
    }

    return (
        <animated.span style={{ ...style, ...background }}>
            <img src={ props.img } alt="" style={ styleImg }/>
            <div style={ styleTxt }>{ props.txt }</div>
            <div style={ styleLine }/>
            <div style={ styleSwitch }>
                <Layout.Switch theme={ props.theme } value={ value } onChange={ (x) => onChange(x) }/>
            </div>
        </animated.span>
    )
}
class Social extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgSocial } theme={ this.props.theme }>소셜 계정 연동</Layout.Title>
                <Layout.Content theme={ this.props.theme }>소셜 계정을 연동하여 소셜 로그인을 사용할 수 있습니다.<br/>버튼을 눌러 계정 연동을 활성화 또는 비활성화 할 수 있습니다.</Layout.Content>
                <div style={{ paddingTop: '10px' }}>
                    <SocialBox img={ imgGoogle } txt="구글" initValue={ this.props.data.social.google ? 'on' : 'off' } theme={ this.props.theme } id="google"/>
                    <SocialBox img={ imgNaver } txt="네이버" initValue={ this.props.data.social.naver ? 'on' : 'off' } theme={ this.props.theme } id="naver"/>
                    <SocialBox img={ imgKakao } txt="카카오" initValue={ this.props.data.social.kakao ? 'on' : 'off' } theme={ this.props.theme } id="kakao"/>
                </div>
            </div>
        )
    }
}

export default Social