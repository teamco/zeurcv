import {allowModel} from './methods';

/**
 * @instance events
 * @type {Mongo.Collection}
 */
export const products = allowModel(new Mongo.Collection('products'));