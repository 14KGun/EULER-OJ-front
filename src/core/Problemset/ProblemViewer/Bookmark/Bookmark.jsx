import { useState, useRef, useEffect } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useSpring, animated } from 'react-spring';
import ToolTip from '../../../Frame/Tooltip/Tooltip';

import axios from '../../../Tool/axios';
import svgChecked from './svg_checked.svg';
import svgUnchecked from './svg_unchecked.svg';

const Bookmark = (props) => {
    const target = useRef();
    const available = useRef(false)
    const [isChecked, setChecked] = useStateWithCallbackLazy(undefined);
    const [isHover, setHover] = useState(false);
    useEffect(() => {
        axios.get(`/json/problems/bookmark/check/${ props.id }`).then(({ data }) => {
            available.current = false;
            setChecked(data.check, () => {
                available.current = (data.available ? true : false);
            });
        })
    }, [props.id]);

    const onClick = () => {
        if(available.current){
            available.current = false;
            if(isChecked){
                axios.get(`/json/problems/bookmark/delete/${ props.id }`).then(({ data }) => {
                    if(data.done){
                        setChecked(false, () => {
                            available.current = true;
                        });
                    }
                })
            }
            else{
                axios.get(`/json/problems/bookmark/add/${ props.id }`).then(({ data }) => {
                    if(data.done){
                        setChecked(true, () => {
                            available.current = true;
                        });
                    }
                })
            }
        }
    }

    const style = useSpring({
        width: '40px', height: '40px', borderRadius: '20px',
        marginTop: '10px',
        position: 'relative',
        background: `rgba(140,140,140,${ isHover ? 0.1 : 0 })`,
        config: { duration: 100 }
    })
    const styleImg = {
        position: 'absolute',
        top: 'calc(50% - 12px)', left: 'calc(50% - 12px)',
        width: '24px', height: '24px'
    }

    return (
        <>
            <animated.div style={ style } className="BTNC"
            onClick={ () => onClick() } ref={ target }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ isChecked ? svgChecked : svgUnchecked }
                alt="" style={ styleImg }/>
            </animated.div>
            <ToolTip target={ target } show={ isHover && isChecked } position="left">
                북마크에서 이 문제 제거
            </ToolTip>
            <ToolTip target={ target } show={ isHover && !isChecked } position="left">
                북마크에 이 문제 추가
            </ToolTip>
        </>
    )
}

export default Bookmark;