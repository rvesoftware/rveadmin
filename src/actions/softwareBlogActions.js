import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const softwareBlogConstants =  new constantsTemplate("BLOG_SOFTWARE");
const softwareBlogActions = new actionsTemplate(softwareBlogConstants.constants(), "softwarePosts");

export default softwareBlogActions;
