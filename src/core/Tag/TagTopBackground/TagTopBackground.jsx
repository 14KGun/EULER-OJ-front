import React, { Component, useState, useEffect } from 'react';
import { useSpring, animated } from "@react-spring/web";
import svgBackground from './svg_background.svg';
import svgGround from './svg_ground.svg';
import svgPerson from './svg_person.svg';
import svgMountain from './svg_mountain.svg';
import svgSet1 from './svg_set1.svg';
import svgSet2 from './svg_set2.svg';
import svgShoot from './svg_shoot.svg';
import svgStar1 from './svg_star1.svg';
import svgStar2 from './svg_star2.svg';
import svgStar3 from './svg_star3.svg';
import svgStar4 from './svg_star4.svg';
import svgStar5 from './svg_star5.svg';
import svgStar6 from './svg_star6.svg';
import svgStar7 from './svg_star7.svg';
import svgStar8 from './svg_star8.svg';
import './TagTopBackground.css';

const Background = (props) => {
    const [Height, setHeight] = useState(322);
    const springHeight = useSpring({ height: Height }).height;
    const springLight = useSpring({
        loop: true, config: { duration: 1500 },
        from: { light: 0 },
        to: async (next) => {
            await next({ light: 1 })
            await next({ light: 0 })
        }
    }).light;
    const springShooting = useSpring({
        loop: true, config: { duration: 16000 },
        from: { x: -3 },
        to: { x: 2 }
    }).x;

    const groundHeight = (h) => {
        if(h>=200) return 65-(65/122)*(322-h);
        return 0;
    }
    const sinkPercent = (h) => {
        return (1/202)*(322-h);
    }
    const scrollevent = () => {
        const _Height = document.getElementsByClassName('TagTopBackground')[0].clientHeight;
        setHeight(_Height);
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollevent);
        return () => {
            document.removeEventListener('scroll', scrollevent);
        };
    });

    return (
        <div className="TagTopBackground" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <img src={ svgBackground } style={{ top: '0px', left: '0px', width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
            { props.stars.map((item, index) => <animated.img key={ index } src={ item.src } style={{ width: item.size, top: item.top, left: item.left, opacity: springLight }}/>) }

            <animated.img className="TagTopBackground-trans" src={ svgShoot } style={{ height: springHeight.to((h) => (1-sinkPercent(h))*50+'%'), top: springShooting.to((x) => x*20+'%'), left: springShooting.to((x) => (1-x)*10+'%') }} />

            <animated.img className="TagTopBackground-trans" src={ svgMountain } style={{ bottom: springHeight.to(groundHeight), right: '0px', height: '60%' }}/>
            
            <animated.img src={ svgSet2 } style={{ bottom: springHeight.to(groundHeight), left: '0px', height: springHeight.to((h) => (1-sinkPercent(h))*50+'%') }}/>
            <animated.img src={ svgSet1 } style={{ bottom: springHeight.to(groundHeight), right: '20%', height: springHeight.to((h) => (1-sinkPercent(h))*60+'%') }}/>
            
            <animated.div className="TagTopBackground-ground" style={{ bottom: '0px', left: '0px', width: '100%', height: springHeight.to(groundHeight) }}/>
            <animated.img src={ svgGround } style={{ bottom: '0px', left: '0px', width: '100%', height: springHeight.to((h) => groundHeight(h)-10), objectFit: 'cover' }}/>

            <animated.img className="TagTopBackground-trans" src={ svgPerson } style={{ bottom: springHeight.to((h) => -sinkPercent(h)*30), right: springHeight.to((h) => (1-sinkPercent(h))*15+'%'), height: springHeight.to((h) => (1.5-sinkPercent(h))*50+'%') }}/>
        </div>
    );
}
class TagTopBackground extends Component {
    constructor(props){
        super(props);

        const starSrc = [];
        for(var i=0; i<5; i++){
            starSrc.push(svgStar1); starSrc.push(svgStar2); starSrc.push(svgStar3); starSrc.push(svgStar4); starSrc.push(svgStar5); starSrc.push(svgStar6); starSrc.push(svgStar7); starSrc.push(svgStar8);
        }
        this.starList = starSrc.map((item, index) => {
            return { src: item, size: this.randomStarSize(), left: this.randomStarPosition(), top: this.randomStarPosition() }
        });
    }
    randomStarSize() {
        return Math.floor(Math.random() * (15 - 5)) + 5;
    }
    randomStarPosition() {
        return Math.floor(Math.random() * 100) + '%';
    }
    render() {
        return <Background stars={ this.starList }/>;
    }
}

export default TagTopBackground;