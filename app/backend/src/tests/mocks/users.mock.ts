const validTokenAcess = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
  }

  const WithoutEmailOrPasswordResponse = { message: "All fields must be filled" }

  const validLoginBody = {
    email: "valid@email.com",
    password: "123456"
  }

  const loginBodyWithoutEmail = {
    password: "123456"
  }

  const loginBodyWithoutPassword = {
    email: 'valid@email.com'
  }

  export default {
    validTokenAcess,
    WithoutEmailOrPasswordResponse,
    validLoginBody,
    loginBodyWithoutEmail,
    loginBodyWithoutPassword,
  }