import { sayHello } from "./greet";
function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "dfdddddsfdssss");

function* g() {
    let o = 1;
    yield o++;
    yield o++;
    yield o++;

}
let gen = g();

console.log(gen.next()); // 1

let xxx = g();

console.log(gen.next()); // 2
console.log(xxx.next()); // 1
console.log(gen.next()); // 3
