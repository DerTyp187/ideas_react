import React, { useState, useEffect } from "react";
import './css/IdeaContent.scss';
import {useParams} from 'react-router-dom'

function IdeaContent(){
    let params = useParams();
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("")
    let [saved , setSaved] = useState(false);
    let [seconds, setSeconds] = useState(0);

    let secondsSaveInterval = 3;

    // TIMER
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);

            if(seconds > secondsSaveInterval){ // save every > secondsSaveInterval seconds
                saveData();
                setSeconds(0);
            }

            }, 1000);

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
        } else {
            setSaved(false);
        }
    }
        
    const fetchIdea = async () => {
        // fetch and check for error
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
                 onChange={(e) => { setTitle(e.target.value); setSaved(false) }}
                 placeholder="Insert a title"/>
                 <small>{saved ? "Saved!": "Saving..."}</small>
            </div>
            <div className="textAreaContainer">
                <textarea value={content} onChange={(e) => { setContent(e.target.value); setSaved(false)}}></textarea>
            </div>
        </div>
    )
}

export default IdeaContent;