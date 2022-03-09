import { useState, useRef } from 'react';
import { animated, useSpring } from 'react-spring';

const HeaderTitle = (props) => {
    const getHeight = () => {
        const scrolledHeight = Math.max(document.documentElement.scrollTop, 0);
        return Math.max(200 - scrolledHeight, 130);
    }

    const heightR = useRef(getHeight());
    const [height, setHeight] = useState(heightR.current); // range = 200 ~ 130
    useState(() => {
        const scrollEvent = () => {
            const _height = getHeight();
            if(heightR.current !== _height){
                heightR.current = _height;
                setHeight(_height);
            }
        }
        document.addEventListener('scroll', scrollEvent);
        return () => {
            document.removeEventListener('scroll', scrollEvent);
        }
    }, []);

    const bgdN = (props.theme === 'light' ? 255 : 30);
    const heightS = useSpring({ height: height }).height;
    const style = {
        position: 'fixed', top: '0px', left: '0px', width: '100%',
        overflow: 'hidden', zIndex: 80,
        height: heightS.to(x => `${ x }px`),
        background: heightS.to(x => `rgba(${ bgdN },${ bgdN },${ bgdN },${ 1-(x-130)/70 })`), // 0 ~ 1
        borderBottom: heightS.to(x => `1px solid rgba(120,120,120,${ height === 130 ? 0.2 : 0 })`)
    }
    const lineHeight = heightS.to(x => `${ (x-130)/70*16+34 }px`); // 50 ~ 34
    const lineTop = heightS.to(x => `${ (x-130)/70*17+13 }px`); // 30 ~ 13
    const styleImg = {
        position: 'absolute', top: lineTop, left: '0px',
        width: lineHeight, height: lineHeight
    }
    const styleTitle = {
        position: 'absolute', top: lineTop,
        left: heightS.to(x => `${ (x-130)/70*23+42 }px`), // 65 ~ 42
        height: lineHeight, lineHeight: lineHeight,
        fontSize: heightS.to(x => `${ (x-130)/70*9+23 }px`), // 32 ~ 23,
        fontWeight: 400,
        color: props.theme === 'light' ? 'black' : '#ddd',
    }

    return (
        <>
            <animated.div style={ style }>
                <div className="FRAME_MAIN">
                    <div style={{ height: '70px' }}/>
                    <div style={{ position: 'relative' }}>
                        <animated.img src={ props.icon } style={ styleImg }/>
                        <animated.div style={ styleTitle }>{ props.title }</animated.div>
                    </div>
                </div>
            </animated.div>
            <div style={{ height: '200px' }}/>
        </>
    )
}

export default HeaderTitle