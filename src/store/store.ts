import { configureStore } from "@reduxjs/toolkit";
import volumeState from "./reducers/volumeSlice";
import fullscreenState from "./reducers/fullscreenSlice";

const store = configureStore({
    reducer: {
        volumeState,
        fullscreenState,
    }
});
 
export type RootState = ReturnType<typeof store.getState>;
export default store;