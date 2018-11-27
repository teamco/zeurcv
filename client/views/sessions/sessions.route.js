FlowRouter.route('/sessions/start/:id', {
  action: () => {
    BlazeLayout.render('adminLayout', {content: 'sessionStart'});
  },
  name: 'session'
});

FlowRouter.route('/sessions/start/:id/commentators/:commentatorId', {
  action: () => {
    BlazeLayout.render('adminLayout', {content: 'sessionStart'});
  },
  name: 'commented session'
});