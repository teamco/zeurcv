import {isAdmin} from '../../../../../lib/users';

Template.navLinks.helpers({

  /**
   * @method managedByAdmin
   * @returns {boolean}
   */
  managedByAdmin: () => isAdmin()
});