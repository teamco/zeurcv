import {events} from '../../model/events.model';

Meteor.publish('events', () => events.find());