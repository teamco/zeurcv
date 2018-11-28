import {allowModel} from './methods';
import {Mongo} from "meteor/mongo";

/**
 * @instance events
 * @type {Mongo.Collection}
 */
export const products = allowModel(new Mongo.Collection('products'));

export const billingPlans = allowModel(new Mongo.Collection('billing_plans'));

export const vindiciaModel = allowModel(new Mongo.Collection('vindicia_model'));
