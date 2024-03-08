import React, { createContext, useContext } from "react";

// Creamos el contexto de usuario
const UserContext = createContext();

// Hook personalizado para acceder al contexto de usuario
export const useUser = () => useContext(UserContext);

export default UserContext;
