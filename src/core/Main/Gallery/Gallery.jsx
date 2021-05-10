import React, { Component } from 'react';
import { useSpring, animated } from 'react-spring';
import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import Page3 from './Page3/Page3';

const GalleryMaker = (props) => {
    const pageList = [<Page1/>, <Page2/>, <Page3/>];
    const pageIndex = props.pageIndex; //, setPage = props.setPage;

    var pageStyle = [];

    pageStyle.push(useSpring({ height: '500px', width: '100%', position: 'absolute', overflow: 'hidden', top: '0px', 
    left: `${100*(0-pageIndex)}%` }));

    pageStyle.push(useSpring({ height: '500px', width: '100%', position: 'absolute', overflow: 'hidden', top: '0px', 
    left: `${100*(1-pageIndex)}%` }));

    pageStyle.push(useSpring({ height: '500px', width: '100%', position: 'absolute', overflow: 'hidden', top: '0px', 
    left: `${100*(2-pageIndex)}%` }));

    return (
        <div className="ND" style={{ height: '500px', width: '100%', position: 'relative' }}>
            { pageList.map((item, index) => <animated.div key={ index } style={ pageStyle[index] }>{ item }</animated.div>) }
        </div>
    );
}
class Gallery extends Component {
    constructor(props){
        super(props);

        setInterval(() => {
            //if(this.props.pageFix == undefined) this.props.setPage((this.props.pageIndex + 1)%3);
        }, 10000);
    }
    render() {
        return (
            <GalleryMaker pageIndex={ this.props.pageIndex } setPage={ this.props.setPage }/>
        );
    }
}

export default Gallery;