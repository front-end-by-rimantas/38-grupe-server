// import { PI, skirtumas, sum } from './sum.js';
import * as matematika from './sum.js';

const app = {};

app.init = () => {
    console.log('inicijuojame programa...');
    console.log(matematika.sum(7, 5));
    console.log(matematika.skirtumas(7, matematika.PI));
}

app.init();

export default app;