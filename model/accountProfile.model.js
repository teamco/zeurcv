import {allowModel} from './methods';
import {denyModel} from './methods';

/**
 * @instance accountProfile
 * @type {Mongo.Collection}
 */
export const accountProfile = allowModel(denyModel(new Mongo.Collection('account_profile')));