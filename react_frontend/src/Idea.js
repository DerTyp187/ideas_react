import React from "react";
import { Link, useParams} from 'react-router-dom'

function Idea({ideaId, title, description, timestamp}){
    
    let params = useParams();
    return(
        <Link to={`/idea/${ideaId}`}>
            <div className={`idea ${parseInt(params.ideaId) === ideaId ? "current" : ""}`}>
                <p className="title">{title}</p>
                <p className="description">{description}</p>
                <p className="timestamp">{timestamp}</p>
            </div>
        </Link>
    )
}

export default Idea;