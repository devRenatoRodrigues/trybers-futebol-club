import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import { Response } from 'superagent';
import usersMock from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('invalid email body', async () => {
    
     chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(usersMock.loginBodyWithoutEmail)

    expect(chaiHttpResponse.status).to.equal(400)
    expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.WithoutEmailOrPasswordResponse)
})

it('invalid password body', async () => {
  chaiHttpResponse = await chai
 .request(app)
 .post('/login')
 .send(usersMock.loginBodyWithoutPassword)

 expect(chaiHttpResponse.status).to.equal(400)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.WithoutEmailOrPasswordResponse)
})

it('valid email and password', async () => {
  chaiHttpResponse = await chai
 .request(app)
 .post('/login')
 .send(usersMock.validLoginBody)

 expect(chaiHttpResponse.status).to.equal(400)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.validTokenAcess)
})

  });