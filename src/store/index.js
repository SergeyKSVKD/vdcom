import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "../pages/totalContactsPage/contactsSlice";

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
    devTools: true,
})