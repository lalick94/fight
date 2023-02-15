import Login from '../components/Login.vue'
import Menu from '../components/Menu.vue'
import Menu2 from '../components/Menu2.vue'
import Quiz from '../components/Quiz.vue'
import Quiz2 from '../components/Quiz2.vue'
export const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/menu',
        name: 'menu',
        component: Menu
    },
    {
        path: '/comic',
        name: 'comic',
        component: Quiz
    },
    {
        path: '/zuzuordnen1',
        name: 'zuzuordnen1',
        component: Quiz
    },
    {
        path: '/zuzuordnen2',
        name: 'zuzuordnen2',
        component: Quiz
    },
    {
        path: '/quiz',
        name: 'quiz',
        component: Quiz
    },
    {
        path: '/erinnerungalarm',
        name: 'erinnerungalarm',
        component: Quiz
    },
    {
        path: '/ausfuellen',
        name: 'ausfuellen',
        component: Quiz
    },
    {
        path: '/vertiefungsmenu',
        name: 'vertiefungsmenu',
        component: Menu2
    },
    {
        path: '/question',
        name: 'question',
        component: Quiz2
    },
    {
        path: '/memory',
        name: 'memory',
        component: Quiz2
    },
    {
        path: '/selbstdarstellungonline',
        name: 'selbstdarstellungonline',
        component: Quiz2
    },
    {
        path: '/uebungmittimer',
        name: 'uebungmittimer',
        component: Quiz2
    },
    {
        path: '/genussmomente',
        name: 'genussmomente',
        component: Quiz2
    },
    {
        path: '/mandala',
        name: 'mandala',
        component: Quiz2
    },


]