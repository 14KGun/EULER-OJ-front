import { useSpring, animated } from 'react-spring';
import BtnItem from './HeaderPopupBtnItem';
import svgProf from './svg_prof.svg';
import svgBookmark from './svg_bookmark.svg';
import svgSetting from './svg_setting.svg';
import svgLogout from './svg_logout.svg';

const HeaderRight = (props) => {
    const style = {
        position: 'fixed', top: '80px', right: '10px', width: '300px', zIndex: 91,
        borderRadius: '10px', overflow: 'hidden',
        background: (props.theme==='light' ? 'white' : 'rgb(35,37,39)')
    };
    const springStyle = useSpring({
        height: props.show ? '450px' : '0px'
    });
    const lay1Style = {
        height: '180px', paddingTop: '30px',
        background: 'rgb(0,134,191)'
    }
    const imgBorderStyle = {
        height: '100px', width: '100px', borderRadius: '50px',
        margin: 'auto', overflow: 'hidden',
        border: '2px solid rgb(230,230,230)',
        background: 'white'
    }
    const Lay1IdStyle = {
        marginTop: '10px', textAlign: 'center',
        width: '100%', overflow: 'hidden',
        fontSize: '20px', fontWeight: '500',
        color: (props.theme==='light' ? 'white' : 'black')
    };

    if(props.loginInfo === undefined) return <></>;
    else{
        return (
            <animated.div className="ND" style={{ ...style, ...springStyle }}>
                <div style={ lay1Style }>
                    <div style={ imgBorderStyle }>
                        <img style={{ width: '100%', height: '100%' }}
                        src={ `https://euleroj.io/profile-img/${ props.loginInfo.id }.webp?size=100` }
                        alt={ props.loginInfo.id }/>
                    </div>
                    <div style={ Lay1IdStyle }>{ props.loginInfo.id }</div>
                </div>
                <BtnItem icon={ svgProf } name="내 프로필" url={ `/profile/${ props.loginInfo.id }` } close={ props.close } padding={ 3 } theme={ props.theme }/>
                <BtnItem icon={ svgBookmark } name="내 북마크" url="/tags/bookmark" close={ props.close } padding={ 4 } theme={ props.theme }/>
                <BtnItem icon={ svgSetting } name="계정 설정" url="/setting/profile" close={ props.close } padding={ 3 } theme={ props.theme }/>
                <BtnItem icon={ svgLogout } name="로그아웃" url="/logout" close={ props.close } padding={ 4 } theme={ props.theme }/>
            </animated.div>
        );
    }
}

export default HeaderRight;