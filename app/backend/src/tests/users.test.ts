import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import { Response } from 'superagent';
import usersMock from './mocks/users.mock';

import SequelizeUser from '../database/models/SequelizeUser.model'
import JWTUtils from '../utils/JWT.utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('invalid email body', async () => {
  sinon.stub(SequelizeUser, 'findOne').resolves(null)
    

     chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(usersMock.loginBodyWithoutEmail)

    expect(chaiHttpResponse.status).to.equal(400)
    expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.WithoutEmailOrPasswordResponse)
})

it('invalid password body', async () => {
  sinon.stub(SequelizeUser, 'findOne').resolves(null)

  chaiHttpResponse = await chai
 .request(app)
 .post('/login')
 .send(usersMock.loginBodyWithoutPassword)

 expect(chaiHttpResponse.status).to.equal(400)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.WithoutEmailOrPasswordResponse)
})

it('valid email and password', async () => {
  sinon.stub(SequelizeUser, 'findOne').resolves(usersMock.userDatabase as any)
  sinon.stub(JWTUtils, 'sign').returns(usersMock.token)

  chaiHttpResponse = await chai
 .request(app)
 .post('/login')
 .send(usersMock.validLoginBody)

 expect(chaiHttpResponse.status).to.equal(200)
 expect(chaiHttpResponse.body).to.have.a.key('token')
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.validTokenAcess)
})

  });