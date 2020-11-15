import Cookie from '../managment/cookie.js'

const settings = {
    title: "Example Cookie.js App",
    styles: [
        { rel: "stylesheet", fileName: "index.css" }
    ],
    links: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }
    ]
}

Cookie.config(settings)