import React from 'react';

export const SessionProvider = ({ children }) => {
  // Aqui você pode adicionar qualquer lógica de mock que desejar
  // Por exemplo, você pode simular um usuário autenticado ou uma sessão válida
  const session = {
    user: {
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
  };

  return <>{children}</>;
};
