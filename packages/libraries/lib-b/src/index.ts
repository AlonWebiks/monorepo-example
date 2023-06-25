import { funcA } from "lib-a";

export function funcB() {
    funcA();
    console.log("hello from lib-b!");
}