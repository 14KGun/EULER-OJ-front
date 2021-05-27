import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import codeEditorScript from './codeEditorScript';

class Editor extends Component {
    constructor(props){
        super(props);
        this.style = { width: '100%', height: '500px' }
    }
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render() {
        return (
            <>
                <Helmet><script>{ codeEditorScript }</script></Helmet>
                <div id="code-editor" style={ this.style }></div>
            </>
        );
    }
}

Editor.defaultProps = {
    theme: '', fontSize: '16px'
}
export default Editor;