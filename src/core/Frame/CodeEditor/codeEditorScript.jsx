const makeScript = (lang, theme, letterSpacing, fontSize, tabSize, initCode) => {
    let wrapCode = '';
    for(let i=0; i<initCode.length; i++){
        wrapCode = wrapCode + `source=source+String.fromCharCode(${initCode.charAt(i).charCodeAt(0)});`
    }

    return `require(['https://euleroj.io/exposure/scripts/vs/loader.js'], function() {
        let source = '';
        ${ wrapCode }
        require.config({ paths: { 'vs': 'https://euleroj.io/exposure/scripts/vs' }});
        require(['vs/editor/editor.main'], function() {
            const editor = monaco.editor.create(document.getElementById('code-editor'), {
                language: '${ lang }',
                theme: "${ theme }",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                fitContentHeight: true,
                letterSpacing: ${ letterSpacing },
                fontFamily: 'D2Coding',
                fontSize: ${ fontSize },
                tabSize: ${ tabSize }
            });
            document.getElementById('code-editor').editor = editor;
            document.getElementById('code-editor').monaco = monaco;
            editor.getModel().setValue(source);
        });
    });
    `;
}
export default makeScript;