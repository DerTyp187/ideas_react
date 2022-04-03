import React, {useState, useEffect} from "react";
import { Link, useParams} from 'react-router-dom'

function Idea({ideaId, title, description, timestamp}){
    
    let params = useParams();
    let [t, setT] = useState(title);
    let [d, setD] = useState(description);


    const deleteIdea = async () => {
        let data = await fetch('http://localhost:5000/idea/delete/' + ideaId);
        const result = await data.json();
        console.log(result)
        if(result.title === "Success"){
            window.location.reload();
        }
    }
    const fetchIdea = async () => {
        const data = await fetch(
            'http://localhost:5000/idea/get/' + params.ideaId
        );
        
        const idea = await data.json();
        
        setT(idea.title);
        setD(idea.content);
    }

    

    useEffect(() => {
        const interval = setInterval(() => {
            if(parseInt(params.ideaId) === ideaId){
                fetchIdea();
            }
        }, 3000);

        return () => clearInterval(interval);
      }, []);

    return(
        <Link to={`/idea/${ideaId}`}>
            <div className={`idea ${parseInt(params.ideaId) === ideaId ? "current" : ""}`}>
                <p className="title">{t}</p>
                <p className="description">{d}</p>
                <div className="right">
                    <p className="delete" onClick={deleteIdea}>Delete</p>
                    <p className="timestamp">{timestamp}</p>
                </div>
                
            </div>
        </Link>
    )
}

export default Idea;