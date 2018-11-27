FlowRouter.route('/events', {
  action: () => BlazeLayout.render('adminLayout', {content: 'eventsData'}),
  name: 'events manager'
});

FlowRouter.route('/events/:id', {
  action: () => {
    const id = FlowRouter.getParam('id');
    const content = id === 'new' ? 'eventDataNew' : 'eventData';
    BlazeLayout.render('adminLayout', {content: content});
  },
  name: 'event'
});