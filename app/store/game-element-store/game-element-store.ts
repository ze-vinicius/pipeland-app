import {
  model,
  Model,
  modelFlow,
  _async,
  _await,
  prop,
  getRootStore,
  modelAction,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import { RootStore } from "../root-store/root-store";
import { GameElement } from "./game-element";

@model("pipeland/GameElementsStore")
export class GameElementsStore extends Model({
  gamePenalties: prop<GameElement[]>(() => []),
  gameRewards: prop<GameElement[]>(() => []),
  errorMessage: prop<string | undefined>(),
}) {
  @modelFlow
  fetchGameElements = _async(function* (this: GameElementsStore) {
    try {
      const gameElements = yield* _await(api.getGameElements());

      const penalties: GameElement[] = [];
      const rewards: GameElement[] = [];

      gameElements.forEach((gameElement) => {
        if (gameElement.type === "PENALTY") {
          penalties.push(gameElement);
        } else if (gameElement.type === "REWARD") {
          rewards.push(gameElement);
        }
      });

      this.gameRewards = rewards;
      this.gamePenalties = penalties;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }

      if (error.status === 401 || error.response.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }
    } finally {
      // this.isLoading.classes = false;
    }
  });
}