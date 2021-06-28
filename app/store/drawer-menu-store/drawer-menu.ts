import { model, Model, tProp, types, ExtendedModel, prop } from "mobx-keystone";
import { FeatherIconType } from "../../utils/icon-type";

@model("pipeland/DrawerMenuItem")
export class DrawerMenuItem extends Model({
  title: prop<string>(),
  icon: prop<FeatherIconType>(),
  route: prop<string>(),
}) {}

@model("pipeland/DrawerMenu")
export class DrawerMenu extends Model({
  isVisible: prop<boolean>(false),
  menuItems: prop<DrawerMenuItem[]>(() => {
    return [
      new DrawerMenuItem({
        title: "Minhas turmas",
        route: "classes",
        icon: "heart",
      }),
      new DrawerMenuItem({
        title: "Configurações",
        route: "settings",
        icon: "settings",
      }),
      new DrawerMenuItem({
        title: "Sobre o jogo",
        route: "about",
        icon: "help-circle",
      }),
    ];
  }),
}) {}
