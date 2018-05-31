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
        atbash: function (message) {
            let encryptedMessage = replaceCharacters(message, reversedAlphabet);

            return encryptedMessage;
        },
        rot13: function (message) {
            let shiftedAlphabet = shiftAlphabet(13);
            let encryptedMessage = replaceCharacters(message, shiftedAlphabet);

            return encryptedMessage;
        },
        caesar: function (message, number) {
            let shiftedAlphabet = shiftAlphabet(number);
            let encryptedMessage = replaceCharacters(message, shiftedAlphabet);

            return encryptedMessage;
        }
    };

    // Utility functions
    function shiftAlphabet(number) {
        let shiftedAlphabet = '';

        for (let i = 0; i < alphabet.length; i++) {
            let shiftedChar = alphabet[(i + number) % 26];

            shiftedAlphabet += shiftedChar;
        }

        return shiftedAlphabet;
    };

    function replaceCharacters(message, replaceAlphabet) {
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