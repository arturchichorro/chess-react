import { useAppContext } from '../../../contexts/Context';
import { copyPosition, getNewMoveNotation } from '../../../helper';
import { clearCandidates, makeNewMove } from '../../../reducer/actions/move';
import './PromotionBox.css';

const PromotionBox = ({ onClosePopup }) => {

    const { appState, dispatch } = useAppContext();
    const { promotionSquare } = appState;

    if (!promotionSquare) {
        return null;
    }

    const options = ['q', 'r', 'b', 'n'];
    const color = promotionSquare.x === 7 ? 'w' : 'b';

    const getPromotionBoxPosition = () => {
        const style = {};

        if (promotionSquare.x === 7) {
            style.top = '0%';
        } else {
            style.top = '50%';
        }

        style.left = `${12.5 * promotionSquare.y}%`

        return style;
    }

    const onClick = option => {
        onClosePopup();
    
        const currentGameState = appState.game[appState.game.length - 1];
        const newPosition = copyPosition(currentGameState.position);
    
        newPosition[promotionSquare.rank][promotionSquare.file] = '';
        newPosition[promotionSquare.x][promotionSquare.y] = color + option;
    
        const newMove = getNewMoveNotation({
            ...promotionSquare,
            piece: color + 'p',
            promotesTo: option,
            position: currentGameState.position // Again, from the current game state
        });
    
        dispatch(clearCandidates());
    
        dispatch(makeNewMove({ newPosition, newMove }));
    };

    return (
        <div className='popup-promotion promotion-choices' style={getPromotionBoxPosition()}>
            {options.map(option =>
                <div
                    key={option}
                    className={`piece ${color}${option}`}
                    onClick={() => onClick(option)}>
                </div>
            )}
        </div>
    )
}

export default PromotionBox;