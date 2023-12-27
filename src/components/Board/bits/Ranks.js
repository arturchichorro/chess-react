import { useAppContext } from '../../../contexts/Context';
import './Ranks.css';

const Ranks = ({ ranks }) => {

    const { appState } = useAppContext();
    // Reverse the array if flipped is true
    const reversedRanks = appState.flipped ? [...ranks].reverse() : ranks;

    return <div className="ranks">
        {reversedRanks.map((rank) => (
            <span key={rank}>{rank}</span>
        ))}
    </div>
}

export default Ranks