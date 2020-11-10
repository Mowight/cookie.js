import Router from '../managment/router-manager.js'
import { Home } from './pages/Home.js'
import { About } from './pages/About.js'

const roots = [
    {
        path: "/",
        page: Home
    },
    {
        path: "/about",
        page: About
    },
]

new Router(roots).createRouter()