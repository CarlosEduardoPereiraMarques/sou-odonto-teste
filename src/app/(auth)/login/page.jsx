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

async function getUserData(){
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store"
  })
  if (!res.ok){
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

const Login = async() => {
  userData = await getUserData()
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
      <h1>{userData.name}</h1>
    </div>
  );
};

export default Login;
