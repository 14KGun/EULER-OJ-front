import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import codeEditorScript from './codeEditorScript';

class Editor extends Component {
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
                <div id="code-editor" style={{ width: '100%', height: this.props.height }}></div>
            </>
        );
    }
}

Editor.defaultProps = {
    lang: 'cpp', theme: 'vs-dark', height: '500px',
    letterSpacing: 0, fontSize: 16, tabSize: 4
}
export default Editor;