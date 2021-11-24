import{ useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";


function createReviews() {
    const navigate = useNavigate()
    const [reviews, setReviews] = useState({
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
            await axios.post("`https://ironrest.herokuapp.com/reviews", {topic})


        } catch(error){
            console.error(error.response.data)
        }

    }


    return (
        <form>
            <label htmlFor="comment">Comment:</label>
            <input 
                id="comment" 
                value={reviews.comment}
                type="text"
                onChange
                name="comment"
            />
            <label htmlFor="body">Make your comment</label>
            <textarea
                id="body"
                placeholder="Sei la"
                />
        </form>
    )
}

