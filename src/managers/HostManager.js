export const getHost = (id) => {
    return fetch(`http://localhost:8000/hosts/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}