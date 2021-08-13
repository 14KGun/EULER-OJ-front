import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Layout from './Layout';
import svgTheme from './svg_theme.svg';
import svgSelect from './svg_select.svg';
import imgThemeLight from './img_theme_light.png';
import imgThemeDark from './img_theme_dark.png';

const ThemeBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', position: 'relative', marginRight: '10px'
    }
    const styleImg = {
        width: '160px', height: '120px', borderRadius: '15px',
    }
    const styleTxt = {
        marginLeft: '8px', fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleSelect = {
        position: 'absolute', top: '100px', right: '12px', width: '25px'
    }
    const borderColor = (props.theme==='light' ? 220 : 50);
    const border = useSpring({
        border: `8px solid rgba(${ borderColor },${ borderColor },${ borderColor },${ isHover ? 1 : 0 })`
    })
    const opacity = useSpring({
        opacity: props.selected ? 1 : 0
    })

    return (
        <span style={{ ...style }} className="BTNC" onClick={ props.onClick }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <animated.img src={ props.img } alt="" style={{ ...styleImg, ...border }}/>
            <div style={ styleTxt }>{ props.txt }</div>
            <animated.img src={ svgSelect } style={{ ...styleSelect, ...opacity }}/>
        </span>
    )
}
class Theme extends Component {
    
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgTheme } theme={ this.props.theme }>사이트 테마</Layout.Title>
                <Layout.Content theme={ this.props.theme }>사이트 테마를 변경할 수 있습니다. 변경사항은 브라우저 쿠키에 저장됩니다.</Layout.Content>
                <div style={{ marginTop: '15px' }}>
                    <ThemeBtn img={ imgThemeLight } txt="라이트 모드" selected={ this.props.theme === 'light' }
                    onClick={ () => this.props.setTheme('light') } theme={ this.props.theme }/>
                    <ThemeBtn img={ imgThemeDark } txt="다크 모드" selected={ this.props.theme === 'dark' }
                    onClick={ () => this.props.setTheme('dark') } theme={ this.props.theme }/>
                </div>
            </div>
        )
    }
}

export default Theme