import { useAppContext } from '../../contexts/Context';
import arbiter from '../../arbiter/arbiter';
import { generateCandidateMoves } from '../../reducer/actions/move';

const Piece = ({
    file,
    rank,
    piece,
}) => {

    const { appState, dispatch } = useAppContext();
    const { turn, game: currentGame } = appState;

    const onDragStart = e => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);

        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);

        if (turn === piece[0]) {
            const candidateMoves = arbiter.getValidMoves({
                position: currentGame[currentGame.length - 1].position,
                prevPosition: currentGame.length > 1 ? currentGame[currentGame.length - 2].position : currentGame[currentGame.length - 1].position,
                castleDirection: currentGame[currentGame.length - 1].castleDirection[turn],
                piece,
                file,
                rank
            });
            dispatch(generateCandidateMoves({ candidateMoves }));
        }
    }

    const onDragEnd = e => {
        e.target.style.display = 'block';
    }


    return (
        <div
            className={`piece ${piece} p-${file}${rank} ${appState.flipped ? "p-flipped" : ""}`}
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        />
    )
}

export default Piece;