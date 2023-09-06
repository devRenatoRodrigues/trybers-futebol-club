const validTokenAcess = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
  }

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"

  const WithoutEmailOrPasswordResponse = { message: "All fields must be filled" }
  

  const validLoginBody = {
    email: "admin@admin.com",
    password: "secret_admin"
  }

  const loginBodyWithoutEmail = {
    password: "secret_admin"
  }

  const loginBodyWithoutPassword = {
    email: 'valid@email.com'
  }

  const loginWithInvalidEmail = {
    email: 'invalid_email.com',
    password: "secret_admin"
  }

  const loginWithInvalidPassword = {
    email: 'valid@email.com',
    password: "12345"
  }

  const user = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin'
  }

  const validUser = {
    ...user,   password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  const invalidUser = {
    ...user,   password: '$2a$08$xi.'
  }


  const invalidPasswordOrEmailResponse = { "message": "Invalid email or password" }
  const withoutTokenResponse = { "message": "Token not found" }
  const invalidTokenResponse = { "message": "Token must be a valid token" }

  const roleUserResponse =   { role: "admin" }

  export default {
    validTokenAcess,
    WithoutEmailOrPasswordResponse,
    validLoginBody,
    loginBodyWithoutEmail,
    loginBodyWithoutPassword,
    token,
    invalidPasswordOrEmailResponse,
    withoutTokenResponse,
    invalidTokenResponse,
    roleUserResponse,
    loginWithInvalidPassword,
    loginWithInvalidEmail,
    validUser,
    user,
    invalidUser
  }