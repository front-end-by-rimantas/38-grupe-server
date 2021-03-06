import { IsValid } from "../components/IsValid.js";

const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', async (e) => {
        e.preventDefault();

        notificationsDOM.classList.remove('show');

        const data = {};
        const errors = [];

        for (const inputDOM of inputsDOM) {
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation;
                const [err, msg] = IsValid[rule](inputDOM.value);

                if (err) {
                    errors.push(msg);
                } else {
                    data[inputDOM.name] = inputDOM.value;
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
                if (!inputDOM.checked) {
                    errors.push('Privaloma sutikti su TOS');
                }
            }
        }

        if (inputsDOM[2].value !== inputsDOM[3].value) {
            errors.push('Slaptazodziai nesutampa');
        }

        if (errors.length) {
            notificationsDOM.classList.add('show');
            // notificationsDOM.innerHTML = errors.map(e => `<p>${e}.</p>`).join('');
            notificationsDOM.innerText = errors.join('.\n') + '.';
        } else {
            delete data.repass;
            delete data.tos;

            const response = await fetch(formDOM.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const resBody = await response.json();

            switch (resBody.msgType) {
                case 'error':
                    notificationsDOM.innerText = resBody.msg;
                    notificationsDOM.classList.remove('success');
                    notificationsDOM.classList.add('show');
                    break;

                case 'success':
                    notificationsDOM.innerText = resBody.msg;
                    notificationsDOM.classList.add('success', 'show');
                    break;

                case 'redirect':
                    location.href = resBody.href;
                    break;

                default:
                    console.log('Toks msgType nerastas:', resBody.msgType);
                    break;
            }
        }

        // tikriname ar laukai ne tusti
        // tikriname ar geros vertes:
        //      ar vardas "tinkamas" (minimum 2 zodziai)
        //      ar email "tinkamas"
        //      ar password "tinkamas"
        //      ar repeat-password "tinkamas"
        //      ar password === repeat-password
        //      ar TOS pazymetas (check)
        //  JEI yra klaidu:
        //      klaidas atvaizduojame pranesimu bloke
        //  JEI klaidu nera:
        //      sekmes pranesima atvaizduojame pranesimu bloke

        // siunciam i backend'a (API)
        //      JEI grazino klaida
        //          klaidas atvaizduojame pranesimu bloke
        //      JEI klaidu nera:
        //          sekmes pranesima atvaizduojame pranesimu bloke
    })
}