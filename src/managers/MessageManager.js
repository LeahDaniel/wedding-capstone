export const getHostThreads = () => {
    return fetch(`http://localhost:8000/messages/hostthreads`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const getMessages = (hostId, vendorId) => {
    return fetch(`http://localhost:8000/messages?host=${hostId}&vendor=${vendorId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const createMessage = (message) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(message)
    }
    return fetch(`http://localhost:8000/messages`, fetchOptions)
        .then((res) => res.json())
}
