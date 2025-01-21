import { makeInstaller } from "@placidity/utils/install";
import components from "./components";
import "@placidity/theme/index.css";

const installer = makeInstaller(components);

export default installer;
export * from "@placidity/components";
