export const getHostVendorByStakeholders = (hostId, vendorId) => {
    return fetch(`http://localhost:8000/hostvendors/contract?host=${hostId}&vendor=${vendorId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const getHostVendor = (hostVendorId) => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const createHostVendor = (hostVendor) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(hostVendor)
    }
    return fetch(`http://localhost:8000/hostvendors`, fetchOptions)
        .then((res) => res.json())
        .then((res) => getHostVendor(res.id))
}

export const deleteHostVendor = hostVendorId => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
};

export const fireHostVendor = (hostVendorId) => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}/fire`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(() => getHostVendor(hostVendorId))
}

export const hireHostVendor = (hostVendorId) => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}/hire`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(() => getHostVendor(hostVendorId))
}

export const quoteHostVendor = (hostVendorId, costPerHour) => {
    return fetch(`http://localhost:8000/hostvendors/${hostVendorId}/quote`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify({ "cost_per_hour": costPerHour })
    })
        .then(() => getHostVendor(hostVendorId))
}