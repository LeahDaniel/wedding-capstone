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

export const getHostThreads = () => {
    return fetch(`http://localhost:8000/messages/hostthreads`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
        .then(res => res.json())
}


export const getMessages = (hostId, vendorId) => {
    return fetch(`http://localhost:8000/messages?host=${hostId}&vendor=${vendorId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
        .then(res => res.json())
}

export const createMessage = (message) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        },
        body: JSON.stringify(message)
    }
    return fetch(`http://localhost:8000/messages`, fetchOptions)
        .then((res) => res.json())
}



export const getHostVendorByStakeholders = (hostId, vendorId) => {
    return fetch(`http://localhost:8000/hostvendors/contract?host=${hostId}&vendor=${vendorId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
        .then(res => res.json())
}

export const getHostVendor = (hostVendorId) => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
        .then(res => res.json())
}

export const deleteHostVendor = hostVendorId => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
};


export const fireHostVendor = (hostVendorId) => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}/fire`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        }
    })
        .then(() => getHostVendor(hostVendorId))
}

export const quoteHostVendor = (hostVendorId, costPerHour) => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}/quote`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        },
        body: JSON.stringify({"cost_per_hour": costPerHour})
    })
        .then(() => getHostVendor(hostVendorId))
}


export const updateCurrentVendor = (newVendor) => {
    return fetch(`http://localhost:8000/vendors/updatebusiness`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("vendor_token")}`
        },
        body: JSON.stringify(newVendor)
    })
        .then(() => getCurrentVendor())
}
