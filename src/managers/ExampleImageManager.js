export const createExampleImage = base64 => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify({file: base64})
    }
    return fetch(`http://localhost:8000/exampleimages`, fetchOptions)
        .then((res) => res.json())
}

export const deleteExampleImage = exampleImageId => {
    return fetch(`http://localhost:8000/exampleimages/${exampleImageId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
};


export const getExampleImages = vendorId => {
    return fetch(`http://localhost:8000/exampleimages?vendor=${vendorId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}