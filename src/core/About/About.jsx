import { Component } from 'react';
import { Helmet } from "react-helmet";
import FrameSplit from '../Frame/FrameSplit/FrameSplit';
import Privacy from './Policy/Privacy';

import svgInfo from './svg_info.svg';
import svgChart from './svg_chart.svg';
import svgUpdate from './svg_update.svg';
import svgGavel from './svg_gavel.svg';

class About extends Component {
    constructor(props){
        super(props);

        this.navigator = [
            {
                title: '통계',
                list: [
                    { name: '설명서', icon: svgInfo, href: '/about/policy/privacy' },
                    { name: '통계', icon: svgChart, href: '/about/policy/privacy' },
                    { name: '업데이트 기록', icon: svgUpdate, href: '/about/policy/privacy' },
                ]
            },
            {
                title: '이용약관',
                list: [
                    { name: '개인정보 처리방침', icon: svgGavel, href: '/about/policy/privacy' },
                ]
            }
        ]
    }
    render(){
        let container = <div/>;
        
        if(this.props.page === 'me'){
            container = <div/>
        }
        container = <Privacy theme={ this.props.theme }/>

        return (
            <FrameSplit navigator={ this.navigator } theme={ this.props.theme }>
                <Helmet><title>관리자 : 오일러OJ</title></Helmet>
                { container }
            </FrameSplit>
        )
    }
}

export default About;