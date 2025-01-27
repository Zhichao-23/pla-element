import { makeInstaller } from "@placidity/utils/install";
import components from "./components";
import "@placidity/theme/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

const installer = makeInstaller(components);
library.add(fas);

export default installer;
export * from "../components";
