export const loginUser = (user) => {
  return fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  }).then(res => res.json())
}

export const registerVendor = (newVendor) => {
  return fetch("http://127.0.0.1:8000/registervendor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newVendor)
  }).then(res => res.json())
}

export const registerHost = (newHost) => {
  return fetch("http://127.0.0.1:8000/registerhost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newHost)
  }).then(res => res.json())
}

export const getWeddingSizes = () => {
  return fetch("http://localhost:8000/weddingsizes")
      .then(res => res.json())
}

export const getVendorTypes = () => {
  return fetch("http://localhost:8000/vendortypes")
      .then(res => res.json())
}
