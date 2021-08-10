import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Loading from '../Loading/Loading';
import codeEditorScript from './codeEditorScript';
import defaultCode from './defaultCode';

const LoadingLay = () => {
    return (
        <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', textAlign: 'center' }}>
            <div style={{ paddingTop: '80px' }}>
                <Loading/>
            </div>
            <div style={{ paddingTop: '100px' }}>에디터 불러오는 중...</div>
        </div>
    )
}

class Editor extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const editor = document.getElementById('code-editor').editor;
        const monaco = document.getElementById('code-editor').monaco;
        
        if(!editor) return false;
        if(!monaco) return false;
        if(this.props.lang !== nextProps.lang){
            monaco.editor.setModelLanguage(editor.getModel(), this.langForEditor(nextProps.lang));
        }
        if(this.props.theme !== nextProps.theme){
            monaco.editor.setTheme(nextProps.theme);
        }
        if(this.props.letterSpacing !== nextProps.letterSpacing){
            editor.updateOptions({ letterSpacing: nextProps.letterSpacing });
        }
        if(this.props.fontSize !== nextProps.fontSize){
            editor.updateOptions({ fontSize: nextProps.fontSize });
        }
        if(this.props.tabSize !== nextProps.tabSize){
            editor.updateOptions({ tabSize: nextProps.tabSize });
        }
        return false;
    }
    langForEditor(lang){
        if(lang.indexOf('Py')!=-1)  return 'python';
        else if(lang.indexOf('py')!=-1)  return 'python';
        else if(lang.indexOf('Java')!=-1) return 'java';
        else if(lang.indexOf('java')!=-1) return 'java';
        else if(lang.indexOf('C++')!=-1) return 'cpp';
        else if(lang.indexOf('c++')!=-1) return 'cpp';
        else if(lang.indexOf('C')!=-1) return 'c';
        else if(lang.indexOf('c')!=-1) return 'c';
        else if(lang.indexOf('R')!=-1) return 'r';
        else if(lang.indexOf('r')!=-1) return 'r';
    }
    onChange(){
        const editor = document.getElementById('code-editor').editor;
        if(!editor) return;
        if(this.props.onChange){
            this.props.onChange(editor.getValue());
        }
    }
    render() {
        let initCode = defaultCode.toString(this.props.lang);
        if(this.props.initCode !== undefined) initCode = this.props.initCode;

        const script = codeEditorScript(this.langForEditor(this.props.lang), this.props.theme, this.props.letterSpacing, this.props.fontSize, this.props.tabSize, initCode);
        return (
            <div style={{ width: '100%', height: this.props.height, position: 'relative', background: 'rgb(230,230,230)', overflow: 'hidden' }}>
                <Helmet><script>{ script }</script></Helmet>
                <LoadingLay/>
                <div id="code-editor" style={{ width: '100%', height: '100%' }}
                onKeyUp={ () => this.onChange() } onKeyDown={ () => this.onChange() }/>
            </div>
        );
    }
}
Editor.defaultProps = {
    lang: 'C++', theme: 'vs-dark', height: '500px',
    letterSpacing: 0, fontSize: 16, tabSize: 4,
    font: 'D2Coding'
}

const EditorFont = (props) => {
    return (
        <Helmet>
            <style>{ `.view-line > span > span{ font-family: "${ props.font }", sans-serif; }` }</style>
        </Helmet>
    )
}

const EditorCombiner = (props) => {
    return (
        <>
            <Editor { ...props }/>
            <EditorFont { ...props }/>
        </>
    )
}

export default EditorCombiner;