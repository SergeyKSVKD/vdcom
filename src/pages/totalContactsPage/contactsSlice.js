import { createSlice } from '@reduxjs/toolkit'

const contactsSlice = createSlice({
    name: '@@contacts',
    initialState: [],
    reducers: {
        addContacts: (state, action) => {
            state.push(...action.payload)
        },
        deleteContacts: (state, _) => {
            const end = state.length
            state.splice(0, end)
        }
    }
})

export const { addContacts, deleteContacts } = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer