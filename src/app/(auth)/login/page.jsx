import React from "react";

const loginForm = [
  {
    id: 1,
    title: "Email:",
    htmlFor: "email",
    inputType: "email",
  },
  {
    id: 2,
    title: "Senha:",
    htmlFor: "password",
    inputType: "password",
  },
];

const Login = () => {
  return (
    <div>
      <h1>Acessar</h1>
      <form action="access_endpoint" method="POST">
        {loginForm.map((item) => (
          <>
            <label htmlFor={item.htmlFor}>{item.title}</label>
            <input type={item.inputType} name={item.htmlFor} />
            <br />
          </>
        ))}
      </form>
      <button>Acessar</button>
    </div>
  );
};

export default Login;
