import { createContext } from "react";

const userContext=createContext({
    name:null,
    year:null
});

export default userContext;