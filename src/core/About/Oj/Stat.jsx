import { Component } from 'react';
import Layout from '../Layout';
import Chart from "react-apexcharts";
import axios from '../../Tool/axios';

import svgChart from '../svg_chart.svg';

const getQuarter = (x) => {
    const year = x.split('-')[0];
    const month = x.split('-')[1];

    if(['1','2','3'].indexOf(month) !== -1) return `${ year }년 1분기`;
    if(['4','5','6'].indexOf(month) !== -1) return `${ year }년 2분기`;
    if(['7','8','9'].indexOf(month) !== -1) return `${ year }년 3분기`;
    if(['10','11','12'].indexOf(month) !== -1) return `${ year }년 4분기`;
    return `${ year }년`;
}

class Stat extends Component {
    constructor(props) {
        super(props);

        this.state = { category: [], data: [] };

        axios.get('/json/about/oj/stat').then(result => {
            const category = [], data = [];
            
            for(const i of result.data.stat){
                const categoryName = getQuarter(i.name);
                
                if(category.length > 0 && category[category.length - 1] == categoryName){
                    data[data.length - 1] += i.value;
                }
                else{
                    category.push(categoryName);
                    data.push(i.value);
                }
            }
            category.pop(); data.pop();
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
            stroke: { curve: 'smooth' },
            dataLabels: { enabled: false }
        };
        const chartSeries = [{ name: "채점 횟수", data: this.state.data }];

        return (
            <div className="ND">
                <Layout.Title icon={ svgChart } theme={ this.props.theme }>채점 시도 횟수</Layout.Title>
                <Chart type="area" options={ chartOptions } series={ chartSeries } width="100%" height="400px"/>
            </div>
        );
    }
}

export default Stat;