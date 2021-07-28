import { Component } from 'react';
import { Helmet } from "react-helmet";
import smoothScroll from '../Tool/smoothScroll';
import FrameSplit from '../Frame/FrameSplit/FrameSplit';
import Gitpull from './Problem/Gitpull';
import svgAdd from './svg_add.svg';
import svgClouddown from './svg_clouddown.svg';
import svgList from './svg_list.svg';

class Admin extends Component {
    constructor(props){
        super(props);

        this.navigator = [
            {
                title: '문제',
                list: [
                    { name: '새로운 문제 추가', icon: svgAdd, href: '/nadmin/problem/add' },
                    { name: '모든 문제', icon: svgList, href: '/nadmin/problem/list' },
                    { name: 'Git Pull', icon: svgClouddown, href: '/nadmin/problem/list' },
                ]
            },
            {
                title: '대회',
                list: [
                    { name: '새로운 대회 만들기', icon: svgAdd, href: '/nadmin/problem/add' },
                    { name: '내 대회 관리', icon: svgList, href: '/nadmin/problem/list' },
                ]
            }
        ]
    }
    render(){
        let container = <div/>;
        
        if(this.props.page === 'me'){
            container = <div/>
        }
        container = <Gitpull theme={ this.props.theme }/>

        return (
            <FrameSplit navigator={ this.navigator } theme={ this.props.theme }>
                <Helmet><title>관리자 : 오일러OJ</title></Helmet>
                { container }
            </FrameSplit>
        )
    }
}

export default Admin;