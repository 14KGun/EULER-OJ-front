import React, { Component } from 'react';

const pageStyle = {
    display: 'inline-block', fontSize: '16px', fontWeight: '300', fontFamily: 'Nanum Gothic',
    height: '30px', lineHeight: '30px', minWidth: '30px',
    paddingLeft: '10px', paddingRight: '10px', borderRadius: '15px'
}
const Page = (props) => {
    if(props.selected){
        <span style={{ ...pageStyle, background: 'rgb(200,200,200)' }}>{ props.page }</span>
    }
    else{
        return (
            <Link to={ `${props.url}?page=${props.page}` }>
                <span style={{ ...pageStyle }}>{ props.page }</span>
            </Link>
        )
    }
}
const PageLeft = (props) => {
    return (
        <Link to={ `${props.url}?page=${props.page}` }>
            <span style={{ ...pageStyle }}>&lt;</span>
        </Link>
    )
}
const PageRight = (props) => {
    return (
        <Link to={ `${props.url}?page=${props.page}` }>
            <span style={{ ...pageStyle }}>&gt;</span>
        </Link>
    )
}

class PageSelector extends Component {
    render() {
        const left = Math.max(1, this.props.page-4);
        const right = Math.min(this.props.maxPage, this.props.page+4);

        return (
            <div className="ND" style={{ paddingTop: '30px', textAlign: 'center' }}>
                
            </div>
        );
    }
}

export default PageSelector;