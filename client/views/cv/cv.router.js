FlowRouter.route('/cv', {
  action: () => BlazeLayout.render('adminLayout', {content: 'cv'}),
  name: 'profile'
});

FlowRouter.route('/cv/generate/:profileId/templates', {
  action: () => BlazeLayout.render('adminLayout', {content: 'profileTemplate'}),
  name: 'profileTemplate'
});

FlowRouter.route('/cv/generate/:profileId/templates/:templateId/preview', {
  action: () => BlazeLayout.render('adminLayout', {content: 'cvPreview'}),
  name: 'profilePreview'
});