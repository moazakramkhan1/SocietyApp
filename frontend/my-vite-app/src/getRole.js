import { jwtDecode } from "jwt-decode"

export function getRole() {
    let data = null
    let token = localStorage.getItem('access_token')
    if (token) {
        data = jwtDecode(token)
    }
    return data?.role;
}

