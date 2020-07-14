import Dashboard from './../Dashboard';
import Tasks from './../Tasks';
import Cards from './../Cards';
import Settings from './../Settings';
import UsersMaintence from './../UsersMaintence';
import RolesMaintence from './../RolesMaintence';
import TagsMaintence from './../TagsMaintence';

const screens = [
    {
        title: 'Dashboard',
        icon: "FaChartArea",
        path: '/dashboard',
        component: Dashboard
    },{
        title: 'Tarefas',
        icon: "FaList",
        path: '/tasks',
        default: true,
        component: Tasks
    },{
        title: 'Cartões',
        icon: "FaTable",
        path: '/cards',
        component: Cards
    },{
        title: 'Configurações',
        icon: "FaTable",
        path: '/settings',
        component: Settings,
        footer:true,
        screens: [
            {
                title: 'Usuários',
                icon: "FaUsers",
                path: "/settings/users",
                component: UsersMaintence
            }, {
                title: 'Tipos Usuários',
                icon: "FaUsersCog",
                path: "/settings/roles",
                component: RolesMaintence
            }, {
                title: "Etiquetas",
                icon: "FaTags",
                path: "/settings/tags",
                component: TagsMaintence
            }
        ]
    }
];

export default screens;