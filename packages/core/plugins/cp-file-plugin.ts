import shell from "shelljs";
import toHookPlugin from "./toHookPlugin";
import { delay } from "lodash-es";

interface Parms {
	from: string;
	to: string;
}

const cpFile = (parms: Parms) => {
	try {
		shell.cp(parms.from, parms.to);
	} catch (err) {
		delay(cpFile, 800);
	}
};

const cpFilePlugin = toHookPlugin(cpFile, "cp-file-plugin", "close");
export default cpFilePlugin;
