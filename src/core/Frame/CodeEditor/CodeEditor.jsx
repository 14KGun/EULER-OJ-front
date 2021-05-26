import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class Editor extends Component {
    constructor(props){
        super(props);
        this.style = { width: '100%', height: '500px' }
    }
    render() {
        return (
            <>
                <Helmet>
                    <script>{`
                        require(['https://euleroj.io/exposure/scripts/vs/loader.js'], function() {
                            //console.log(monaco);
                            require.config({ paths: { 'vs': 'https://euleroj.io/exposure/scripts/vs' }});
                            require(['vs/editor/editor.main'], function() {
                                var editor = monaco.editor.create(document.getElementById('code-editor'), {
                                    language: 'cpp',
                                    theme: "vs-dark",
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    fitContentHeight: true,
                                    fontSize: 16
                                });
                            });
                        });
                    `}</script>
                </Helmet>
                <div id="code-editor" style={ this.style }></div>
            </>
        );
    }
}

export default Editor;