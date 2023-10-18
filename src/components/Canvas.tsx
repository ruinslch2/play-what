import {useCallback, useEffect, useRef, useState} from "react";
import {shallowEqual, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import * as playerAction from '../redux/player/playerAction';

const SCALE = 2;
const WIDTH = 16;
const HEIGHT = 18;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;

interface MoveAction {
    [key: string]: boolean
}

interface PlayerListType {
    name: string,
    position: {
        x: number,
        y: number
    },
    img: string
};

export const useShallowEqualSelector: TypedUseSelectorHook<RootState> = (
    selector
) => {
    return useSelector(selector, shallowEqual);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Canvas = (props: any) => {
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // const keyPresses = useState<MoveAction>();
    const keyPresses: MoveAction = {};
    const {playerList} = useShallowEqualSelector(state => state.player)

    const playerPos = useRef(playerList)

    useEffect(() => {
        if (playerPos.current !== playerList) {
            playerPos.current = playerList
        }
    }, [playerList]);


    const gameLoop = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const MOVEMENT_SPEED = 0.5;

        playerPos.current.forEach(player => {
            let positionX = 0;
            let positionY = 0;
            positionX = player.position.x
            positionY = player.position.y
            if (keyPresses.w) {
                positionY -= MOVEMENT_SPEED;
            } else if (keyPresses.s) {
                positionY += MOVEMENT_SPEED;
            }
            if (keyPresses.a) {
                positionX -= MOVEMENT_SPEED;
            } else if (keyPresses.d) {
                positionX += MOVEMENT_SPEED;
            }
            dispatch(playerAction.setPlayerPos({x: positionX, y: positionY, name: 'test1'}));
            drawFrame(0, 0, positionX, positionY, player.img, ctx);
        })

        window.requestAnimationFrame(() => gameLoop(ctx, canvas));
    }, [])


    function drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number, imgSrc: string, ctx: CanvasRenderingContext2D) {
        let img = new Image();
        img.src = imgSrc;

        ctx.drawImage(img,
            frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
            canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
    }

    useEffect(() => {

        let canvas = canvasRef.current;
        let ctx: CanvasRenderingContext2D | null;
        if (canvas) {
            ctx = canvas.getContext('2d');
            if (ctx)
                gameLoop(ctx, canvas)
        }

        window.addEventListener('keydown', keyDownListener);
        function keyDownListener(event: KeyboardEvent) {
            keyPresses[event.key] = true;
        }

        window.addEventListener('keyup', keyUpListener);

        function keyUpListener(event: KeyboardEvent) {
            keyPresses[event.key] = false;
        }


    }, [canvasRef.current])


    return <canvas className={'border border-black'} ref={canvasRef} {...props} />
}

export default Canvas;