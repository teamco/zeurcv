import {allowModel} from './methods';

/**
 * @instance templates
 * @type {Mongo.Collection}
 */
export const templates = allowModel(new Mongo.Collection('templates'));