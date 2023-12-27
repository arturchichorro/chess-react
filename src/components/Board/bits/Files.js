import { useAppContext } from '../../../contexts/Context';
import { getCharacter } from '../../../helper';
import './Files.css';

const Files = ({ files }) => {

    const { appState } = useAppContext();
    // Reverse the files array if flipped is true
    const reversedFiles = appState.flipped ? [...files].reverse() : files;

    return (
        <div className="files">
            {reversedFiles.map((file) => (
                <span key={file}>{getCharacter(file)}</span>
            ))}
        </div>
    );
};

export default Files