import { initGameState } from "../../constants"
import actionTypes from "../actionTypes"

export const detectStalemate = () => {
    return {
        type: actionTypes.STALEMATE,
    }
}

export const setupNewGame = () => {
    return {
        type: actionTypes.NEW_GAME,
        payload: initGameState
    }
}

export const detectInsufficient = () => {
    return {
        type: actionTypes.INSUFFICIENT_MATERIAL,
    }
}

export const detectCheckmate = winner => {
    return {
        type: actionTypes.WIN,
        payload: winner
    }
}

export const flip = () => {
    return {
        type: actionTypes.FLIP,
    }
}