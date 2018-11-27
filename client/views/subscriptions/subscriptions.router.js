FlowRouter.route('/subscriptions', {
  action: () => BlazeLayout.render('adminLayout', {content: 'subscriptionsData'}),
  name: 'subscriptions'
});
