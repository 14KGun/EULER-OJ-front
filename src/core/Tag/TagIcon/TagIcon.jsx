import React, { Component } from 'react';
import svgFolder from './svg_folder.svg';

const Folder = () => {
    return (
        <div>
            <img src={ svgFolder }/>
        </div>
    );
}

class TagIcon extends Component {
    constructor(props) {
        super(props);
        this.scale = this.props.scale;
        this.icon = {
            folder: { light: <Folder/>, dark: <Folder/> }
        }
    }
    render() {
        return (
            <span style={{ position: 'inline-block', width: this.scale, height: this.scale, overflow: 'hidden' }}>
                
            </span>
        );
    }
}

export default TagIcon;