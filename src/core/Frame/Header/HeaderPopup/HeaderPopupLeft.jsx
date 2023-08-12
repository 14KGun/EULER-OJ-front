import { useSpring, animated } from "@react-spring/web";
import BtnItem from './HeaderPopupBtnItem';
import imgEuler from '../../../Main/img_card1.png';
import imgYoutube from '../../../Main/img_card2.png';
import imgBooks from '../../../Main/img_card3.png';
import imgBlog from '../../../Main/img_card4.png';

const HeaderLeft = (props) => {
    const style = {
        position: 'fixed', top: '80px', left: '10px', width: '300px', zIndex: 89,
        borderRadius: '10px', overflow: 'hidden',
        background: (props.theme==='light' ? 'white' : 'rgb(35,37,39)')
    };
    const springStyle = useSpring({
        height: props.show ? '350px' : '0px'
    });
    const topStyle = {
        width: '100%', height: '50px', background: 'rgb(231,22,26)', lineHeight: '50px',
        fontSize: '16px', fontWeight: '500', color: 'white', paddingLeft: '20px'
    };

    return (
        <animated.div className="ND" style={{ ...style, ...springStyle }}>
            <div style={ topStyle }>오일러 바로가기</div>
            <BtnItem icon={ imgEuler } name="메인" url="/" close={ props.close } theme={ props.theme }/>
            <BtnItem icon={ imgEuler } name="오일러OJ" url="/problemset" close={ props.close } theme={ props.theme }/>
            <BtnItem icon={ imgYoutube } name="오일러TV" url="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ" close={ props.close } newtab theme={ props.theme }/>
            <BtnItem icon={ imgBooks } name="오일러BOOKS" url="https://smartstore.naver.com/eulerbooks" close={ props.close } newtab theme={ props.theme }/>
            <BtnItem icon={ imgBlog } name="오일러BLOG" url="https://blog.naver.com/euleredu" close={ props.close } newtab theme={ props.theme }/>
        </animated.div>
    );
}

export default HeaderLeft;