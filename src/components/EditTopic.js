import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditTopic() {
    const params = useParams();
    const navigate = useNavigate();
    const[topic, setTopics] = usaState({
        title: "",
        body: ""
    });

    useEffect (() => {
        async function fetchTopic() {
            try {
                const respons = await axios.get(/*`https://ironres.herokuapp.com/review/${params.id}`*/);
                    delete({...response.data})
                setTopics({...Response.data});
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    function handleChange(event) {
        setTopics({
            ...topic,
            [event.target.name]: event.target.value,
        });
    }
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.put(/*"https://"*/)
            navigate("/");
        } catch (error) {
            console.error(error.respose.data);
        }
    }
    return <h1></h1>
}

export default EditTopic