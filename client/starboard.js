Session.setDefault("selectedOrg",null);
Session.setDefault("selectedLoc",null);
Session.setDefault("editOrgs", false);
Session.setDefault("editLocs", false);

Template.OrganizationsList.helpers({
  organization: function(){
    return Organizations.find();
  },

  orgSelected: function(){
    return Session.equals("selectedOrg", this._id)?"pure-menu-selected":"";
  },

  editOrgs: function(){
    return Session.get("editOrgs");
  },

  isCreator: function(){
    console.log(this);
    return this.created_by == Meteor.userId() ? true:false;
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

  editLocs: function(){
    return Session.get("editLocs");
  }
});

Template.InLists.helpers({
  inList: function(){
    return Meteor.users.find({ "profile.presence": "in" });
  },

  isMeClass: function(){
    return this._id == Meteor.userId() ? 'this-is-me':'';
  }
});

Template.OutLists.helpers({
  outList: function(){
    return Meteor.users.find({ "profile.presence": {$not: "in" }});
  },

  isMeClass: function(){
    return this._id == Meteor.userId() ? 'this-is-me':'';
  }
});

Template.OrganizationsList.events({
  'click a': function(e, tmpl){
    e.preventDefault();
    Session.set("selectedOrg", this._id);
  },

  'click i.fa-close': function(e, tmpl){
    Organizations.remove({_id: this._id});
    Session.set("editOrgs", false);
  },

  'click i.fa-pencil-square-o': function(e, tmpl){
    e.preventDefault();
    if (Meteor.userId()) {
      if (Session.get("editOrgs")){
        Session.set("editOrgs", false);
      } else {
        Session.set("editOrgs", true);
      }
    }
  },

  'submit form#addOrg': function(e, tmpl){
    e.preventDefault();
    var org_name = tmpl.find('input').value;
    Organizations.insert({
      organization_name: org_name, 
      created_at: new Date, 
      created_by: Meteor.userId()
    });

    var form = tmpl.find('form');
    form.reset();
    Session.set("editOrgs", false);
  }
});

Template.LocationsList.events({
  'click a': function(e, tmpl){
    e.preventDefault();
    Session.set("selectedLoc", this._id);
  },

  'click i.fa-pencil-square-o': function(e, tmpl){
    e.preventDefault();
    if (Meteor.userId()) {
      if (Session.get("editLocs")){
        Session.set("editLocs", false);
      } else {
        Session.set("editLocs", true);
      }
    }
  },

  'submit form#addLoc': function(e, tmpl){
    e.preventDefault();
    var loc_name = tmpl.find('input').value;
    var selected_org_id = Session.get("selectedOrg");
    Locations.insert({
      location_name: loc_name, 
      organization_id: selected_org_id, 
      created_at: new Date, 
      created_by: Meteor.userId()
    });

    var form = tmpl.find('form');
    form.reset();
    Session.set("editLocs", false);
  }
});

Template.InLists.rendered = function(){
  this.$('.in-out-list').sortable({
    connectWith: '.in-out-list',
    accept: 'card',
    revert: 'invalid',
    placeholder: 'card-placeholder',
    helper: 'original',
    opacity: '0.7',
    scroll: true,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    start: function(e,ui){
      $(this).data().uiSortable.currentItem.addClass("card-rotate");
    },
    stop: function(e,ui){
      $(this).data().uiSortable.currentItem.removeClass("card-rotate");
    },
    receive: function(e,ui){
      var receivedId = ui.item.attr("id");
      console.log(receivedId);
      Meteor.users.update({_id: receivedId}, {$set: {'profile.presence': 'in'}});
    }
  })
};

Template.OutLists.rendered = function(){
  this.$('.in-out-list').sortable({
    connectWith: '.in-out-list',
    accept: 'card',
    revert: 'invalid',
    placeholder: 'card-placeholder',
    helper: 'original',
    opacity: '0.7',
    scroll: true,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    start: function(e,ui){
      $(this).data().uiSortable.currentItem.addClass("card-rotate");
    },
    stop: function(e,ui){
      $(this).data().uiSortable.currentItem.removeClass("card-rotate");
    },
    receive: function(e,ui){
      var receivedId = ui.item.attr("id");
      console.log(receivedId);
      Meteor.users.update({_id: receivedId}, {$set: {'profile.presence': 'out'}});
    }
  })
};
