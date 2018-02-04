import {isAdmin} from '../../../../../lib/users';

Template.navLinks.helpers({

  /**
   * @method managedByAdmin
   * @returns {boolean}
   */
  managedByAdmin: () => isAdmin(),

  /**
   * @property adminMenuItems
   */
  adminMenuItems: [
    {path: '/dashboard/users', icon: 'user', label: 'User management'},
    {path: '/dashboard/logs', icon: 'list', label: 'User logs'},
    {path: '/dashboard/errors', icon: 'exclamation-circle', label: 'Error logs'},
    {path: '/dashboard/tracking', icon: 'history', label: 'Tracking logs'},
    {path: '/dashboard/setting-actions', icon: 'cog', label: 'Setting actions'},
    {path: '/dashboard/templates', icon: 'paper-plane', label: 'Templates'}
  ]
});