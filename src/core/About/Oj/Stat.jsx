import { Component } from 'react';
import Layout from '../Layout';
import Chart from "react-apexcharts";

import svgChart from '../svg_chart.svg';

class Stat extends Component {
    constructor(props) {
        super(props);
        
        this.chartOptions = {
            xaxis: { categories: [] },
            chart: {
                zoom: { enabled: false }, toolbar: { show: false }, foreColor: 'gray',
                /* dropShadow: { enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2 }, */
            },
            sparkline: { enabled: false },
            stroke: { curve: 'smooth' }
        }
        this.chartSeries = [{ name: "채점 횟수", data: [] }];
    }
    render() {
        return (
            <div className="ND">
                <Layout.Title icon={ svgChart } theme={ this.props.theme }>채점 시도 횟수</Layout.Title>
                <Chart type="line" options={ this.chartOptions } series={ this.chartSeries } width="100%" height="400px"/>
            </div>
        );
    }
}

export default Stat;