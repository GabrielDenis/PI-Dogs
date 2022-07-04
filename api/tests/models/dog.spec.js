const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({ height: "23 - 30", weight: "2 - 3" })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', (done) => {
        Dog.create({ name: 'Pug', height: "23 - 30", weight: "2 - 3" })
          .then(() => done())
          .catch((error) => done(new Error(error.message)))
      });
      it(`shouldn't work when its an invalid data type`, (done) => {
        Dog.create({ name: [23.7632], height: "23 - 30", weight: "2 - 3" })
          .then(() => done(new Error("The dog is being created")))
          .catch(() => done())
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Dog.create({ name: "Pug", weight: "2 - 3" })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid height', (done) => {
        Dog.create({ name: 'Pug', height: "23 - 30", weight: "2 - 3" })
          .then(() => done())
          .catch((error) => done(new Error(error.message)))
      });
      it(`shouldn't work when its an invalid data type`, (done) => {
        Dog.create({ name: "Pug", height: {}, weight: "2 - 3" })
          .then(() => done(new Error("The dog is being created")))
          .catch(() => done())
      });
    });
  });
});
