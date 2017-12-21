Meteor.settings = Meteor.settings || {};

const SETTING = {
  linkedin: {
    client_id: 'clientId',
    client_secret: 'secret'
  },
  google: {
    client_id: 'clientId',
    client_secret: 'secret'
  }
};

for (let index in Meteor.settings) {
  if (Meteor.settings.hasOwnProperty(index) && index !== 'public') {
    let oAuthSetting = {service: index};
    for (let key in SETTING[index]) {
      if (SETTING[index].hasOwnProperty(key)) {
        oAuthSetting[SETTING[index][key]] = Meteor.settings[index][key];
      }
    }
    ServiceConfiguration.configurations.remove({service: index});
    ServiceConfiguration.configurations.insert(oAuthSetting);
  }
}