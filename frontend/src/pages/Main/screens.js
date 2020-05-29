import Dashboard from './../Dashboard';
import Tasks from './../Tasks';
import Cards from './../Cards';

const Screens = [
    {
        title: 'Dashboard',
        icon: "FaChartArea",
        path: '/dashboard',
        component: Dashboard
    },{
        title: 'Tarefas',
        icon: "FaList",
        path: '/tasks',
        component: Tasks
    },{
        title: 'Cartões',
        icon: "FaTable",
        path: '/cards',
        default: true,
        component: Cards
    },
];

export default Screens;