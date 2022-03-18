export const createReview = review => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(review)
    }
    return fetch(`http://localhost:8000/reviews`, fetchOptions)
        .then((res) => res.json())
}

export const deleteReview = reviewId => {
    return fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
};

export const editReview = (reviewId, review) => {
    return fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(review)
    })
}
export const editRating = (ratingId, rating) => {
    return fetch(`http://localhost:8000/ratings/${ratingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(rating)
    })
}

export const createRating = rating => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        },
        body: JSON.stringify(rating)
    }
    return fetch(`http://localhost:8000/ratings`, fetchOptions)
        .then((res) => res.json())
}

export const getRating = (vendorId) => {
    return fetch(`http://localhost:8000/ratings/${vendorId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}

export const getReview = (vendorId) => {
    return fetch(`http://localhost:8000/reviews/${vendorId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wedding_token")}`
        }
    })
        .then(res => res.json())
}