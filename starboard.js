Organizations = new Meteor.Collection('organizations')
Locations = new Meteor.Collection('locations');
People = new Meteor.Collection('people');

if (Meteor.isClient) {
	
	Meteor.subscribe("organizationData");
	Meteor.subscribe("locationData");
	Meteor.subscribe("allUserData");
	
	Session.setDefault("selectedOrg",null);
	Session.setDefault("selectedLoc",null);
	Session.setDefault("editMode", false);
	
	
	Template.OrganizationsList.helpers({
		organization: function(){
			return Organizations.find();
		},
		
		orgSelected: function(){
			return Session.equals("selectedOrg", this._id)?"pure-menu-selected":"";
		},
		
		editMode: function(){
			return Session.get("editMode");
		},
		
		isCreator: function(){
			console.log(this);
			return this.created_by == Meteor.userID()?true:false;
		}
	});
	
	Template.LocationsList.helpers({
		locationInOrg: function(){
			var selected_org_id = Session.get("selectedOrg");
			
			return Locations.find({organization_id: selected_org_id});
		},
		
		locSelected: function(){
			return Session.equals("selectedLoc", this._id)?"pure-menu-selected":"";
		},
		
		editMode: function(){
			return Session.get("editMode");
		}
	});
	
	Template.InLists.helpers({
		inList: function(){
			return Meteor.users.find({ "profile.presence": "in" });
		}
	});
		
	Template.OutLists.helpers({
		outList: function(){
			return Meteor.users.find({ "profile.presence": {$not: "in" }});
		}
	});
	
	Template.OrganizationsList.events({
		'click a': function(e, tmpl){
			e.preventDefault();
			Session.set("selectedOrg", this._id);
		},
		
		'click i.fa-close': function(e, tmpl){
			Organizations.remove({_id: this._id});
			Session.set("editMode", false);
		},
		
		'dblclick li.pure-menu-heading': function(e, tmpl){
			e.preventDefault();
			if (Session.get("editMode")){
				Session.set("editMode", false);
			} else {
				Session.set("editMode", true);
			}
		},
		
		'submit form#addOrg': function(e, tmpl){
			e.preventDefault();
			
			var org_name = tmpl.find('input').value;
			
			Organizations.insert({organization_name: org_name, created_at: new Date, created_by: Meteor.userId()});
			
			var form = tmpl.find('form');
			form.reset();
			Session.set("editMode", false);
		}
	});
	
	Template.LocationsList.events({
		'click a': function(e, tmpl){
			e.preventDefault();
			Session.set("selectedLoc", this._id);
		},
		
		'dblclick li.pure-menu-heading': function(e, tmpl){
			e.preventDefault();
			if (Session.get("editMode")){
				Session.set("editMode", false);
			} else {
				Session.set("editMode", true);
			}
		},
		
		'submit form#addLoc': function(e, tmpl){
			e.preventDefault();
			
			var loc_name = tmpl.find('input').value;
			var selected_org_id = Session.get("selectedOrg");
			
			Locations.insert({location_name: loc_name, organization_id: selected_org_id, created_at: new Date, created_by: Meteor.userId()});
			
			var form = tmpl.find('form');
			form.reset();
			Session.set("editMode", false);
		}
	});
}

if (Meteor.isServer) {
	
	Accounts.onCreateUser(function(options, user) {
		user.profile = options.profile ? options.profile : {};
		user.profile.presence = 'out';
		user.profile.current_location = null;
		user.profile.subscribed_orgs = [];
		
		return user;
	});
	
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
			
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
