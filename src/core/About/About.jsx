import { Component } from 'react';
import { Helmet } from "react-helmet";
import FrameSplit from '../Frame/FrameSplit/FrameSplit';
import OjManual from './Oj/Manual';
import OjStat from './Oj/Stat';
import OjUpdate from './Oj/Update';
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
                title: 'OJ',
                list: [
                    //{ name: '간단 OJ 사용법', icon: svgInfo, href: '/about/oj/manual' },
                    { name: '통계', icon: svgChart, href: '/about/oj/stat' },
                    { name: '업데이트 기록', icon: svgUpdate, href: '/about/oj/update' },
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
        let title = '오일러OJ';
        
        if(this.props.page === 'oj/manual'){
            container = <OjManual theme={ this.props.theme }/>
            title = '간단 OJ 사용법 : 오일러OJ';
        }
        else if(this.props.page === 'oj/stat'){
            container = <OjStat theme={ this.props.theme }/>
            title = '통계 : 오일러OJ';
        }
        else if(this.props.page === 'oj/update'){
            container = <OjUpdate theme={ this.props.theme }/>
            title = '업데이트 기록 : 오일러OJ';
        }
        else if(this.props.page === 'policy/privacy'){
            container = <Privacy theme={ this.props.theme }/>
            title = '개인정보 처리방침 : 오일러OJ';
        }

        return (
            <FrameSplit navigator={ this.navigator } theme={ this.props.theme }>
                <Helmet><title>{ title }</title></Helmet>
                { container }
            </FrameSplit>
        )
    }
}

export default About;