import { PageProvider } from "./PageContext";
import { CartProvider } from "./CartContext";

import { combineComponents } from "../utils/combineComponents";

const providers = [PageProvider, CartProvider];

export const AppContextProvider = combineComponents(...providers);
