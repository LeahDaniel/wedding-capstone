export const getHost = (id) => {
    return fetch(`http://localhost:8000/hosts/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentHost = () => {
    return fetch(`http://localhost:8000/hosts/profile`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const updateCurrentHost = (newHost) => {
    return fetch(`http://localhost:8000/hosts/updatewedding`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(newHost)
    })
        .then(() => getCurrentHost())
}