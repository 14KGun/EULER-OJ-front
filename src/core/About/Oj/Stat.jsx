import { Component } from 'react';
import Layout from '../Layout';
import Chart from "react-apexcharts";
import axios from '../../Tool/axios';

import svgChart from '../svg_chart.svg';

class Stat extends Component {
    constructor(props) {
        super(props);

        this.state = { category: [], data: [] };

        axios.get('/json/about/oj/stat').then(result => {
            const category = [], data = [];
            result.data.stat.pop();
            for(const i of result.data.stat){
                category.push(i.name);
                data.push(i.value);
            }
            this.setState({ category: category, data: data })
        })
    }
    render() {
        const chartOptions = {
            xaxis: { categories: this.state.category },
            chart: {
                zoom: { enabled: false }, toolbar: { show: false }, foreColor: 'gray',
                /* dropShadow: { enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2 }, */
            },
            sparkline: { enabled: false },
            stroke: { curve: 'smooth' }
        };
        const chartSeries = [{ name: "채점 횟수", data: this.state.data }];

        return (
            <div className="ND">
                <Layout.Title icon={ svgChart } theme={ this.props.theme }>채점 시도 횟수</Layout.Title>
                <Chart type="line" options={ chartOptions } series={ chartSeries } width="100%" height="400px"/>
            </div>
        );
    }
}

export default Stat;