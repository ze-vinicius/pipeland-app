import {
  connectReduxDevTools,
  model,
  Model,
  registerRootStore,
  tProp,
  types,
  ModelAutoTypeCheckingMode,
  setGlobalConfig,
} from "mobx-keystone";
import { ClassesStore } from "../classes-store/classes-store";
import { SessionsStore } from "../sessions-store/sessions-store";

setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
});

@model("pipeland/RootStore")
export class RootStore extends Model({
  classesStore: tProp(types.model(ClassesStore), () => new ClassesStore({})),
  sessionsStore: tProp(types.model(SessionsStore), () => new SessionsStore({})),
}) {}

export function createRootStore(): RootStore {
  const rootStore = new RootStore({});

  registerRootStore(rootStore);

  // const remotedev = require("remotedev");

  // const connection = remotedev.connectViaExtension({
  //   name: "Pipeland App",
  // });

  // connectReduxDevTools(remotedev, connection, rootStore);

  return rootStore;
}
