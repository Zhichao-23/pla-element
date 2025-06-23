import { withInstall } from "@pla-element/utils";
import Form from "./Form.vue";
import Input from "./Input/Input.vue";

const PlaForm = withInstall(Form)
const PlaInput = withInstall(Input)

export {
    PlaForm,
    PlaInput,
}