import {combineReducers} from '@reduxjs/toolkit';
import {playerSlice} from "./player/playerSlice";

export const rootReducer = combineReducers({
    player: playerSlice.reducer
});
