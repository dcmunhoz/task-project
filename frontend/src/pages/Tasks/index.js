import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Content from './../../components/Content';
import useHttp from './../../services/useHttp';
import Icon from './../../components/Icon';
import ActionButton from './../../components/ActionButton';
import Sidebar from './../../components/Sidebar';

import './style.css';

const Tasks = () => {
    const { shuldLoadTasks, shuldFilterTasks, situations } = useSelector(store => store.global);
    const { authenticatedUser } = useSelector(store => store.user);

    const [taskList, setTaskList] = useState([]);
    const [filteredTaskList, setFilteredTaskList] = useState([]);
    const [pageName, setPageName] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const httpRequest = useHttp();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
        loadTasks();
    }, [authenticatedUser]);

    useEffect(()=>{
        
        let mounted = true;

        if (mounted){
            if (shuldLoadTasks) {

                loadTasks();   
    
                dispatch({
                    type: "LOAD_TASKS",
                    payload: false
                });
    
            }
        }

        return () => mounted = false;        

    }, [shuldLoadTasks]);

    useEffect(()=>{

        if (shuldFilterTasks) {

            const params = new URLSearchParams(location.search);

            const filter = params.get("filters");

            switch (filter){
                case 'mine':
                    setPageName("Minhas Tarefas");
                break;
                case 'today':
                    setPageName("Tarefas para Hoje");
                break;
                case 'nexts':
                    setPageName("Tarefas para os próximos 7 dias");
                break;
                case 'late':
                    setPageName("Tarefas atrasadas");
                break;
                case 'all':
                    setPageName("Todas Tarefas");
                break;
                case 'new':
                    setPageName("Tarefas abertas hoje");
                break;
                case 'no-members':
                    setPageName("Tarefas sem membros");
                break;
                case 'deleted':
                    setPageName("Tarefas canceladas");
                break;
                case 'concluded':
                    setPageName("Tarefas concluidas");
                break;
            }

            const newTaskList = getFilteredTaskList(filter, taskList);

            setFilteredTaskList(newTaskList);

            dispatch({
                type:"FILTER_TASKS",
                payload: false
            });

        }

    }, [shuldFilterTasks]);

    useEffect(()=>{

        const allMine = getFilteredTaskList('mine', taskList);
        const today = getFilteredTaskList('today', taskList);
        const nexts = getFilteredTaskList('nexts', taskList);
        const late = getFilteredTaskList('late', taskList);
        const newTasks = getFilteredTaskList('new', taskList);
        const all = getFilteredTaskList('all', taskList);
        const noMembers = getFilteredTaskList('no-members', taskList);
        const concluded = getFilteredTaskList('concluded', taskList);
        const excluded = getFilteredTaskList('deleted', taskList);

        const sidebarFilterQtt = {
            qttAllMine: allMine.length,
            qttToday: today.length,
            qttNextSeven: nexts.length,
            qttLate: late.length,
            qttNewTasks: newTasks.length,
            qttAllTasks: all.length,
            qttNoMember: noMembers.length,
            qttConcluded: (concluded) ? concluded.length : 0,
            qttDeleted: (excluded) ? excluded.length : 0
        }

        dispatch({
            type: "SET_FILTERS_QTT",
            payload: {...sidebarFilterQtt}
        });

        setFilteredTaskList(all);

    }, [taskList, situations]);

    async function loadTasks(){

        const response = await httpRequest("GET", '/task/list');

        if (!response) return false;

        const { data } = response;

        if (data.error) {
            dispatch({
                type:"SHOW_ERROR_MESSAGE",
                payload: {
                    message: "Houve um erro ao processar uma informação, por favor, contato um administrador do sistema",
                }
            });
        }

        data.sort((a,b) => b.id_task - a.id_task);

        setTaskList(data);
    }

    function handleShowTaskDetail(e){

        if(e.target.dataset.action){
            return;
        }

        const { id: task_id } = e.currentTarget;
        history.replace(`?task=${task_id}`);
        
        dispatch({
            type: "SHOW_TASK_DETAIL_MODAL",
            payload: true
        })
    }

    function showActionButon(task){
        const alreadyAssigned = task.members.find(member=>member.id_user == authenticatedUser.id_user);
        
        if (!alreadyAssigned) {
            return <ActionButton task={task} action="assign" />
        } else if (task.id_situation == 1) {
            return <ActionButton task={task} action="play" />
        } else if (task.id_situation == 2) {
            return <ActionButton task={task} action="pause" />
        }
    }

    function getFilteredTaskList(filter, tasks){
        if (filter === "mine") {

            var newTaskList = tasks.filter(task => {
                const userIsMember = task.members.find(member=>{
                    return (member.id_user == authenticatedUser.id_user) ? true : false;
                });

                return (userIsMember) ? true : false;
            });
        } else if (filter === "today") {

            const date = new Date();
            const today = date.toLocaleDateString();
            
            var newTaskList = tasks.filter(task => {
                const userIsMember = task.members.find(member=>{
                    return (member.id_user == authenticatedUser.id_user) ? true : false;
                });

                return (userIsMember) ? true : false;
            }).filter(task=>task.estimated_start == today);

            


        } else if (filter === "nexts") {
          
            var newTaskList = tasks.filter(task => {
                const userIsMember = task.members.find(member=>{
                    return (member.id_user == authenticatedUser.id_user) ? true : false;
                });

                return (userIsMember) ? true : false;
            }).filter(task=>{
                if (task.estimated_start) {
                    let estimated = task.estimated_start;
                    const filtered = `${estimated.split('/')[1]}/${estimated.split('/')[0]}/${estimated.split('/')[2]}`;
                    
                    estimated = new Date(filtered);

                    const date = new Date();
                    date.setMinutes(0);
                    date.setMilliseconds(0);
                    date.setSeconds(0);
                    date.setHours(0);

                    if (estimated >= date && estimated <= date.setDate(date.getDate()+7) ) {
                        return true;
                    }


                }
            });


        } else if (filter === "new") {
            const date = new Date();
            const today = date.toLocaleDateString();
            
            var newTaskList = tasks.filter(task=>{
                
                let created = task.created_at;
                created = created.split(" ")[0];
                created = `${created.split("-")[1]}/${created.split("-")[2]}/${created.split("-")[0]}`;
                created = new Date(created);

                const date = new Date();
                if (created.toLocaleDateString() == date.toLocaleDateString()) {
                    return true;
                }
                
            });


        } else if (filter === "all") {
            var newTaskList = [...tasks];
        } else if (filter === "no-members") {
            const arr = [];
            var newTaskList = tasks.filter(task=>task.members.length == 0);
        } else if (filter === "late") {
            var newTaskList = tasks.filter(task => {
                const userIsMember = task.members.find(member=>{
                    return (member.id_user == authenticatedUser.id_user) ? true : false;
                });

                return (userIsMember) ? true : false;
            }).filter(task=>{
                if (task.estimated_start) {
                    let estimated = task.estimated_start;
                    const filtered = `${estimated.split('/')[1]}/${estimated.split('/')[0]}/${estimated.split('/')[2]}`;
                    
                    estimated = new Date(filtered);

                    const date = new Date();
                    date.setMinutes(0);
                    date.setMilliseconds(0);
                    date.setSeconds(0);
                    date.setHours(0);

                    if (estimated < date ) {
                        return true;
                    }


                }
            });


        } else if (filter === "deleted") {
            const excludedSituation = situations.find(situation=>situation.excluded == true);
            if (excludedSituation) var newTaskList = tasks.filter(task=>task.id_situation == excludedSituation.id);
        } else if (filter === "concluded") {
            const concludedSituation = situations.find(situation=>situation.conclusion == true);
            if (concludedSituation) var newTaskList = tasks.filter(task=>task.id_situation == concludedSituation.id);
        } else { 
            var newTaskList = [...tasks];
        }

        
        if (filter !== "deleted" && filter !== "concluded") {

            const concludedSituation = situations.find(sit=>sit.conclusion == true);
            const excludedSituation = situations.find(sit=>sit.excluded == true);
            
            if (concludedSituation && newTaskList && excludedSituation) {
                newTaskList = newTaskList.filter(task=>{
                    if (task.id_situation !== concludedSituation.id && task.id_situation !== excludedSituation.id) {
                        return true;
                    }
                });
            }

        }

        return newTaskList;
    }

    function handleChangeSidebarSearch(e){
        const input = e.target.value;
        setSearchInput(input);

        if (input.length > 0) {
            setPageName("Pesquisando Tarefa");
            const newTaskList = taskList.filter(task=>{
                if (task.id_task.includes(input) || task.title.includes(input)) {
                    return true;
                }else{
                    return false;
                }
            });

            setFilteredTaskList(newTaskList);
        } else {
            setPageName("Tarefas");
            setFilteredTaskList(taskList);
        }

        history.replace(location.pathname);

    }

    return(
        <Content
            sidebarFiltersComponent={Sidebar}
            sidebarValue={searchInput}
            sidebarOnChange={handleChangeSidebarSearch}
        >
            <div className="task-list-content">
                <header>
                    <h1>{pageName ?? "Tarefas"}</h1>
                </header>
                <div className="task-list">
                    <ul>
                        {(filteredTaskList) ? filteredTaskList.map(task=>(
                            <li key={task.id_task} >
                                <div className="task-box" id={task.id_task} onClick={handleShowTaskDetail}>
                                    <div className="action-icon">
                                        {showActionButon(task)}
                                    </div>
                                    <div className="principal-informations">
                                        <div className="principal-header-informations">
                                            #{task.id_task} <span className="situation-information">{task.situation}</span>
                                        </div>
                                        <div className="title-information" title={task.title}>
                                            {task.title}
                                        </div>
                                    </div>

                                    <div className="sub-informations">
                                        <div className="ticket-tags">

                                            {(task.tags.length >= 1) ? (task.tags.map(tag=>(
                                                <span key={tag.id_tag} className="tag" style={{backgroundColor: tag.background_color}} label={tag.title}> </span>
                                            ))) : ( 
                                                <span className="tag" style={{backgroundColor: "rgb(0, 0, 0, 0,)"}} > </span>
                                            )}

                                        </div>
                                        <div title={task.description}>
                                            {task.description}
                                        </div>
                                    </div>

                                    <div className="ticket-informations">
                                        <div className="ticket-members">
                                            {(task.members.length >= 1) ? (task.members.map(member=>(
                                                <img key={member.id_user} src={member.avatar} alt=""/>
                                            ))) : ( 
                                                <span className="no-members">Tarefa sem membros</span>
                                            )}
                                            
                                            
                                        </div>
                                        <div className="informations">
                                            <div className="opening-date">
                                                <Icon iconName="FaCalendar" /> {task.creation_date}
                                            </div>

                                            <div className="opening-time">
                                                <Icon iconName="FaClock" /> {task.creation_time}
                                            </div>

                                            <div className="opening-user">
                                                <Icon iconName="FaUser" /> {task.requester}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) : null}
                    </ul>

                </div>
            </div>
        </Content>
    );
}

export default Tasks;