Organizations = new Meteor.Collection('organizations')
Locations = new Meteor.Collection('locations');
People = new Meteor.Collection('people');

if (Meteor.isClient) {
	Session.setDefault("enable_edit",false)
	
	Template.OrganizationSelect.helpers({
		organization: function(){
			return Organizations.find().fetch();
		}
	});

	Template.LocationsList.helpers({
		location: function(){
			return Locations.find().fetch();
		}
	});

	Template.OrganizationSelect.events({
		'submit form': function(e, tmpl){
			e.preventDefault();
			
			var org_name = tmpl.find('select').value;
			
			Organizations.insert({org_name: organization_name, created_at: new Date});
			
			var form = tmpl.find('form');
			form.reset();
		}
	});

	Template.LocationsList.events({
		'submit form': function(e, tmpl){
			e.preventDefault();
			
			var location_name = tmpl.find('input').value;
			
			Locations.insert({location_name: location_name, created_at: new Date});
			
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
