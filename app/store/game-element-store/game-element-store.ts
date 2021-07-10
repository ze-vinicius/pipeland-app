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
import utils from "../../utils";
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
      if (__DEV__) {
        console.log(error);
      }

      const err = utils.handleResponseError(error);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }
    } finally {
      // this.isLoading.classes = false;
    }
  });
}
