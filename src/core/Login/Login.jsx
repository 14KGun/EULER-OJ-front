import { Component } from 'react';
import { useSpring, animated } from 'react-spring';

const LayLeft = (props) => {
    const opacity = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 300, config: { duration: 400 }
    }).opacity;

    return (
        <animated.div style={{ width: '100%', height: '100%', background: 'rgb(50,140,250)', opacity: opacity }}>

        </animated.div>
    )
}
const BtnLogin = (props) => {
    const styleBtn = {
        width: '60%', height: '40px', borderRadius: '20px', margin: 'auto',
        textAlign: 'center', lineHeight: '40px',
        fontSize: '15px', fontWeight: '300', color: 'white',
        background: 'rgb(50,140,250)'
    }
    return (
        <div style={{ ...styleBtn }}>Go</div>
    )
}
const BtnSocial = (props) => {
    const styleBtn = {
        width: '60%', height: '40px', borderRadius: '20px', margin: 'auto',
        textAlign: 'center', lineHeight: '40px',
        fontSize: '15px', fontWeight: '300', color: 'white',
        background: 'rgb(200,200,200)'
    }
    return (
        <div style={{ ...styleBtn }}>소셜 로그인</div>
    )
}
const BtnFind = (props) => {
    const style = {
        fontSize: '14px', float: 'left'
    }
    return (
        <div style={{ ...style }}>비밀번호 찾기</div>
    )
}
const BtnSignup = (props) => {
    const style = {
        fontSize: '14px', float: 'right'
    }
    return (
        <div style={{ ...style }}>회원가입</div>
    )
}
class Login extends Component {
    constructor(props){
        super(props);
        this.styleLayLeft = {
            position: 'absolute', top: '0px', right: '450px', width: '450px', height: '100%'
        }
        this.styleLayRight = {
            position: 'absolute', top: '0px', right: '0px', width: '100%', height: '100%', maxWidth: '450px'
        }
        this.styleTitle = {
            paddingTop: '40px', textAlign: 'center', height: '50px', lineHeight: '50px',
            fontSize: '26px', fontWeight: '700', color: 'rgb(50,50,50)'
        }
        this.styleTxt1 = {
            marginLeft: '75px', marginRight: '75px', height: '20px', lineHeight: '20px',
            fontSize: '13px', fontWeight: '300', color: 'rgb(70,70,70)'
        }
        this.styleInput = {
            width: '100%', height: '100%', fontSize: '17px', fontWeight: '300',
            border: 'none', outline: 'none'
        }
        this.styleInputContainer = {
            marginLeft: '75px', marginRight: '75px', height: '25px',
            borderBottom: '2px solid rgb(200,200,200)'
        }
        this.styleTxt2Container = {
            marginLeft: '75px', marginRight: '75px', position: 'relative'
        }
    }
    render() {
        return (
            <div className="ND">
                <div style={{  ...this.styleLayRight }}>
                    <div style={ this.styleTitle }>로그인</div>
                    <div style={{ ...this.styleTxt1, marginTop: '30px' }}>ID</div>
                    <div style={ this.styleInputContainer }>
                        <input id="input-id" type="txt" style={ this.styleInput }/>
                    </div>
                    <div style={{ ...this.styleTxt1, marginTop: '20px' }}>PASSWORD</div>
                    <div style={ this.styleInputContainer }>
                        <input id="input-pw" type="password" style={{ ...this.styleInput, letterSpacing: '3px' }}/>
                    </div>
                    <div style={{ height: '60px' }}/>
                    <BtnLogin/>
                    <div style={{ height: '15px' }}/>
                    <BtnSocial/>
                    <div style={{ height: '35px' }}/>
                    <div style={ this.styleTxt2Container }>
                        <BtnFind/><BtnSignup/>
                    </div>
                </div>
                <div style={ this.styleLayLeft }>
                    <LayLeft/>
                </div>
            </div>
        );
    }
}

export default Login;