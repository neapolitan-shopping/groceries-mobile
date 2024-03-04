import Constants from "expo-constants";

const  hostName = Constants?.expoConfig?.hostUri
? Constants.expoConfig.hostUri.split(`:`).shift()?.concat(`:3000/api`)
: `192.168.1.6`;

export const baseUri = `http://${hostName}:3000/api`