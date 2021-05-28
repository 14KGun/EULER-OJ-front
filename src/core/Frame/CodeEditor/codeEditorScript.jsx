const makeScript = (lang, theme, letterSpacing, fontSize, tabSize) => {
    return `require(['https://euleroj.io/exposure/scripts/vs/loader.js'], function() {
        //console.log(monaco);
        require.config({ paths: { 'vs': 'https://euleroj.io/exposure/scripts/vs' }});
        require(['vs/editor/editor.main'], function() {
            var editor = monaco.editor.create(document.getElementById('code-editor'), {
                language: '${ lang }',
                theme: "${ theme }",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                fitContentHeight: true,
                letterSpacing: ${ letterSpacing },
                fontSize: ${ fontSize },
                tabSize: ${ tabSize }
            });
        });
    });
    `;
}
export default makeScript;