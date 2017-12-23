function checkLoggedIn(ctx, redirect) {
  if (!Meteor.userId()) {
    redirect('/');
  }
}

const privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [
    checkLoggedIn
  ]
});

/**
 * @method _baseRenderer
 * @param content
 * @private
 */
function _adminRenderer(content) {
  return () => BlazeLayout.render('adminLayout', {content: content});
}

const routes = {
  base: {
    one: () => ({action: _adminRenderer('adminDashboard'), name: 'dashboard'}),
    url: '/dashboard'
  },
  errors: {
    all: () => ({action: _adminRenderer('errorLogsData'), name: 'errorLogs'}),
    one: () => ({action: _adminRenderer('errorLogData'), name: 'errorLogs'}),
    url: '/dashboard/errors'
  },
  logs: {
    all: () => ({action: _adminRenderer('userLogsData'), name: 'userLogs'}),
    one: () => ({action: _adminRenderer('userLogData'), name: 'userLogs'}),
    url: '/dashboard/logs'
  },
  tracking: {
    all: () => ({action: _adminRenderer('trackingLogsData'), name: 'trackingLogs'}),
    one: () => ({action: _adminRenderer('trackingLogData'), name: 'trackingLogs'}),
    url: '/dashboard/tracking'
  },
  users: {
    all: () => ({action: _adminRenderer('usersData'), name: 'users'}),
    one: () => ({action: _adminRenderer('editUser'), name: 'users'}),
    url: '/dashboard/users'
  }
};

// Base
privateRoutes.route(routes.base.url, routes.base.one());

// Errors
privateRoutes.route(routes.errors.url, routes.errors.all());
privateRoutes.route(routes.errors.url + '/:errorId', routes.errors.one());
privateRoutes.route(routes.users.url + '/:userId/errors', routes.errors.all());
privateRoutes.route(routes.users.url + '/:userId/errors/:errorId', routes.errors.one());

// Logs
privateRoutes.route(routes.logs.url, routes.logs.all());
privateRoutes.route(routes.logs.url + '/:logId', routes.logs.one());
privateRoutes.route(routes.users.url + '/:userId/logs', routes.logs.all());
privateRoutes.route(routes.users.url + '/:userId/logs/:logId', routes.logs.one());

// Users
privateRoutes.route(routes.users.url, routes.users.all());
privateRoutes.route(routes.users.url + '/:userId', routes.users.one());

// Tracking
privateRoutes.route(routes.tracking.url, routes.tracking.all());
privateRoutes.route(routes.tracking.url + '/:trackingId', routes.tracking.one());
privateRoutes.route(routes.users.url + '/:userId/tracking', routes.tracking.all());
privateRoutes.route(routes.users.url + '/:userId/tracking/:trackingId', routes.tracking.one());