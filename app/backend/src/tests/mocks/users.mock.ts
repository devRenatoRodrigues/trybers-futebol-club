const validTokenAcess = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
  }

  const WithoutEmailOrPasswordResponse = { message: "All fields must be filled" }

  const validLoginBody = {
    email: "valid@email.com",
    password: "123456"
  }

  const loginBodyWithoutEmail = {
    password: "secret_admin"
  }

  const loginBodyWithoutPassword = {
    email: 'valid@email.com'
  }

  const userDatabase = [ {
    username: 'Admin',
    role: 'admin',
    email: 'valid@email.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  }]

  export default {
    validTokenAcess,
    WithoutEmailOrPasswordResponse,
    validLoginBody,
    loginBodyWithoutEmail,
    loginBodyWithoutPassword,
    userDatabase,
  }