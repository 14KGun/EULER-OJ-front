import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../../Tool/axios';

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
        config: { duration: 150 }
    });
    const rightBackground = useSpring({
        background: isRightHover ? 'rgb(30,120,230)' : 'rgb(50,140,250)',
        config: { duration: 150 }
    });

    return (
        <>
            <Link to={ props.leftHref }>
                <animated.div onMouseEnter={ () => setLeftHover(true) } onMouseLeave={ () => setLeftHover(false) }
                style={{ ...styleBtnLeft, ...leftBackground }}>{ props.left }</animated.div>
            </Link>
            <animated.div onMouseEnter={ () => setRightHover(true) } onMouseLeave={ () => setRightHover(false) }
            style={{ ...styleBtnRight, ...rightBackground }} className="BTNC" onClick={ props.rightOnClick }>{ props.right }</animated.div>
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

        this.state = { inputId: '', inputEmail: '', msg: '', done: false }
        this.onCall = false;
    }
    handleInputId(event){
        if(this.onCall) return;
        this.setState({ inputId: event.target.value, msg: '' });
    }
    handleInputEmail(event){
        if(this.onCall) return;
        this.setState({ inputEmail: event.target.value, msg: '' });
    }
    onClick(){
        if(this.state.inputId === '') this.setState({ msg: '???????????? ??????????????????.' });
        else if(this.state.inputEmail === '') this.setState({ msg: '???????????? ??????????????????.' });
        else if(this.onCall) this.setState({ msg: '????????? ????????? ?????? ??? ?????????.' });
        else{
            this.onCall = true;
            axios.post('/json/login/findmypassword', { id: this.state.inputId, email: this.state.inputEmail }).then(result => {
                this.onCall = false;
                if(result.data.err) this.setState({ msg: '????????? ???????????? ???????????? ????????? ?????? ???????????? ?????? ??? ????????????.' });
                else this.setState({ done: true });
            })
        }
    }
    render() {
        let container = (
            <>
                <div style={ this.styleTitle }>??? ???????????? ??????</div>
                
                <div style={ this.styleTxt2 }>??????????????? ????????? ?????? ???????????? ???????????? ??????????????????.</div>

                <div style={{ ...this.styleTxt1, marginTop: '30px' }}>ID</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-id" type="txt" style={ this.styleInput }
                    value={ this.state.inputId } onChange={ (e) => this.handleInputId(e) }/>
                </div>
                <div style={{ ...this.styleTxt1, marginTop: '30px' }}>EMAIL</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-email" type="txt" style={ this.styleInput }
                    value={ this.state.inputEmail } onChange={ (e) => this.handleInputEmail(e) }/>
                </div>

                <div style={{ ...this.styleTxt2, color: 'red' }}>{ this.state.msg }</div>
                <BtnSet left="??????" leftHref="/login" right="??????" rightOnClick={ () => this.onClick() }/>
            </>
        );

        if(this.state.done){
            container = (
                <>
                    <div style={ this.styleTitle }>???????????? ??????</div>
                    <div style={ this.styleTxt2 }>{ this.state.inputEmail }?????? ???????????? ?????????????????????. ????????? ?????? ??? ??????????????? ????????? ??? ??? ????????????. ???????????? ??????????????????.</div>
                </>
            );
        }

        return (
            <div style={ this.styleLay } className="ND">
                <Helmet><title>??? ???????????? ?????? : ?????????OJ</title></Helmet>
                { container }
            </div>
        );
    }
}

export default Findmypassword;