import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import { Response } from 'superagent';
import usersMock from './mocks/users.mock';

import SequelizeUser from '../database/models/SequelizeUser.model'
import JWTUtils from '../utils/JWT.utils';
import validateToken from '../middlewares/validateToken.middleware';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login TESTS', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(function () { sinon.restore(); });
    
  it('without email body', async () => {
  sinon.stub(SequelizeUser, 'findOne').resolves(null)
    

     chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(usersMock.loginBodyWithoutEmail)

    expect(chaiHttpResponse.status).to.equal(400)
    expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.WithoutEmailOrPasswordResponse)
})

it('without password body', async () => {
  sinon.stub(SequelizeUser, 'findOne').resolves(null)

  chaiHttpResponse = await chai
 .request(app)
 .post('/login')
 .send(usersMock.loginBodyWithoutPassword)

 expect(chaiHttpResponse.status).to.equal(400)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.WithoutEmailOrPasswordResponse)
})


it('invalid email body', async () => {

  chaiHttpResponse = await chai
 .request(app)
 .post('/login')
 .send(usersMock.loginWithInvalidEmail)

 expect(chaiHttpResponse.status).to.equal(401)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.invalidPasswordOrEmailResponse)
})

it('invalid password body', async () => {

  chaiHttpResponse = await chai
 .request(app)
 .post('/login')
 .send(usersMock.loginWithInvalidPassword)

 expect(chaiHttpResponse.status).to.equal(401)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.invalidPasswordOrEmailResponse)
})

it('valid email and password', async () => {
  sinon.stub(SequelizeUser, 'findOne').resolves(usersMock.validUser as any)
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

describe('GET /login/role TESTS', () => {
  let chaiHttpResponse: Response;

  beforeEach(function () { sinon.restore(); });

it('when send valid token return role', async () => {
  sinon.stub(JWTUtils, 'verify').returns(usersMock.validUser.email as any);
  // sinon.stub(SequelizeUser, 'findOne').resolves(usersMock.validUser as any)

  chaiHttpResponse = await chai
 .request(app)
 .get('/login/role')
 .set('authorization', usersMock.token);


 expect(chaiHttpResponse.status).to.equal(200)
 expect(chaiHttpResponse.body).to.have.a.key('role')
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.roleUserResponse)
})


it('when send invalid token', async () => {

  chaiHttpResponse = await chai
 .request(app)
 .get('/login/role')
 .set('authorization', 'invalidToken')

 expect(chaiHttpResponse.status).to.equal(401)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.invalidTokenResponse)
})

it('when not send a token', async () => {
 
  chaiHttpResponse = await chai
 .request(app)
 .get('/login/role')

 expect(chaiHttpResponse.status).to.equal(401)
 expect(chaiHttpResponse.body).to.be.deep.equal(usersMock.withoutTokenResponse)
})


})