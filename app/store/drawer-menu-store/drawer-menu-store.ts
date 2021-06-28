import { model, Model, prop, modelAction } from "mobx-keystone";
import { DrawerMenu } from "./drawer-menu";

@model("pipeland/DrawerMenuStore")
export class DrawerMenuStore extends Model({
  drawerMenu: prop<DrawerMenu>(() => new DrawerMenu({})),
}) {
  @modelAction
  toggleMenu = () => {
    this.drawerMenu.isVisible = !this.drawerMenu.isVisible;
  };
}
