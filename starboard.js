Organizations = new Meteor.Collection('organizations')
Locations = new Meteor.Collection('locations');
People = new Meteor.Collection('people');

if (Meteor.isClient) {
	Session.setDefault("enable_edit",false)
	
	Template.OrganizationsList.helpers({
		organization: function(){
			return Organizations.find().fetch();
		}
	});

	Template.LocationsList.helpers({
		location: function(){
			return Locations.find().fetch();
		}
	});

	Template.OrganizationsList.events({
		'submit form': function(e, tmpl){
			e.preventDefault();
			
			var org_name = tmpl.find('input').value;
			
			Organizations.insert({organization_name: org_name, created_at: new Date});
			
			var form = tmpl.find('form');
			form.reset();
		}
	});

	Template.LocationsList.events({
		'submit form': function(e, tmpl){
			e.preventDefault();
			
			var loc_name = tmpl.find('input').value;
			
			Locations.insert({location_name: loc_name, created_at: new Date});
			
			var form = tmpl.find('form');
			form.reset();
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
