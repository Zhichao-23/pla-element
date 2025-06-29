import Header from "./Header.vue";
import Main from "./Main.vue";
import Footer from "./Footer.vue";
import Container from "./Container.vue";
import Aside from "./Aside.vue";
import { withInstall } from "@pla-element/utils";
export const PlaHeader = withInstall(Header);
export const PlaFooter = withInstall(Footer);
export const PlaMain = withInstall(Main);
export const PlaContainer = withInstall(Container);
export const  PlaAside = withInstall(Aside);