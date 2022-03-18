import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const productConstants = new constantsTemplate("PRODUCT");
const productReducer = new reducerTemplate(productConstants.constants());

console.log(productReducer)

export default productReducer;