import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import MaintenceContainer from './../../components/MaintenceContainer';
import Table from './../../components/Table';
import Button from './../../components/Button';
import Input from './../../components/Input';

import useHttp from './../../services/useHttp';

import './style.css';

const TagsMaintence = () => {
    const [tags, setTags] = useState([]);

    const httpRequest = useHttp();
    const history = useHistory();

    useEffect(()=>{
        async function loadRoles(){
            const response = await httpRequest("GET", "/available-tags");

            if (!response) return false;

            const {data} = response;

            if (data) {

                const newTags = data.map(data=>({
                    id: data.id_tag,
                    title: data.title,
                    background: data.background_color,
                    foreground: data.foreground_color
                }));

                setTags(newTags);
            }
        }
        loadRoles();
    }, []);

    function handleOpenNewTag(){
        history.push("/settings/tags/new");
    }

    function handleTagClick(e){
        history.push("/settings/tags/" + e.currentTarget.dataset.idtag);
    }

    return(
        <MaintenceContainer
            title="Etiquetas"
        >
            <header className="tags-header">
                <Button 
                    icon="FaPlus"
                    size="sm"
                    color="green"
                    onClick={handleOpenNewTag}
                > Nova Etiqueta </Button>
                
                <div>
                    <Input 
                        icon="FaSearch"
                        placeholder="Pesquise por descrição"
                    />
                </div>
            </header>

            <div className="tags-list">

                {tags.map(tag=>(
                    <div 
                        key={tag.id} 
                        data-idtag={tag.id} 
                        className="tag-container"
                        style={{
                            backgroundColor: tag.background,
                            color: tag.foreground
                        }}
                        onClick={handleTagClick}
                    >
                        {tag.title}
                    </div>
                ))}
                
            </div>
        </MaintenceContainer>
    );
}

export default TagsMaintence;