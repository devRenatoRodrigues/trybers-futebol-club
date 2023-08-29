import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches.model';
import matchesMock from './mocks/matches.mock';
// import SequelizeMatches from 

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('should return AllMatches', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.getAllMatchesResolves as any)

     chaiHttpResponse = await chai
    .request(app)
    .get('/matches')

console.log(chaiHttpResponse);


    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.getAllMatchesResolves)
})

  });