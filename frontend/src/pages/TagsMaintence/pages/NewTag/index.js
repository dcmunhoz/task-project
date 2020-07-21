import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import MaintenceContainer from './../../../../components/MaintenceContainer';
import Input from './../../../../components/Input';
import Button from './../../../../components/Button';
import Select from './../../../../components/Select';

import useHttp from './../../../../services/useHttp';

import './style.css';

const NewTag = () =>{
    const [idTag, setIdTag] = useState(null);
    const [tag, setTag] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#D7D7D7");
    const [foregroundColor, setForegroundColor] = useState("#FFFFFF");

    const httpRequest = useHttp();
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(()=>{

        async function loadRole(){
            if (params['id_tag']) {

                const { id_tag } = params;

                const response = await httpRequest("GET", `/tag/${id_tag}`);

                if (!response) return false;
                
                const { data } = response;

                if (data['error']){
                    
                    history.push("/settings/tags");
                    
                    dispatch({
                        type: "SHOW_MODAL_MESSAGE",
                        payload:{
                            title: "Oooops...",
                            message: data.error
                        }
                    });
                    
                    return;
                }

                setIdTag(data.id_tag)
                setTag(data.title);
                setBackgroundColor(data.background_color);
                setForegroundColor(data.foreground_color);


            }

        }

        loadRole();

    }, []);

    async function handleSendTag(e){
        e.preventDefault();

        if (!tag) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Oooops...",
                    message: "Alguns campos precisam ser preenchidos !"
                }
            });

            return;
        }

        const tagData = {
            id_tag: idTag?? null,
            tag,
            backgroundColor,
            foregroundColor
        };

        const response = await httpRequest("POST", '/tag/new', tagData);

        if (!response) return false;

        const { data } = response;
    
        if (data['error']) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Ooops...",
                    message: data['error']
                }
            });

            return;
        }

        dispatch({
            type: "SHOW_MODAL_MESSAGE",
            payload:{
                title: "Sucesso",
                message: "A etiqueta foi salva com sucesso."
            }
        });

        history.push("/settings/tags");

    }

    function handleCancel(e){
        e.preventDefault();
        history.push("/settings/tags");
    }

    async function handleDeleteTag(e){

        e.preventDefault();

        if (!window.confirm("Deseja apagar a etiqueta?")) {
            return;
        }


        const response = await httpRequest("DELETE", `/tag/${idTag}`);

        if (!response) return false;

        const { data } = response;

        if (data.error) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Ooops",
                    message: data.error
                }
            });
            return false;
        }
        
        dispatch({
            type: "SHOW_MODAL_MESSAGE",
            payload:{
                title: "Sucesso",
                message: "A etiqueta foi apagada com sucesso."
            }
        });
        
        history.push("/settings/tags");

    }

    return(
        <MaintenceContainer 
            title="Manutenção Etiqueta"
            subTitle="Cadastro/Edição de etiquetas"
        >
            <section className="new-tag-container">
                <form>
                    <div className="form-row">
                        <Input 
                            required
                            type="text"
                            placeholder="Titulo da Etiqueta"
                            value={tag}
                            onChange={(e)=>setTag(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <Input 
                            type="color"
                            value={backgroundColor}
                            onChange={(e)=>setBackgroundColor(e.target.value)}
                        />

                        &nbsp; Background color
                    </div>

                    <div className="form-row">
                        <Input 
                            type="color"
                            value={foregroundColor}
                            onChange={(e)=>setForegroundColor(e.target.value)}
                        />

                        &nbsp; Font color
                    </div>

                    <Button
                        icon="FaPlus"
                        color="green"
                        size="sm"
                        onClick={handleSendTag}
                    >
                        Salvar
                    </Button>

                    <Button
                        icon="FaTimes"
                        color="red"
                        size="sm"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>

                    <Button 
                        icon="FaTrash"
                        color="orange"
                        size="sm"
                        onClick={handleDeleteTag}
                    >
                        Deletar
                    </Button>
                </form>
            </section>
        </MaintenceContainer>
    );
}

export default NewTag;