import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logoutUser: (state, action) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer