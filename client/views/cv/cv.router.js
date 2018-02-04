FlowRouter.route('/cv', {
  action: () => BlazeLayout.render('adminLayout', {content: 'cv'}),
  name: 'profile'
});

FlowRouter.route('/cv/generate/:profileId/preview', {
  action: () => BlazeLayout.render('adminLayout', {content: 'cvTemplate'}),
  name: 'profileTemplate'
});

FlowRouter.route('/cv/generate/:profileId/:templateId/preview', {
  action: () => BlazeLayout.render('adminLayout', {content: 'cvPreview'}),
  name: 'profilePreview'
});