import React, {useState, useEffect} from 'react';
import Idea from './Idea';
import './css/IdeaList.scss';
import { useParams} from 'react-router-dom'

function IdeaList() {

    let params = useParams()
    let selectedIdeaId = params.ideaId;
    let [ideas, setIdeas] = useState([]);

    const fetchIdeas = async () => {
        const data = await fetch(
            'http://localhost:5000/ideas/'
        );
        
        const ideas = await data.json();
        setIdeas(ideas);

    }

    useEffect(() => {
        fetchIdeas();
    }, []);
    
    return (
        <div className='ideaList'>
            <div className='head'>
                <p>Your Ideas</p>                
                
                <img src="/" alt="" />
                <img src="/" alt="" />

                <div className="newIdea">
                    <p>+</p>
                </div>
                
            </div>
            <div className='ideaListContent'>

                {ideas.map(idea => (
                    <Idea ideaId={idea.id} title={idea.title} description={idea.content} timestamp="02.05.2021" />  
                ))}
            </div>
        </div>
    );
    
}

export default IdeaList;