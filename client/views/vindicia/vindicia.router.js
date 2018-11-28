FlowRouter.route('/vindicia', {
  action: () => BlazeLayout.render('adminLayout', {content: 'vindiciaData'}),
  name: 'vindicia'
});
