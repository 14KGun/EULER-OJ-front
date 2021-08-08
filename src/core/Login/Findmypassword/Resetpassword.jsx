import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const BtnSet = (props) => {
    const [isLeftHover, setLeftHover] = useState(false);
    const [isRightHover, setRightHover] = useState(false);
    const styleBtnLeft = {
        position: 'absolute', left: '10%', bottom: '25px', width: '35%', height: '34px',
        borderRadius: '17px', lineHeight: '34px', textAlign: 'center',
        fontSize: '16px', fontWeight: 300, background: 'rgb(235,235,235)'
    }
    const styleBtnRight = {
        position: 'absolute', right: '10%', bottom: '25px', width: '35%', height: '34px',
        borderRadius: '17px', lineHeight: '34px', textAlign: 'center',
        fontSize: '16px', fontWeight: 300, background: 'rgb(50,140,250)'
    }
    const leftBackground = useSpring({
        background: isLeftHover ? 'rgb(215,215,215)' : 'rgb(235,235,235)',
        config: { duration: 200 }
    });
    const rightBackground = ({
        background: isRightHover ? 'rgb(30,120,230)' : 'rgb(50,140,250)',
        config: { duration: 200 }
    });

    return (
        <>
            <Link to={ props.leftHref }>
                <animated.div onMouseEnter={ () => setLeftHover(true) } onMouseLeave={ () => setLeftHover(false) }
                style={{ ...styleBtnLeft, ...leftBackground }}>{ props.left }</animated.div>
            </Link>
            <Link to={ props.rightHref }>
                <animated.div onMouseEnter={ () => setRightHover(true) } onMouseLeave={ () => setRightHover(false) }
                style={{ ...styleBtnRight, ...rightBackground }}>{ props.right }</animated.div>
            </Link>
        </>
    )
}
class Findmypassword extends Component {
    constructor(props){
        super(props);
        this.styleLay = {
            position: 'absolute', top: '0px', right: '0px', width: '100%', height: '100%', maxWidth: '450px', overflow: 'hidden'
        }
        this.styleTitle = {
            paddingTop: '40px', textAlign: 'center', height: '50px', lineHeight: '50px',
            fontSize: '26px', fontWeight: '700', color: 'rgb(50,50,50)'
        }
        this.styleTxt1 = {
            marginLeft: '75px', marginRight: '75px', height: '20px', lineHeight: '20px',
            fontSize: '13px', fontWeight: '300', color: 'rgb(70,70,70)'
        }
        this.styleTxt2 = {
            marginLeft: '75px', marginRight: '75px', marginTop: '30px',
            fontSize: '16px'
        }
        this.styleInput = {
            width: '100%', height: '100%', fontSize: '17px', fontWeight: '300',
            border: 'none', outline: 'none'
        }
        this.styleInputContainer = {
            marginLeft: '75px', marginRight: '75px', height: '25px',
            borderBottom: '2px solid rgb(200,200,200)'
        }

        this.state = { inputId: '', inputEmail: '' }
    }
    handleInputId(event){
        this.setState({ inputId: event.target.value });
    }
    handleInputEmail(event){
        this.setState({ inputEmail: event.target.value });
    }
    render() {
        let container = '';

        container = (
            <>
                <div style={ this.styleTitle }>비밀번호 바꾸기</div>
                <div style={ this.styleTxt2 }>비밀번호를 다시 설정합니다. 새롭게 사용할 비밀번호를 입력해주세요.</div>

                <div style={{ ...this.styleTxt1, marginTop: '30px' }}>PASSWORD</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-id" type="txt" style={ this.styleInput }
                    value={ this.state.inputId } onChange={ (e) => this.handleInputId(e) }/>
                </div>

                <div style={{ ...this.styleTxt1, marginTop: '30px' }}>Confirm PASSWORD</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-id" type="txt" style={ this.styleInput }
                    value={ this.state.inputId } onChange={ (e) => this.handleInputId(e) }/>
                </div>
            </>
        )

        container = (
            <>
                <div style={ this.styleTitle }>비밀번호 바꾸기</div>
                <div style={ this.styleTxt2 }>비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.</div>
            </>
        )

        return (
            <div style={ this.styleLay } className="ND">
                <Helmet><title>내 비밀번호 바꾸기 : 오일러OJ</title></Helmet>
                { container }
            </div>
        );
    }
}

export default Findmypassword;