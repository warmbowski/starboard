if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("client tests", function(){
      it("should respect equality", function(){
        chai.assert.equal(5,5);
      });
    });
  });
}
