; (function (global) {

    // Create a 'new' miq object
    const miq = function () {
        return new miq.init();
    }

    // The actual object is created here
    miq.init = function () {
        const self = this;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversedAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

    // Prototype holds methods
    miq.prototype = {
        atbash: (message) => {
            let encryptedMessage = replaceCharacters(message, reversedAlphabet);

            return encryptedMessage;
        },
        rot13: (message) => {
            let shiftedAlphabet = shiftAlphabet(13);
            let encryptedMessage = replaceCharacters(message, shiftedAlphabet);

            return encryptedMessage;
        },
        caesar: (message, num) => {
            let shiftedAlphabet = shiftAlphabet(num);
            let encryptedMessage = replaceCharacters(message, shiftedAlphabet);

            return encryptedMessage;
        },
        affine: (message, num1, num2) => {
            let validParams = num2 <= alphabet.length - 1 && num2 > 0 && 26 % num1 > 0;
            let encryptedMessage = '';

            if (validParams) {
                for (let i = 0; i < message.length; i++) {
                    let indexOfChar = alphabet.indexOf(message[i].toUpperCase());
                    let encryptedChar = indexOfChar > -1 ? alphabet[(num1 * indexOfChar + num2) % alphabet.length] : message[i].toUpperCase();

                    encryptedMessage += encryptedChar;
                }
            }
            else {
                encryptedMessage = 'Error: Invalid number parameters.';
            }

            return encryptedMessage;
        }
    };

    // Utility functions
    const shiftAlphabet = (number) => {
        let shiftedAlphabet = '';

        for (let i = 0; i < alphabet.length; i++) {
            let shiftedChar = alphabet[(i + number) % alphabet.length];

            shiftedAlphabet += shiftedChar;
        }

        return shiftedAlphabet;
    };

    const replaceCharacters = (message, replaceAlphabet) => {
        let replacedMessage = '';

        for (let i = 0; i < message.length; i++) {
            let indexOfChar = alphabet.indexOf(message[i].toUpperCase());
            let replaceChar = indexOfChar > -1 ? replaceAlphabet[indexOfChar] : message[i].toUpperCase();

            replacedMessage += replaceChar;
        }

        return replacedMessage;
    };

    miq.init.prototype = miq.prototype;

    // Attach miq to the global object
    global.miq = miq;

}(window));