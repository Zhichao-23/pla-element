import { makeInstaller } from "@pla-element/utils";
import components from "./components";
import "@pla-element/theme/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

const installer = makeInstaller(components);
library.add(fas);

export default installer;
export * from "../components";
