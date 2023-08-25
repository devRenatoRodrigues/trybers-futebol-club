import * as sinon from 'sinon';
import * as chai from 'chai';
import  teamsMock from '../mocks/teams.mock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
// import SequelizeTeam from '../../database/models/SequelizeTeam.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /Teams', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('should return AllBooks', async () => {
     chaiHttpResponse = await chai
    .request(app)
    .get('/teams')

    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock.findAllTeamsResponse)
})

  });