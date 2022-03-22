export const createPalette = palette => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(palette)
    }
    return fetch(`http://localhost:8000/palettes`, fetchOptions)
        .then((res) => res.json())
}

export const editPalette = (paletteId, palette) => {
    return fetch(`http://localhost:8000/palettes/${paletteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(palette)
    })
}

export const getPalette = (hostId) => {
    return fetch(`http://localhost:8000/palettes/${hostId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentPalette = () => {
    return fetch(`http://localhost:8000/palettes/current`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}