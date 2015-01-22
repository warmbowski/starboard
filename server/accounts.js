Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile ? options.profile : {};
  user.profile.presence = 'out';
  user.profile.current_location = null;
  user.profile.subscribed_orgs = [];
  
  return user;
});