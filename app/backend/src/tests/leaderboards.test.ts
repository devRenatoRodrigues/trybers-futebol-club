import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import leaderboardMock from './mocks/leaderboard.mock';
import SequelizeMatches from '../database/models/SequelizeMatches.model';
import SequelizeTeam from '../database/models/SequelizeTeam.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /Leaderboards', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('should return all home points', async () => {

    const sequelizeStub = {
        query: sinon.stub().resolves([leaderboardMock.findHomePointsResolves, null]),
      };
    
    sinon.stub(SequelizeMatches, 'sequelize').get(() => sequelizeStub)

     chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardMock.findHomePointsResolves)
})

it('should return all away points', async () => {
    const sequelizeStub = {
        query: sinon.stub().resolves([leaderboardMock.findAwayPointsResolves, null]),
      };
    
    sinon.stub(SequelizeMatches, 'sequelize').get(() => sequelizeStub)

     chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardMock.findAwayPointsResolves)
})

it('should return all away points', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(leaderboardMock.findAllMatchesResolves as any)
    sinon.stub(SequelizeTeam, 'findAll').resolves(leaderboardMock.findAllTeamResolves as any)

     chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard')

    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardMock.findAllPointsResolves)
})

it('should fail home return error', async () => {
    const sequelizeStub = {
        query: sinon.stub().resolves([[], null]),
      };
    
    sinon.stub(SequelizeMatches, 'sequelize').get(() => sequelizeStub)

     chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.equal(404)
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'error'})
})

it('should fail away return error', async () => {
    const sequelizeStub = {
        query: sinon.stub().resolves([[], null]),
      };
    
    sinon.stub(SequelizeMatches, 'sequelize').get(() => sequelizeStub)

     chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.equal(404)
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'error'})
})


  });