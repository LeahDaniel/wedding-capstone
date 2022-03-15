export const getCurrentVendor = () => {
    return fetch(`http://localhost:8000/vendors/profile`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
        .then(res => res.json())
}

export const getHost = (id) => {
    return fetch(`http://localhost:8000/hosts/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
        .then(res => res.json())
}