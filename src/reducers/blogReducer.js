import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const blogConstants = new constantsTemplate("BLOG");
const blogReducer = new reducerTemplate(blogConstants.constants());

export default blogReducer;