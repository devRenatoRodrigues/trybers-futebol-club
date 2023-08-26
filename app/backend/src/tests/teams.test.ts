import * as sinon from 'sinon';
import * as chai from 'chai';
import  teamsMock from './mocks/teams.mock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /Teams', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('should return AllTeams', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock.findAllTeamsResponse as any)

     chaiHttpResponse = await chai
    .request(app)
    .get('/teams')

    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock.findAllTeamsResponse)
})

it('when findById successful', async () => {
  sinon.stub(SequelizeTeam, 'findByPk').resolves(teamsMock.findByIdResponse as any)
    

    chaiHttpResponse = await chai
   .request(app)
   .get('/teams/5')

   expect(chaiHttpResponse.status).to.equal(200)
   expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock.findByIdResponse)
})

it('when findById unsuccessful', async () => {
  sinon.stub(SequelizeTeam, 'findByPk').resolves(null as any)

  chaiHttpResponse = await chai
 .request(app)
 .get('/teams/25')

 expect(chaiHttpResponse.status).to.equal(404)
 expect(chaiHttpResponse.body.message).to.be.deep.equal('Team not found')
})

  });