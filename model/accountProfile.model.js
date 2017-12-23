import {allowModel} from './methods';
import {denyModel} from './methods';

/**
 * @instance accountProfile
 * @type {Mongo.Collection}
 */
export const accountProfile = new Mongo.Collection('account_profile');

allowModel(accountProfile);
denyModel(accountProfile);