import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    playerList: [{
        name: 'test1',
        position: {
            x: 0,
            y: 0
        },
        direction: 0,
        frameIndex: 0,
        img: 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png'
    }],
};

export interface PlayerPosParam {
    name: string,
    x: number,
    y: number,
    direction: number,
    frameIndex: number,
}

export const playerSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addNewPlayer: (state) => {
            state.playerList.push({
                name: 'newPlayer',
                position: {
                    x: 0,
                    y: 0,
                },
                direction: 0,
                frameIndex: 0,
                img: 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png'
            })
        },
        setPlayerPos: (state, action: PayloadAction<{ data: PlayerPosParam }>) => {
            const {data} = action.payload;
            state.playerList.forEach((player) => {
                if (player.name === data.name) {
                    player.position = {
                        x: data.x,
                        y: data.y
                    }
                    player.direction = data.direction;
                    player.frameIndex = data.frameIndex;
                }
            })
        }
    }
})