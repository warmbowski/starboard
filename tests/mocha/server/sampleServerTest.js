if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function() {
      it("should have a Meteor version defined", function() {
        chai.assert(Meteor.release);
      });
      
      it("should have collections", function() {
        chai.assert(Organizations, 'There is an Org collection');
        chai.assert.isDefined(Locations, 'There is a Loc collection');
        //chai.assert.isUndefined(Bogus, 'There is NOT a Bogus collection');
      });

      it("should not have data if user is not logged in", function() {
        orgId = Organizations.insert({
          organization_name: 'MyOrganization', 
          created_at: new Date, 
          created_by: 'paul'
        });
        console.log(orgId);
        chai.assert.notOk(orgId);
        //chai.assert(Meteor.userId(), 'No logged in user');
        //chai.assert.isNotDefined(Users.find().fetch(),'No user data retrieved');
      });
      
      // it("should be created by logged in user", function (done) {
      //         // login to system and wait for callback
      //         Meteor.loginWithPassword("admin@tutorials.com", "admin3210", function(err) {
      //             // check if we have correctly logged in the system
      //             expect(err).toBeUndefined();
      //
      //             // create a new tutorial
      //             var tut = new Tutorial();
      //
      //             // save the tutorial and use callback function to check for existence
      //             var id = tut.save(function(error, result) {
      //                 expect(error).toBeUndefined();
      //
      //                 // delete created tutorial
      //                 Tutorials.remove(id);
      //
      //                 Meteor.logout(function() {
      //                     done();
      //                 })
      //             });
      //         });
      //     });
    });
  });
}
