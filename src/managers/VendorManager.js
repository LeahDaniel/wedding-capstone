export const getVendor = (id) => {
    return fetch(`http://localhost:8000/vendors/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentVendor = () => {
    return fetch(`http://localhost:8000/vendors/profile`, {
        headers: {
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


export const getVendors = (filterObj) => {
    let queryString = ''

    if (filterObj.maxPrice) {
        queryString += `&max_price=${filterObj.maxPrice}`
    }
    if(filterObj.minPrice){
        queryString += `&min_price=${filterObj.minPrice}`
    }
    if(filterObj.rating){
        queryString += `&rating=${filterObj.rating}`
    }

    return fetch(`http://localhost:8000/vendors?type=${filterObj.type}${queryString}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

