import { funcA } from "lib-a";

export function funcC() {
    funcA();
    console.log("hello from lib-c!");
}