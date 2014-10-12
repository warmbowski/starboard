Organizations = new Meteor.Collection('organizations')
Locations = new Meteor.Collection('locations');
People = new Meteor.Collection('people');

if (Meteor.isClient) {
	
	Session.setDefault("selectedOrg",null);
	Session.setDefault("selectedLoc",null);
	
	
	Template.OrganizationsList.helpers({
		organization: function(){
			return Organizations.find();
		},
		
		orgSelected: function(){
			return Session.equals("selectedOrg", this._id)?"pure-menu-selected":"";
		}
	});
	
	Template.LocationsList.helpers({
		locationInOrg: function(){
			var selected_org_id = Session.get("selectedOrg");
			
			return Locations.find({organization_id: selected_org_id});
		},
		
		locSelected: function(){
			return Session.equals("selectedLoc", this._id)?"pure-menu-selected":"";
		}
	});

	Template.InOutLists.helpers({
		logins: function(){
			return Meteor.users.find();
		}
	});

	Template.OrganizationsList.events({
		'click a': function(e, tmpl){
			e.preventDefault();
			Session.set("selectedOrg", this._id);
		},
		
		'submit form#addOrg': function(e, tmpl){
			e.preventDefault();
			
			var org_name = tmpl.find('input').value;
			
			Organizations.insert({organization_name: org_name, created_at: new Date, created_by: Meteor.userId()});
			
			var form = tmpl.find('form');
			form.reset();
		}
	});
	
	Template.LocationsList.events({
		'click a': function(e, tmpl){
			e.preventDefault();
			Session.set("selectedLoc", this._id);
		},
		
		'submit form#addLoc': function(e, tmpl){
			e.preventDefault();
			
			var loc_name = tmpl.find('input').value;
			var selected_org_id = Session.get("selectedOrg");
			
			Locations.insert({location_name: loc_name, organization_id: selected_org_id, created_at: new Date, created_by: Meteor.userId()});
			
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
