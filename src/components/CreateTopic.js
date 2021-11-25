import{ useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";


function CreateTopic() {
    const navigate = useNavigate()
    const [topic, setTopic] = useState({
        title:"",
        body:"",
    });

    function handleChange(event) {
        setTopic({
            ...topic,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try{
            await axios.post(/*"https://ironrest.herokuapp.com/reviews", {topic}*/)
            navigate("/");
        } catch(error){
            console.error(error.response.data)
        }
    }


    return (
        <form>
            <div>
            <CreateTopic />
            <EditTopic />
            </div>
            <label htmlFor="title">Title:</label>
            <input 
                id="title" 
                value={topic.title}
                type="text"
                onChange={handleChange}
                name="title"
            />
            <label htmlFor="body">Make your comment</label>
            <textarea
                id="body"
                placeholder="Sei la"
                value={topic.body}
                type="text"
                onChange={handleChange}
                name="body"
                />
                <button type="submit" onClick={handleSubmit}>Submit review</button>
        </form>
    )
}


export default CreateTopic
