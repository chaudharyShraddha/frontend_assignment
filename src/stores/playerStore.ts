import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";
import { ActionTypes, Action } from "../actions/actions";
import { Game } from "../types/types";
import axios from "axios";

class PlayerStore extends EventEmitter {
  private data: Game[] = [];

  constructor() {
    super();
    this.fetchInitialData();
    dispatcher.register(this.handleActions.bind(this));
  }

  fetchInitialData() {
    axios
      .get<Game[]>("https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e")
      .then((response) => {
        this.data = response.data;
        this.emit("change");
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
      });
  }

  handleActions(action: Action) {
    switch (action.type) {
      case ActionTypes.ADD_PLAYER: {
        const { gameIndex, teamIndex, playerName, playerAge } = action.payload;
        const newPlayer = { name: playerName, age: playerAge };

        if (this.data[gameIndex] && this.data[gameIndex].teams[teamIndex]) {
          this.data[gameIndex].teams[teamIndex].players.unshift(newPlayer);
          this.emit("change");
        }
        break;
      }
      case ActionTypes.EDIT_PLAYER: {
        const { gameIndex, teamIndex, playerIndex, newName, newAge } =
          action.payload;
        const newData = [...this.data];
        newData[gameIndex].teams[teamIndex].players[playerIndex] = {
          name: newName,
          age: newAge,
        };
        this.data = newData;
        this.emit("change");
        break;
      }
      default:
    }
  }

  getData(): Game[] {
    return this.data;
  }
}

const playerStore = new PlayerStore();
export default playerStore;
