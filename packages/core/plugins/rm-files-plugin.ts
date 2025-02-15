import { each } from "lodash-es";
import shell from "shelljs";
import toHookPlugin from "./toHookPlugin";

interface Parms {
	files: string[];
}

const rmFiles = (parms: Parms) => {
	each(parms.files, (name) => {
		shell.rm("-rf", name);
	});
};

const rmFilesPlugin = toHookPlugin(rmFiles, "rm-files-plugin", "start");

export default rmFilesPlugin;
