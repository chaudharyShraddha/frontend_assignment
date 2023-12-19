import dispatcher from "../dispatcher/dispatcher";

export enum ActionTypes {
    EDIT_PLAYER = 'EDIT_PLAYER',
    ADD_PLAYER = 'ADD_PLAYER',
  }
  
  export type EditPlayerAction = {
    type: ActionTypes.EDIT_PLAYER;
    payload: {
      gameIndex: number;
      teamIndex: number;
      playerIndex: number;
      newName: string;
      newAge: number;
    };
  };
  
  export type AddPlayerAction = {
    type: ActionTypes.ADD_PLAYER;
    payload: {
      gameIndex: number;
      teamIndex: number;
      playerName: string;
      playerAge: number;
    };
  };
  
  export type Action = EditPlayerAction | AddPlayerAction | any;
  
  export const editPlayer = (
    gameIndex: number,
    teamIndex: number,
    playerIndex: number,
    newName: string,
    newAge: number
  ) => {
    dispatcher.dispatch({
      type: ActionTypes.EDIT_PLAYER,
      payload: { gameIndex, teamIndex, playerIndex, newName, newAge },
    })
  };
  
  export const addPlayer = (
    gameIndex: number,
    teamIndex: number,
    playerName: string,
    playerAge: number
  ) => {
    dispatcher.dispatch({
      type: ActionTypes.ADD_PLAYER,
      payload: { gameIndex, teamIndex, playerName, playerAge },
    })
  };