import {withInstall} from "@pla-element/utils"
import Tree from "./tree.vue"
import TreeNode from "./tree-node.vue"
const PlaTree = withInstall(Tree)
const PlaTreeNode = withInstall(TreeNode)

export {
	PlaTree,
	PlaTreeNode
}