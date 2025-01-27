<script setup lang="ts">
import { ref } from "vue";
import PlaCollapse from "../../components/Collapse/Collapse.vue";
import PlaCollapseItem from "../../components/Collapse/CollapseItem.vue";
import PlaButton from "../../components/Button/Button.vue";
const activeNames = ref<string[]>([]);
const handleUpdate = (newActiveNames: string[] | string) => {
	console.log(newActiveNames);
	activeNames.value = newActiveNames as string[];
};
</script>

<template>
	<pla-collapse
		:modelValue="activeNames"
		@update:modelValue="handleUpdate"
		@change="console.log('abc')"
	>
		<pla-collapse-item name="a" title="a">
			<template #default>
				<div>content a</div>
			</template>
		</pla-collapse-item>
		<pla-collapse-item name="b" title="c">
			<template #default>
				<div>content b</div>
				<div>sahdohasdohsaiodhsaiodnoksacn</div>
				<div>sajpdaspod</div>
			</template>
		</pla-collapse-item>
	</pla-collapse>
	<pla-button loading></pla-button>
</template>
