import { createSlice } from "@reduxjs/toolkit";

type isFullscreen = {
    tela: boolean
}

const FullscreenState: isFullscreen = {
    tela: true
}

const fullscreenSlice = createSlice({
    name: 'FullscreenState',
    initialState: FullscreenState,
    reducers: {
        setFullscreen: (state, action) => {
            state.tela = action.payload;
        }
    }
});

export const { setFullscreen } = fullscreenSlice.actions;
export default fullscreenSlice.reducer;