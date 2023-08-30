import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches.model';
import matchesMock from './mocks/matches.mock';
import SequelizeTeam from '../database/models/SequelizeTeam.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('ROUTE /matches', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('should return AllMatches', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.getAllMatchesResolves as any)
    // sinon.stub(SequelizeTeam, 'findAll').resolves(matchesMock.teamsDatabase as any)

     chaiHttpResponse = await chai
    .request(app)
    .get('/matches')


    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.getAllMatchesResolves)
})

it('should filtered inProgress false matches', async () => {
  sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.findAllMatchesFalseResolves as any)

   chaiHttpResponse = await chai
  .request(app)
  .get('/matches')
  .query({ inProgress: 'false' });

  expect(chaiHttpResponse.status).to.equal(200)
  expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.findAllMatchesFalseResolves)
})

it('should filtered inProgress true matches', async () => {
  sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.findAllMatchesTrueResolves as any)

   chaiHttpResponse = await chai
  .request(app)
  .get('/matches')
  .query({ inProgress: 'true' });

  expect(chaiHttpResponse.status).to.equal(200)
  expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.findAllMatchesTrueResolves)
})

it('should filtered matches equals true', async () => {
  sinon.stub(SequelizeMatches, 'findByPk').resolves(matchesMock.matchesFinishedDatabase as any)

   chaiHttpResponse = await chai
  .request(app)
  .patch('/matches/1/finish')

  expect(chaiHttpResponse.status).to.equal(200)
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" })

})

it('should filtered matches equals true', async () => {
  sinon.stub(SequelizeMatches, 'findByPk').resolves(matchesMock.matchesFinishedDatabase as any)

   chaiHttpResponse = await chai
  .request(app)
  .patch('/matches/1/finish')

  expect(chaiHttpResponse.status).to.equal(200)
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" })

})

it('should filtered matches equals true', async () => {
  sinon.stub(SequelizeMatches, 'findByPk').resolves(matchesMock.matchesUpdateGoalsDatabase as any)

   chaiHttpResponse = await chai
  .request(app)
  .patch('/matches/1')

  expect(chaiHttpResponse.status).to.equal(200)
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Updated' })

})

it('create new match', async () => {
  sinon.stub(SequelizeMatches, 'create').resolves(matchesMock.newMatcheCreateResolvesSuccessful as any)

   chaiHttpResponse = await chai
  .request(app)
  .post('/matches')
  .send(matchesMock.newMatcheCreateBody)

  expect(chaiHttpResponse.status).to.equal(201)
  expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.newMatcheCreateResolvesSuccessful)

})

it('body with not exist team', async () => {

   chaiHttpResponse = await chai
  .request(app)
  .post('/matches')
  .send(matchesMock.messageNotExistTeamId)

  expect(chaiHttpResponse.status).to.equal(422)
  expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.messageEqualsTeam)

})

it('body with two equals team', async () => {

  chaiHttpResponse = await chai
 .request(app)
 .post('/matches')
 .send(matchesMock.newMatchesCreateWithInvalidTeamId)

 expect(chaiHttpResponse.status).to.equal(404)
 expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.messageNotExistTeamId)

})

  });