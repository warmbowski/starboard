Meteor.publish("organizationData", function () {
  if(!this.userId) return null;
  return Organizations.find();
});

Meteor.publish("locationData", function () {
  if(!this.userId) return null;
  return Locations.find();
});

Meteor.publish("allUserData", function () {
  if(!this.userId) return null;
  return Meteor.users.find({}, {fields: {
        '_id': true,
        'emails': true,
      'profile': true,
  }});
});