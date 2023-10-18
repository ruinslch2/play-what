import {Dispatch} from '@reduxjs/toolkit';
import {PlayerPosParam, playerSlice} from './playerSlice';

const actions = playerSlice.actions;

export const addNewPlayer = (dispatch: Dispatch) => {
    dispatch(actions.addNewPlayer());
    return true;
}

export const setPlayerPos = (params: PlayerPosParam) => async (dispatch: Dispatch,) => {
    console.log('x: ', params.x)
    const data = {
        x: params.x,
        y: params.y,
        name: params.name,
        direction: params.direction,
        frameIndex: params.frameIndex
    }
    dispatch(actions.setPlayerPos({data}))
}