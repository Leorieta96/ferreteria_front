import Fulllayout from '../layouts/fulllayout.jsx';
import Login from '../views/Login/index.js';
/* import Alerts from '../views/ui-components/alert.jsx';
 */
var indexRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        isPrivate: false
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Fulllayout,
        isPrivate: true
    }

];

export default indexRoutes;
