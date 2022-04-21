import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const softwareBlogConstants =  new constantsTemplate("BLOG_SOFTWARE");
// const softwareBlogActions = new actionsTemplate(softwareBlogConstants.constants(), "", "https://real-vision-api.herokuapp.com/software-posts");
const softwareBlogActions = new actionsTemplate(softwareBlogConstants.constants(), "software-post", "https://real-vision-api.herokuapp.com");

export default softwareBlogActions;
