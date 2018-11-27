FlowRouter.route('/sessions/start/:id', {
  action: () => {
    BlazeLayout.render('adminLayout', {content: 'sessionStart'});
  },
  name: 'session'
});