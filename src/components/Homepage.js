import axios from "axios"

function HomePage () {
    axios.post("https://ironrest.herokuapp.com/reviews", "Só para mostrar como whatever")
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })


    return (
        <h1>test</h1>
    )
}

export default HomePage