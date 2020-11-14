import Router from '../managment/router-manager.js'
import { Home } from './pages/Home.js'
import { About } from './pages/About.js'
import { DefaultRequire } from './static/default-require.js'

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

const router = new Router(cookieRoots).createRouter(DefaultRequire)