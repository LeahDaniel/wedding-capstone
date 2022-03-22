export const createVisionPhoto = base64 => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify({file: base64})
    }
    return fetch(`http://localhost:8000/visionphotos`, fetchOptions)
        .then((res) => res.json())
}

export const deleteVisionPhoto = visionPhotoId => {
    return fetch(`http://localhost:8000/visionphotos/${visionPhotoId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
};


export const getVisionPhotos = hostId => {
    return fetch(`http://localhost:8000/visionphotos?host=${hostId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}