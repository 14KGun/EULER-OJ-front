const makeScript = (lang, theme, letterSpacing, fontSize, tabSize, initCode) => {
    return `require(['https://euleroj.io/exposure/scripts/vs/loader.js'], function() {
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
            editor.getModel().setValue('${ initCode.split('\n').join('\\n') }');
        });
    });
    `;
}
export default makeScript;