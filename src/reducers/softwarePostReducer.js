import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const softwareBlogConstants = new constantsTemplate("BLOG_SOFTWARE");
const softwareBlogReducer = new reducerTemplate(softwareBlogConstants.constants());

export default softwareBlogReducer;