window.addEventListener("DOMContentLoaded",function(){
    const textAreaSelector = () => document.getElementById('urlTextArea');
    const codeBoxSelector = () => document.getElementById('codebox');
    // const copyClipboardSelector = () => document.getElementById('copyToClipBoard');

    const uriString = 'https://2rygsn9pzc.execute-api.us-east-1.amazonaws.com/dev/amp?';

    function checkAndGenerateUrl (){
        const textAreaValues = textAreaSelector().value.trim().split('\n');
        let queryString = '';
        textAreaValues.forEach(element => {
            element ? queryString += `url=${element}&` : undefined;
        });
        codeBoxSelector().innerText = uriString + queryString;
    }

    checkAndGenerateUrl();

    textAreaSelector().addEventListener('input', (function() {
        checkAndGenerateUrl();
    }));
    // TODO this is pretty tough without a library and without doing silly stuff
    // copyClipboardSelector().addEventListener('click', (function() {
    //     codeBoxSelector().select();
    //     document.execCommand('copy');
    // }))
});