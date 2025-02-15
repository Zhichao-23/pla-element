const toHookPlugin = <T extends (...args: any[]) => any>(
	task: T,
	pluginName: string,
	flag: "start" | "end" | "close"
) => {
	if (flag == "start") {
		return (...args: Parameters<T>) => {
			return {
				name: pluginName,
				buildStart: () => {
					task(...args);
				},
			};
		};
	} else if (flag == "end") {
		return (...args: Parameters<T>) => {
			return {
				name: pluginName,
				buildEnd: () => {
					task(...args);
				},
			};
		};
	} else {
		return (...args: Parameters<T>) => {
			return {
				name: pluginName,
				closeBundle: () => {
					task(...args);
				},
			};
		};
	}
};

export default toHookPlugin;
