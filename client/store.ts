import { configureStore, createSlice } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => action.payload,
        clearUser: () => null,
    },
})

export const { setUser, clearUser } = userSlice.actions

const makeStore = () =>
    configureStore({
        reducer: {
            user: userSlice.reducer,
        },
    })

export const wrapper = createWrapper(makeStore)
