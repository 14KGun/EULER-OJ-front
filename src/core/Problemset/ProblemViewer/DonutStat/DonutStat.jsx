import { Component } from 'react';
import { Helmet } from "react-helmet"

class DonutStat extends Component {
    constructor(props){
        super(props);
        console.log(props.percent)
    }
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render() {
        return (
            <>
                <Helmet>
                    <script>{`
                        require(['https://euleroj.io/exposure/scripts/easypiechart.min.js'], () => {
                            const donutchart = document.getElementById('donutchart');
                            new EasyPieChart(donutchart, {
                                barColor: 'rgb(240,100,40)', //차트가 그려질 색 
                                trackColor: 'rgba(150,150,150,0.3)', // 차트가 그려지는 트랙의 기본 배경색(chart1 의 회색부분) 
                                scaleColor: 'rgba(0,0,0,0)', // 차트 테두리에 그려지는 기준선 (chart2 의 테두리 선) 
                                lineCap: 'round', // 차트 선의 모양 chart1 butt / chart2 round / chart3 square 
                                lineWidth: 20, // 차트 선의 두께 
                                size: 130, // 차트크기 
                                animate: 1000, // 그려지는 시간 
                            });
                        });
                    `}</script>
                </Helmet>
                <div id="donutchart" data-percent={ this.props.percent }/>
            </>
        );
    }
}

export default DonutStat;