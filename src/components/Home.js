import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react"
import EditTopic from "./CreateTopic"
import EditTopic from "./EditTopic"

function Home() {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        async function fetchTopics() {
            try {
                const response = await axios.get(/*http*/);
            setTopics([...response.data]);
        } catch (err) {
            console.error(err);
        }   
    }
        fetchTopics();
}, []);

async function handleDelete (event) {
try {
    await axios.delete(/*http:*/)
}catch (err){
    console.error(err)
}
}

    return (
        <section>
            
            <Link to=/"create-topic">
                <button type="button">Create a review!</button>
            </Link>    
            {topics.map((currentTopic) => {
                    return (
                        <div className="topic-card" key={currentTopic._id}>
                            <h2>{currentTopic.title}</h2>
                            <p>{currentTopic.body}</p>
                            <Link to={`/edit-topic/${currentTopic._id}`}>
                                <button type="button">Edit review!</button>
                            </Link>
                            <button type="button" onClick={() => {}}>Delete review</button>
                            </div>
                            );
                        })} 
                        
         </section>          

                              

export default Home