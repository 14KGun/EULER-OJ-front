import { useSpring, animated } from 'react-spring';
import Header from './Header/Header';

const Frame = (props) => {
    const background = useSpring({
        background: props.theme === 'dark' ? 'rgb(30,31,33)' : 'rgb(250,251,252)',
        config: { duration: 250 }
    }).background;

    return (
        <animated.div style={{ width: '100%', height: '100%', background: background }}>
            { props.children }
            <Header theme={ props.theme } setTheme={ props.setTheme } txtColor={ props.headerTxtColor }/>
        </animated.div>
    );

}

Frame.defaultProps = { theme: 'light', headerTxtColor: 'white' }

export default Frame;