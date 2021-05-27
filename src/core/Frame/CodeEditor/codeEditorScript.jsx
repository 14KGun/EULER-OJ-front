const script = `
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
`;
export default script;