import { model, Model, registerRootStore, prop } from "mobx-keystone";
import { ClassesStore } from "../classes-store/classes-store";
import { SessionsStore } from "../sessions-store/sessions-store";

// setGlobalConfig({
//   modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
// });

@model("pipeland/RootStore")
export class RootStore extends Model({
  classesStore: prop<ClassesStore>(() => new ClassesStore({})),
  sessionsStore: prop<SessionsStore>(() => new SessionsStore({})),
}) {}

export function createRootStore(): RootStore {
  const rootStore = new RootStore({});

  registerRootStore(rootStore);

  rootStore.sessionsStore.loadSessionInfo();

  // const remotedev = require("remotedev");

  // const connection = remotedev.connectViaExtension({
  //   name: "Pipeland App",
  // });

  // connectReduxDevTools(remotedev, connection, rootStore);

  return rootStore;
}
