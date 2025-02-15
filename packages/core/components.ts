import type { Plugin } from "vue";

import { PlaIcon } from "@pla-element/components";
import { PlaButton } from "@pla-element/components";
import { PlaButtonGroup } from "@pla-element/components";
import { PlaCollapse } from "@pla-element/components";
import { PlaCollapseItem } from "@pla-element/components";
import { PlaAlert } from "@pla-element/components";

export default [
	PlaButton,
	PlaIcon,
	PlaButtonGroup,
	PlaCollapseItem,
	PlaCollapse,
	PlaAlert,
] as Plugin[];
