import { jwtDecode } from "jwt-decode"

export default function getRoleORImageOREmailORId(number) {
    let data = null
    let token = localStorage.getItem('access_token')
    if (token) {
        data = jwtDecode(token)
    }
    if (number == 1) {
        return data?.role;
    }
    else if (number == 2) {
        return data?.image;
    }
    else if (3) {
        return data?.sub
    }
    else if (4) {
        return data?.id
    }
}



