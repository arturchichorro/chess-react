import { useAppContext } from '../../../contexts/Context';
import { flip } from '../../../reducer/actions/game';

const Flip = () => {
    const { appState, dispatch } = useAppContext();

    const handleFlip = () => {
        dispatch(flip()); // Example action type

        const newFlippedValue = appState.flipped ? '1' : '-1';
        document.documentElement.style.setProperty('--flipped', newFlippedValue);
    };


    return (
        <div className="flip">
            <button onClick={handleFlip}>Flip</button>
        </div>
    );
}

export default Flip;