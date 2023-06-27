import { funcA } from "lib-a";

export function funcB() {
    funcA();
    console.log("Hello from lib-b!");
}