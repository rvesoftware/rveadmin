import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const blogConstants =  new constantsTemplate("BLOG");
const blogActions = new actionsTemplate(blogConstants.constants(), "hardwarePosts");

export default blogActions;

// console.log(blogActions.listItems())
// console.log(blogActions)