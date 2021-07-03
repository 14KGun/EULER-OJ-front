import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import codeEditorScript from './codeEditorScript';

class Editor extends Component {
    constructor(props){
        super(props);
        this.style = { width: '100%', height: '500px' }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.props !== nextProps){

        }
        return false;
    }
    render() {
        const script = codeEditorScript(this.props.lang, this.props.theme, this.props.letterSpacing, this.props.fontSize, this.props.tabSize);
        return (
            <>
                <Helmet><script>{ script }</script></Helmet>
                <div id="code-editor" style={ this.style }></div>
            </>
        );
    }
}

Editor.defaultProps = {
    lang: 'cpp', theme: 'vs-dark',
    letterSpacing: 0, fontSize: 16, tabSize: 4
}
export default Editor;