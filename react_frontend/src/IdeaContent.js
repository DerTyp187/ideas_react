import React, { useState, useEffect } from "react";
import './css/IdeaContent.scss';
import {useParams} from 'react-router-dom'

function IdeaContent(){
    let params = useParams();
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("")
    let [saved , setSaved] = useState(false);
    let [intervalTime, setintervalTime] = useState(0);
    let [contentError, setContentError] = useState("");
    let [titleError, setTitleError] = useState("");


    //let secondsSaveInterval = 0;

    // TIMER
    useEffect(() => {
        const interval = setInterval(() => {
            setintervalTime(intervalTime => intervalTime + 1);

            if(intervalTime > 0){
                saveData();
                setintervalTime(0);
            }

            }, 500);

        return () => clearInterval(interval);
    });

    const saveData = async () => {
        let ideaData = {
            title: title,
            content: content
        }

        let data = await fetch('http://localhost:5000/idea/update/' + params.ideaId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ideaData)
        });

        let res = await data.json();

        if(res.title === "Success"){
            setSaved(true);
            setContentError("");
            setTitleError("");
        } else if(res.title === "Error"){
            if(res.type === "content"){
                setContentError(res.message);
                setTitleError("");
            } else if(res.type === "title"){
                setTitleError(res.message);
                setContentError("");
            }
            setSaved(false);
        }else{
            setSaved(false);
        }
    }
        
    const fetchIdea = async () => {
        // fetch and check for error
        const data = await fetch(
            'http://localhost:5000/idea/get/' + params.ideaId
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
                <label htmlFor="title">
                    <input type="text" name="title"
                    className={titleError ? "input-error" : ""}
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setSaved(false) }}
                    placeholder="Insert a title"/>
                    <small className="error-text">{titleError}</small>
                </label>
                
                 <small>{saved ? "Saved!": "Saving..."}</small>
            </div>
            <div className="textAreaContainer">
            <small className="error-text">{contentError}</small>
                <textarea className={contentError ? "input-error" : ""} value={content} onChange={(e) => { setContent(e.target.value); setSaved(false)}}></textarea>
            </div>
        </div>
    )
}

export default IdeaContent;