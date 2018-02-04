/**
 * @method currentRoute
 */
export const currentRoute = () => FlowRouter.current();

/**
 * @method getParamId
 * @param type
 */
export const getParamId = type => currentRoute().params[type];

/**
 * @method isSingularized
 * @param str
 */
export const isSingularized = (str) => pluralize(str, 1) === str;

/**
 * @method modelName
 */
export const modelName = () => currentRoute().route.name;

/**
 * @method pageTitle
 */
export const pageTitle = () => s.humanize(modelName());

/**
 * @method templateName
 */
export const templateName = () => s.camelize(pluralize(pageTitle(), 2).toLowerCase());

/**
 * @method runTemplateHelper
 * @param template
 * @param method
 */
export const runTemplateHelper = (template, method) => template.__helpers.get(method).call();

/**
 * @method parentTemplateName
 * @return {string}
 */
export const parentTemplateName = () => Template.instance().parentTemplate().view.name.replace(/Template\./, '');