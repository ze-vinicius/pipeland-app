import { model, Model, registerRootStore, prop } from "mobx-keystone";
import { ClassesStore } from "../classes-store/classes-store";
import { GameElementsStore } from "../game-element-store/game-element-store";
import { SessionsStore } from "../sessions-store/sessions-store";

// setGlobalConfig({
//   modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
// });

@model("pipeland/RootStore")
export class RootStore extends Model({
  classesStore: prop<ClassesStore>(() => new ClassesStore({})),
  sessionsStore: prop<SessionsStore>(() => new SessionsStore({})),
  gameElementsStore: prop<GameElementsStore>(() => new GameElementsStore({})),
}) {}

export function createRootStore(): RootStore {
  const rootStore = new RootStore({});

  registerRootStore(rootStore);

  rootStore.sessionsStore.loadSessionInfo();

  rootStore.gameElementsStore.fetchGameElements();

  // const remotedev = require("remotedev");

  // const connection = remotedev.connectViaExtension({
  //   name: "Pipeland App",
  // });

  // connectReduxDevTools(remotedev, connection, rootStore);

  return rootStore;
}
