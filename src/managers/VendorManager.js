export const getCurrentVendor = () => {
    return fetch(`http://localhost:8000/vendors/profile`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const updateCurrentVendor = (newVendor) => {
    return fetch(`http://localhost:8000/vendors/updatebusiness`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(newVendor)
    })
        .then(() => getCurrentVendor())
}
