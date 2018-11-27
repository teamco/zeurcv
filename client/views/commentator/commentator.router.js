FlowRouter.route('/commentators', {
  action: () => BlazeLayout.render('adminLayout', {content: 'commentatorsData'}),
  name: 'events'
});