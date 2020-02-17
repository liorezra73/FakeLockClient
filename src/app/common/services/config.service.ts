import { InjectionToken } from "@angular/core";

const CONFIG = { baseApiURL: "http://localhost:3000/api" };

export let APP_CONFIG = new InjectionToken("config");
export default CONFIG;
