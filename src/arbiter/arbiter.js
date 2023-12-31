import { getRookMoves, getKnightMoves, getBishopMoves, getQueenMoves, getKingMoves, getPawnMoves, getPawnCaptures, getCastlingMoves, getKingPosition, getPieces } from "./getMoves";
import { movePawn, movePiece } from "./move";
import { findPieceCoords, areSameColorTiles } from "../helper";

const arbiter = {
    getRegularMoves: function ({ position, piece, rank, file }) {
        if (piece.endsWith('r')) {
            return getRookMoves({ position, piece, rank, file });
        }
        if (piece.endsWith('n')) {
            return getKnightMoves({ position, rank, file });
        }
        if (piece.endsWith('b')) {
            return getBishopMoves({ position, piece, rank, file });
        }
        if (piece.endsWith('q')) {
            return getQueenMoves({ position, piece, rank, file });
        }
        if (piece.endsWith('k')) {
            return getKingMoves({ position, piece, rank, file });
        }
        if (piece.endsWith('p')) {
            return getPawnMoves({ position, piece, rank, file });
        }
    },

    getValidMoves: function ({ position, castleDirection, prevPosition, piece, rank, file }) {
        let moves = this.getRegularMoves({ position, piece, rank, file });
        const notInCheckMoves = [];

        if (piece.endsWith('p')) {
            moves = [
                ...moves,
                ...getPawnCaptures({ position, prevPosition, piece, rank, file })
            ]
        }
        if (piece.endsWith('k')) {
            moves = [
                ...moves,
                ...getCastlingMoves({ position, castleDirection, piece, rank, file })
            ]
        }

        moves.forEach(([x, y]) => {

            const positionAfterMove =
                this.performMove({ position, piece, rank, file, x, y });

            if (!this.isPlayerInCheck({ positionAfterMove, position, player: piece[0] })) {
                notInCheckMoves.push([x, y]);
            }
        })
        return notInCheckMoves;
    },

    performMove: function ({ position, piece, rank, file, x, y }) {
        if (piece.endsWith('p')) {
            return movePawn({ position, piece, rank, file, x, y });
        } else {
            return movePiece({ position, piece, rank, file, x, y });
        }
    },

    isPlayerInCheck: function ({ positionAfterMove, position, player }) {
        const enemy = player.startsWith('w') ? 'b' : 'w';
        let kingPos = getKingPosition(positionAfterMove, player);
        const enemyPieces = getPieces(positionAfterMove, enemy);

        const enemyMoves = enemyPieces.reduce((acc, p) => acc = [
            ...acc,
            ...(p.piece.endsWith('p'))
                ? getPawnCaptures({
                    position: positionAfterMove,
                    prevPosition: position,
                    ...p
                })
                : this.getRegularMoves({
                    position: positionAfterMove,
                    ...p
                })
        ], []);

        if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y)) {
            return true;
        } else {
            return false;
        }
    },

    isStalemate: function (position, player, castleDirection) {
        const isInCheck = this.isPlayerInCheck({ positionAfterMove: position, player });
        if (isInCheck) {
            return false;
        }

        const pieces = getPieces(position, player);
        const moves = pieces.reduce((acc, p) => acc = [
            ...acc,
            ...(this.getValidMoves({
                position,
                castleDirection,
                ...p
            }))
        ], [])

        return (!isInCheck && moves.length === 0);
    },

    insufficientMaterial: function (position) {
        const pieces = position.reduce((acc, rank) => acc = [
            ...acc,
            ...rank.filter(x => x)
        ], [])

        if (pieces.length === 2) {
            return true;
        }

        if (pieces.length === 3 && (pieces.some(p => p.endsWith('b') || p.endsWith('n')))) {
            return true;
        }

        if (
            pieces.length === 4 &&
            pieces.every(p => p.endsWith('b') || p.endsWith('k')) &&
            new Set(pieces).size === 4 &&
            areSameColorTiles(
                findPieceCoords(position, 'wb')[0],
                findPieceCoords(position, 'bb')[0]
            )) {
            return true;
        }

        return false;
    },

    isCheckmate: function (position, player, castleDirection) {
        const isInCheck = this.isPlayerInCheck({ positionAfterMove: position, player });
        if (!isInCheck) {
            return false;
        }

        const pieces = getPieces(position, player);
        const moves = pieces.reduce((acc, p) => acc = [
            ...acc,
            ...(this.getValidMoves({
                position,
                castleDirection,
                ...p
            }))
        ], []);

        return (isInCheck && moves.length === 0);
    },

    isRepetition: function (game) {
        let count = 0;
        const currentGame = game[game.length - 1];

        if (game.length < 10) {
            return false;
        }
        for (let i = game.length - 1; i >= 0; i -= 2) {
            if (JSON.stringify(currentGame.position) === JSON.stringify(game[i].position) && JSON.stringify(currentGame.castleDirection) === JSON.stringify(game[i].castleDirection)) {
                count++;
                if (count === 3) {
                    return true;
                }
            }
        }
        return false;
    },

    isFifty: function (game) {
        if (game[game.length - 1].fifty === 100) {
            return true;
        }
        return false;
    }

}

export default arbiter; 