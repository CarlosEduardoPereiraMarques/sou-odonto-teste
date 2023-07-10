import React from "react";

const registerForm = [
  {
    title: "Nome:",
    htmlFor: "name",
    inputType: "text",
  },
  {
    title: "Sobrenome:",
    htmlFor: "surname",
    inputType: "text",
  },
  {
    title: "Email:",
    htmlFor: "email",
    inputType: "email",
  },
  {
    title: "Senha:",
    htmlFor: "password",
    inputType: "password",
  },
  {
    title: "Confirme sua senha:",
    htmlFor: "confirmPassword",
    inputType: "password",
  },
];

const Register = () => {
  return (
    <div>
      <h1>Registre-se</h1>
      <form action="register_endpoint" method="POST">
        {registerForm.map((item) => (
          <>
            <label htmlFor={item.htmlFor}>{item.title}</label>
            <input type={item.inputType} name={item.htmlFor} />
            <br />
          </>
        ))}
      </form>
      <button>Registrar</button>
    </div>
  );
};

export default Register;
