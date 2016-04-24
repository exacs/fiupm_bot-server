/* eslint-env node, mocha */
'use strict';
// Modules for testing
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Modules to test
const hello        = require('../modules/hello.js');
const createRouter = require('../core/router.js');


describe('Router Module', () => {
  // This module tests Router. To test it, first we should
  // create some functions to be executed as promises
  const sumAction = (x, y) => accept => {
    accept(parseInt(x, 10) + parseInt(y, 10));
  };

  const mulAction = (x, y) => accept => {
    accept(x * y);
  };

  const concatAction = (x, y) => accept => {
    accept('' + x + y);
  };

  // Now, the test suite
  describe('with only one route', () => {
    const routes = [
      { names: ['/sum'], action: sumAction },
    ];
    const router = createRouter(routes);

    it('should throw an error if a string without slash is called',
       () => expect(router('sum')).to.eventually.be.rejected
    );
    it('should throw an error when the command is not present',
       () => expect(router('/foo')).to.eventually.be.rejected
    );
    it('should throw an error when the command doesn\'t begin with a slash',
       () => expect(router('please /sum 3 2')).to.eventually.be.rejected
    );
    it('should throw an error when the command is a substring of the passed one',
       () => expect(router('/summa 1 1')).to.eventually.be.rejected
    );
    it('should throw an error when the command is a superstring of the passed one',
       () => expect(router('/su 1 1')).to.eventually.be.rejected
    );
    it('should execute the action "/sum 3 2" properly',
       () => expect(router('/sum 3 2')).to.eventually.equal(5)
    );
  });

  describe('with 2-named 1-route', () => {
    const routes = [
      { names: ['/sum', '/plus'], action: sumAction },
    ];
    const router = createRouter(routes);

    it('should execute the action "/sum 3 2" properly',
       () => expect(router('/sum 3 2')).to.eventually.equal(5)
    );
    it('should execute the action "/plus 3 2" properly',
       () => expect(router('/plus 3 2')).to.eventually.equal(5)
    );
  });

  describe('with more than one route', () => {
    const routes = [
      { names: ['/sum', '/plus'], action: sumAction },
      { names: ['/mul', '/times'], action: mulAction },
    ];
    const router = createRouter(routes);

    it('should execute the action "/sum 3 2" properly',
       () => expect(router('/sum 3 2')).to.eventually.equal(5)
    );
    it('should execute the action "/plus 3 2" properly',
       () => expect(router('/plus 3 2')).to.eventually.equal(5)
    );
    it('should execute the action "/mul 3 2" properly',
       () => expect(router('/mul 3 2')).to.eventually.equal(6)
    );
    it('should execute the action "/times 3 2" properly',
       () => expect(router('/times 3 2')).to.eventually.equal(6)
    );
  });

  describe('with bad formed routes', () => {
    const routes = [
      { names: ['/sum', '/plus'], action: sumAction },
      { names: ['/sum'], action: mulAction },
      { names: ['/plused'], action: mulAction },
      { names: ['/concat string'], action: concatAction },
      { names: ['/plus string'], action: concatAction },
    ];
    const router = createRouter(routes);

    it('should execute the action "/plus 3 2" properly',
       () => expect(router('/plus 3 2')).to.eventually.equal(5)
    );
    it('should throw an error if two routes has the same action name',
       () => expect(router('/sum 3 2')).to.eventually.be.rejected
    );
    it('should execute actions properly if names are not exactly the same',
       () => expect(router('/plus 3 2')).to.eventually.equal(5)
    );
    it('should not execute an action whose name has spaces',
       () => expect(router('/concat string 3 2')).to.eventually.be.rejected
    );
    it('should ignore all actions whose name has spaces',
       () => expect(router('/plus string 3 2')).to.eventually.be.NaN
    );
  });
});
