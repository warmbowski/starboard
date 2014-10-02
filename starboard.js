Organizations = new Meteor.Collection('organizations')
Locations = new Meteor.Collection('locations');
People = new Meteor.Collection('people');

if (Meteor.isClient) {
	Session.setDefault("selectedItem","")
	
	Template.OrganizationsList.helpers({
		organization: function(){
			return Organizations.findOne();
		},
		locationInOrg: function(){
			return Locations.find({organization_id: this._id}).fetch();
		},
		selected: function(){
			return Session.equals("selectedItem", this._id)?"pure-menu-select":"pure-menu-select";
		}
	});

	Template.OrganizationsList.events({
		'click a': function(e, tmpl){
			console.log(this._id)
			Session.set("selectedItem", this._id);
			// e.currentTarget.addClass('pure-menu-selected');
		},
		'submit form#addOrg': function(e, tmpl){
			e.preventDefault();
			
			var org_name = tmpl.find('input').value;
			
			Organizations.insert({organization_name: org_name, created_at: new Date, created_by: Meteor.userId()});
			
			var form = tmpl.find('form');
			form.reset();
		},
		'submit form#addLoc': function(e, tmpl){
			e.preventDefault();
			
			var loc_name = tmpl.find('input').value;
			var current_org_id = tmpl.find('li.selected_org')
			
			Locations.insert({location_name: loc_name, organization_id: org_id, created_at: new Date, created_by: Meteor.userId()});
			
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
