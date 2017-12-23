/**
 * @method getParamId
 * @param type
 */
export const getParamId = type => FlowRouter.current().params[type];

/**
 * @method isSingularized
 * @param str
 */
export const isSingularized = (str) => pluralize(str, 1) === str;

/**
 * @method modelName
 */
export const modelName = () => FlowRouter.current().route.name;

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