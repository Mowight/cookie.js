export const errorCookie = (title, message) => {
    const css = (`
        html {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        .cookie-error-system-panel {
            font-family: monospace;
            background: white;
            z-index: 3;
            display: block;
            text-align: left;
            width: 100%;
            height: 100vh;
        }
        
        .cookie-error-system-panel .title {
            color: red;
            padding: 0;
            margin: 0;
            font-size: 3em;
            padding: 0.3em;
        }

        .cookie-error-system-panel .message {
            color: grey;
            padding: 1em;
        }
    `)

    const html = (`
        <div class="cookie-error-system-panel">
            <p class="title"> ${title} </p>
            <p class="message">
                ${message}
            </p>
            <style> ${css} </style>
        </div>
    `)

    document.querySelector("html").innerHTML = html
}