let htmlEditor = document.querySelector("#html-code"),
    htmlSession = ace.edit(htmlEditor, {
        theme: "ace/theme/monokai",
        mode: "ace/mode/html",
    });
let cssEditor = document.querySelector("#css-code"),
    cssSession = ace.edit(cssEditor, {
        theme: "ace/theme/monokai",
        mode: "ace/mode/css",
    });
let jsEditor = document.querySelector("#js-code"),
    jsSession = ace.edit(jsEditor, {
        theme: "ace/theme/monokai",
        mode: "ace/mode/javascript",
    });


let run = _ => {
    let htmlCode = htmlSession.getValue(),
        cssCode = cssSession.getValue(),
        jsCode = jsSession.getValue(),
        output = document.getElementById('output');
    output.contentDocument.body.innerHTML = `${htmlCode}<style>${cssCode}</style>`;
    try {
        output.contentWindow.eval(jsCode);
    } catch (error) { }
}
