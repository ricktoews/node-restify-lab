var expect = require('chai').expect;
var performGet = require('../scripts/get-data');

describe('Perform test for REST call', function() {
  it('should return data from async call.', function(done) {
    var p = performGet();
	p.then(res => {
      let data = res.data[0];
	  done();
      expect(data.decimal).to.equal('1');
	}, err => {
	  console.log('in rest-test.js, Houston, we have a problem.');
	  done();
      expect(1).to.equal(0);
	})
	.catch((e) => {
	  console.log('got into the catch stuff...');
	});
  });
});

