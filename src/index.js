import { Home } from './pages/Home.js'
import { About } from './pages/About.js'
import { DefaultRequire } from './pages/default-require.js'
import App from '../managment/cookie.js'

const cookieRoots = [
    {
        path: "/",
        page: Home
    },
    {
        path: "/about",
        page: About
    }
]

App.createRouter(cookieRoots, DefaultRequire)