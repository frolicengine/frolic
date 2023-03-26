import {Vector} from './geometry/Vector';

const v1 = new Vector();
const v2 = new Vector(1, 2);
const v3 = new Vector({x: 25, y: 50});

const v4 = v1.clone();
v4.add({x: 6, y: 7});
v4.add(v2);

const v5 = new Vector(v4);
v5.add(v3);

console.log(`v1(${v1.x},${v1.y})`);
console.log(`v2(${v2.x},${v2.y})`);
console.log(`v3(${v3.x},${v3.y})`);
console.log(`v4(${v4.x},${v4.y})`);
console.log(`v5(${v5.x},${v5.y})`);
