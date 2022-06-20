import { IsValid } from "./IsValid.js";

describe('Gaudome netinkamus tipus', () => {
    test('err: number', () => {
        const [err, msg] = IsValid.fullname(1);
        expect(err).toBe(true);
        expect(msg).toBe('Turi buti string tipas');
    })
})