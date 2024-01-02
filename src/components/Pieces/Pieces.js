import './Pieces.css';
import Piece from './Piece';
import { useRef, useState } from 'react';
import arbiter from '../../arbiter/arbiter';
import { getNewMoveNotation } from '../../helper';
import { clearCandidates, makeNewMove } from '../../reducer/actions/move';
import { useAppContext } from '../../contexts/Context';
import { openPromotion } from '../../reducer/actions/popup';
import { getCastleDirections } from '../../arbiter/getMoves';
import { detectStalemate, detectInsufficient, detectCheckmate, detectRepetition } from '../../reducer/actions/game';

const Pieces = () => {

    const ref = useRef();
    const [highligtedTiles, sethighligtedTiles] = useState([]);

    const { appState, dispatch } = useAppContext();

    const currentPosition = appState.game[appState.game.length - 1].position;

    const calculateCoords = e => {
        const { width, left, top, right, bottom } = ref.current.getBoundingClientRect();
        const size = width / 8;
        let x;
        let y;

        if (!appState.flipped) {
            y = Math.floor((e.clientX - left) / size);
            x = 7 - Math.floor((e.clientY - top) / size);
        } else {
            y = -Math.ceil((e.clientX - right) / size);
            x = 7 + Math.ceil((e.clientY - bottom) / size);
        }

        return { x, y };
    }

    const openPromotionBox = ({ rank, file, x, y }) => {
        dispatch(openPromotion({
            rank: Number(rank), file: Number(file), x, y
        }))
    }

    const move = e => {
        const { x, y } = calculateCoords(e);
        const [piece, rank, file] = e.dataTransfer.getData('text').split(',');

        if (appState.candidateMoves.find(m => m[0] === x && m[1] === y)) {

            const opponent = piece.startsWith('b') ? 'w' : 'b';
            const castleDirection = appState.game[appState.game.length - 1].castleDirection[`${piece.startsWith('b') ? 'white' : 'black'}`];

            if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
                openPromotionBox({ rank, file, x, y });
                return;
            }

            const castle = getCastleDirections({
                game: appState.game,
                piece, rank, file
            });

            const newPosition = arbiter.performMove({
                position: currentPosition,
                piece, rank, file,
                x, y
            });

            const gameAfterMove = [
                ...appState.game,
                {
                    position: newPosition,
                    castleDirection: castle
                }
            ]

            const newMove = getNewMoveNotation({
                piece, rank, file, x, y, position: currentPosition
            });

            dispatch(makeNewMove({ newPosition, castle, newMove }));

            if (arbiter.insufficientMaterial(newPosition)) {
                dispatch(detectInsufficient());
            } else if (arbiter.isStalemate(newPosition, opponent, castleDirection)) {
                dispatch(detectStalemate());
            } else if (arbiter.isCheckmate(newPosition, opponent, castleDirection)) {
                dispatch(detectCheckmate(piece[0]));
            } else if (arbiter.isRepetition(gameAfterMove)) {
                dispatch(detectRepetition());
            }
        }
        dispatch(clearCandidates());

    }

    const onDrop = e => {
        e.preventDefault();

        move(e);
        removeHighlights();
    }

    const onDragOver = e => e.preventDefault();

    const onRightClick = e => {
        e.preventDefault();
        const tempTiles = highligtedTiles;
        const { x, y } = calculateCoords(e);
        const tileNum = Math.abs(7 - x) * 8 + y;
        const color = (tileNum - Math.abs(7 - x)) % 2 === 0 ? "light" : "dark";
        let tile;

        if (e.target.classList.contains("pieces")) {
            tile = e.target.offsetParent.children[1].children[tileNum];

        } else {
            tile = e.target.offsetParent.offsetParent.children[1].children[tileNum];
        }

        tile.classList.toggle(`click-highlight-${color}`);
        if (!tempTiles.includes(tile)) {
            tempTiles.push(tile);
            sethighligtedTiles(tempTiles);
        }
    }

    const removeHighlights = () => {
        highligtedTiles.forEach((tile) => {
            tile.classList.remove("click-highlight-dark");
            tile.classList.remove("click-highlight-light");
        })
        sethighligtedTiles([]);
    }

    const onClick = (e) => {
        removeHighlights();
    }

    return (
        <div
            ref={ref}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onContextMenu={onRightClick}
            onClick={onClick}
            className={`pieces ${appState.flipped ? "pieces-flipped" : ""}`}
        >
            {currentPosition.map((r, rank) =>
                r.map((f, file) =>
                    currentPosition[rank][file]
                        ? <Piece
                            key={rank + '-' + file}
                            rank={rank}
                            file={file}
                            piece={currentPosition[rank][file]}
                        />
                        : null
                ))}
        </div>
    )


}

export default Pieces;