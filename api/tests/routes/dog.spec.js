/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: "23 - 30",
  weight: "4 - 5",
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe(`GET /dogs`, () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('should get 404', () =>
      agent.get('/dog').expect(404)
    );
  });
  describe('GET /temperaments', () => {
    it('should get 200', () =>
      agent.get('/temperaments').expect(200)
    );
    it('should get 404', () =>
      agent.get('/temperament').expect(404)
    );
  })
  describe(`GET /dogs?name=''`, () => {
    it('should get 200 if dog name is valid', () =>
      agent.get('/dogs?name=pug').expect(200)
    );
    it('should get 404 and an error message if dog name is invalid', async () => {
      const res = await agent.get('/dogs?name=pugdsadsad').expect(404)
      expect(res.text).to.equal("Dog not Found")
    });
  })
  describe(`GET /dogs/:id`, () => {
    it('should get 200 if dog id is valid', async () => {
      const res = await agent.get('/dogs/1').expect(200)
      expect(res.body[0].name).to.equal("Affenpinscher")
    });
    it('should get 400 and an error message if dog name is invalid', async () => {
      const res = await agent.get('/dogs/a').expect(404)
      expect(res.text).to.equal("ID doesn't exists")
    });
  })
});
