import Constants from "expo-constants";
import { hostname } from "./hostname";

const localHostname = Constants?.expoConfig?.hostUri
? Constants.expoConfig.hostUri.split(`:`).shift()
: hostname;

export const baseUri = `http://${localHostname}:3000/api`