FlowRouter.route('/commentators', {
  action: () => BlazeLayout.render('adminLayout', {content: 'commentatorsData'}),
  name: 'commentators'
});

FlowRouter.route('/commentators/:id', {
  action: () => {
    BlazeLayout.render('adminLayout', {content: 'commentatorData'});
  },
  name: 'commentator'
});