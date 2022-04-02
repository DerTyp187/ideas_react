import React, { useState, useEffect } from "react";
import './css/IdeaContent.scss';
import {useParams} from 'react-router-dom'

function IdeaContent(){
    let params = useParams();
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("")

    

    const fetchIdea = async () => {
        const data = await fetch(
            'http://localhost:5000/idea/' + params.ideaId
        );
        
        const idea = await data.json();
        console.log(idea);
        setTitle(idea.title);
        setContent(idea.content);
    }

    useEffect(() => {
        fetchIdea();
    }, [params.ideaId])


    return(
        <div className="ideaContent">
            <div className="head">
                <input type="text" name="title"
                 value={title}
                 onChange={(e) => { setTitle(e.target.value) }}
                 placeholder="Insert a title"/>
            </div>
            <div className="textAreaContainer">
                <textarea value={content} onChange={(e) => { setContent(e.target.value) }}></textarea>
            </div>
        </div>
    )
}

export default IdeaContent;