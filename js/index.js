window.addEventListener("DOMContentLoaded",function(){
    console.log('dom loaded')
    const textAreaSelector = () => document.getElementById('urlTextArea');
    const codeBoxSelector = () => document.getElementById('codebox');
    textAreaSelector().addEventListener('keypress', (function() {
        const textAreaValues = textAreaSelector().value.split('\n');
        console.dir(textAreaValues);
        codeBoxSelector().innerText = JSON.stringify(textAreaValues);
    }))
});