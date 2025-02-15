import shell from "shelljs";
import toHookPlugin from "./toHookPlugin";
interface Prams {
	from: string;
	to: string;
}
const mvFiles = (prams: Prams) => {
	shell.mv(prams.from, prams.to);
};

const mvFilesPlugin = toHookPlugin(mvFiles, "mv-files-plugin", "close");
export default mvFilesPlugin;
