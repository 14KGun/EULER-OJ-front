import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Loading from '../../Frame/Loading/Loading';
import axios from '../../Tool/axios';
import possibleInput from '../../Tool/possibleInput';

const BtnSet = (props) => {
    const [isHover, setHover] = useState(false);
    const styleBtn = {
        position: 'absolute', left: '100px', right: '100px', bottom: '25px', height: '34px',
        borderRadius: '17px', lineHeight: '34px', textAlign: 'center',
        fontSize: '16px', fontWeight: 300, background: 'rgb(235,235,235)'
    }
    const background = useSpring({
        background: isHover ? 'rgb(30,120,230)' : 'rgb(50,140,250)',
        config: { duration: 150 }
    });

    if(props.href){
        return (
            <Link to={ props.href }>
                <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
                style={{ ...styleBtn, ...background }}>{ props.text }</animated.div>
            </Link>
        )
    }
    return (
        <>
            <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...styleBtn, ...background }} className="BTNC" onClick={ props.onClick }>{ props.text }</animated.div>
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
            border: 'none', outline: 'none', letterSpacing: '3px'
        }
        this.styleInputContainer = {
            marginLeft: '75px', marginRight: '75px', height: '25px',
            borderBottom: '2px solid rgb(200,200,200)'
        }

        this.state = { inputPw1: '', inputPw2: '', page: 'loading', msg: '' };
        this.onCall = false;
    }
    handleInputPw1(event){
        this.setState({ inputPw1: event.target.value, msg: '' });
    }
    handleInputPw2(event){
        this.setState({ inputPw2: event.target.value, msg: '' });
    }
    onClick(){
        if(this.state.inputPw1 === '') this.setState({ msg: '입력란이 비어있습니다.' });
        else if(this.state.inputPw2 === '') this.setState({ msg: '입력란이 비어있습니다.' });
        else if(this.state.inputPw1 !== this.state.inputPw2) this.setState({ msg: '비밀번호가 서로 일치하지 않습니다.' });
        else if(!possibleInput.password(this.state.inputPw1)) this.setState({ msg: '비밀번호는 6자 이상 20자 이하여야 합니다.' });
        else if(this.onCall) this.setState({ msg: '기존의 요청을 처리 중 입니다.' });
        else{
            this.onCall = true;
            axios.post('/json/login/findmypassword/resetpassword', { id: this.props.id, key: this.props.SecurityKey, pw: this.state.inputPw1 }).then(result => {
                this.onCall = false;
                if(result.data.result === 'sucess') this.setState({ page: 'done' });
                else this.setState({ page: 'error' });
            })
        }
    }
    render() {
        let container = '';

        if(this.state.page === 'loading'){
            container = (
                <>
                    <div style={{ paddingTop: '160px' }}>
                        <Loading/>
                    </div>
                    <div style={{ paddingTop: '160px', textAlign: 'center', fontSize: '16px' }}>Key 확인중...</div>
                </>
            )
            if(!this.onCall){
                this.onCall = true;
                axios.post('/json/login/findmypassword/matchtest', { id: this.props.id, key: this.props.SecurityKey }).then(result => {
                    this.onCall = false;
                    if(result.data.result === 'true') this.setState({ page: 'resetPassword' });
                    else this.setState({ page: 'invalid' });
                })
            }
        }
        else if(this.state.page === 'invalid'){
            container = (
                <>
                    <div style={ this.styleTitle }>유효하지 않은 접근</div>
                    <div style={ this.styleTxt2 }>해당 링크의 유효기간이 지났을 수 있습니다.</div>
                </>
            )
        }
        else if(this.state.page === 'resetPassword'){
            container = (
                <>
                    <div style={ this.styleTitle }>비밀번호 바꾸기</div>
                    <div style={ this.styleTxt2 }>비밀번호를 다시 설정합니다. 새롭게 사용할 비밀번호를 입력해주세요.</div>
    
                    <div style={{ ...this.styleTxt1, marginTop: '30px' }}>PASSWORD</div>
                    <div style={ this.styleInputContainer }>
                        <input id="input-id" type="password" style={ this.styleInput }
                        value={ this.state.inputPw1 } onChange={ (e) => this.handleInputPw1(e) }/>
                    </div>
    
                    <div style={{ ...this.styleTxt1, marginTop: '30px' }}>Confirm PASSWORD</div>
                    <div style={ this.styleInputContainer }>
                        <input id="input-id" type="password" style={ this.styleInput }
                        value={ this.state.inputPw2 } onChange={ (e) => this.handleInputPw2(e) }/>
                    </div>
                    <div style={{ ...this.styleTxt2, color: 'red' }}>{ this.state.msg }</div>
                    <BtnSet text="다음" onClick={ () => this.onClick() }/>
                </>
            )
        }
        else if(this.state.page === 'invalid'){
            container = (
                <>
                    <div style={ this.styleTitle }>서버 오류</div>
                    <div style={ this.styleTxt2 }>서버 오류로 비밀번호 변경에 실패하였습니다.</div>
                </>
            )
        }
        else if(this.state.page === 'done'){
            container = (
                <>
                    <div style={ this.styleTitle }>비밀번호 바꾸기</div>
                    <div style={ this.styleTxt2 }>비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.</div>
                    <BtnSet text="로그인 하기" href="/login"/>
                </>
            )
        }

        return (
            <div style={ this.styleLay } className="ND">
                <Helmet><title>내 비밀번호 바꾸기 : 오일러OJ</title></Helmet>
                { container }
            </div>
        );
    }
}

export default Findmypassword;