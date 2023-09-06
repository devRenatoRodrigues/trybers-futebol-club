import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches.model';
import matchesMock from './mocks/matches.mock';
import usersMock from './mocks/users.mock';
import JWTUtils from '../utils/JWT.utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('ROUTE /matches', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('should return AllMatches', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.getAllMatchesResolves as any)

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

it('should change in progress to false', async () => {
  sinon.stub(JWTUtils, 'verify').returns(usersMock.validUser.email as any);
  sinon.stub(SequelizeMatches, 'findByPk').resolves(matchesMock.matchesFinishedDatabase as any)
  sinon.stub(SequelizeMatches, 'update').resolves([1])

   chaiHttpResponse = await chai
  .request(app)
  .patch('/matches/1/finish')
  .set('authorization', usersMock.token)

  expect(chaiHttpResponse.status).to.equal(200)
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" })

})

it('should return invalid matche id on finish match', async () => {
  sinon.stub(JWTUtils, 'verify').resolves(usersMock.validUser.email as any);
  sinon.stub(SequelizeMatches, 'findByPk').returns(null as any)
  sinon.stub(SequelizeMatches, 'update').resolves([0])

   chaiHttpResponse = await chai
  .request(app)
  .patch('/matches/50/finish')
  .send(matchesMock.matchesUpdateGoalsBody)
  .set('authorization', `Bearer ${usersMock.token}`)

  expect(chaiHttpResponse.status).to.equal(409)
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: `There are no updates to perform in match 50` } )

})


it('should update home and aways goals', async () => {
  sinon.stub(JWTUtils, 'verify').resolves(usersMock.validUser.email as any);
  sinon.stub(SequelizeMatches, 'findByPk').resolves(matchesMock.matchesUpdateGoalsDatabase as any)
  sinon.stub(SequelizeMatches, 'update').resolves([1])

   chaiHttpResponse = await chai
  .request(app)
  .patch('/matches/1')
  .send(matchesMock.matchesUpdateGoalsBody)
  .set('authorization', `Bearer ${usersMock.token}`)

  expect(chaiHttpResponse.status).to.equal(200)
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Updated" })

})

it('should return invalid matche id on update goals', async () => {
  sinon.stub(JWTUtils, 'verify').resolves(usersMock.validUser.email as any);
  sinon.stub(SequelizeMatches, 'findByPk').returns(null as any)
  sinon.stub(SequelizeMatches, 'update').resolves([0])

   chaiHttpResponse = await chai
  .request(app)
  .patch('/matches/50')
  .send(matchesMock.matchesUpdateGoalsBody)
  .set('authorization', `Bearer ${usersMock.token}`)

  expect(chaiHttpResponse.status).to.equal(409)
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: `There are no updates to perform in match 50` } )

})

it('create new match', async () => {
  sinon.stub(JWTUtils, 'verify').returns(usersMock.validUser.email as any);
  sinon.stub(SequelizeMatches, 'findByPk')
  .onFirstCall().resolves(matchesMock.teamOne as any)
  .onSecondCall().resolves(matchesMock.teamTwo as any)
  sinon.stub(SequelizeMatches, 'create').resolves(matchesMock.newMatcheCreateResolvesSuccessful as any)

   chaiHttpResponse = await chai
  .request(app)
  .post('/matches')
  .send(matchesMock.newMatcheCreateBody)
  .set('authorization', `Bearer ${usersMock.token}`)

  expect(chaiHttpResponse.status).to.equal(201)
  expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.newMatcheCreateResolvesSuccessful)

})

it('body with not exist team', async () => {
  sinon.stub(JWTUtils, 'verify').returns(usersMock.validUser.email as any);
  sinon.stub(SequelizeMatches, 'findByPk').resolves(null);


   chaiHttpResponse = await chai
  .request(app)
  .post('/matches')
  .send(matchesMock.newMatchesCreateWithInvalidTeamId as any)
  .set('authorization', `Bearer ${usersMock.token}`)

  expect(chaiHttpResponse.status).to.equal(404)
  expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.messageNotExistTeamId)

})

it('body with two equals team', async () => {
  sinon.stub(JWTUtils, 'verify').returns(usersMock.validUser.email as any);

  chaiHttpResponse = await chai
 .request(app)
 .post('/matches')
 .send(matchesMock.newMatchesCreateWithTwoEqualsTeam as any)
 .set('authorization', `Bearer ${usersMock.token}`)
 

 expect(chaiHttpResponse.status).to.equal(422)
 expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.messageEqualsTeam)

})

  });