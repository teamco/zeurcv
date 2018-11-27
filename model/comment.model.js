import {allowModel} from './methods';

export const comments = allowModel(new Mongo.Collection('comments'));

