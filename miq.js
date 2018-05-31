;(function(global) {

    // Create a 'new' miq object
    const miq = function() {
        return new miq.init();
    }

    // The actual object is created here
    miq.init = function() {
        const self = this;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversedAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

    // Prototype holds methods
    miq.prototype = {
        atbash: function(message) {
            let encryptedMessage = '';

           for (let i = 0; i < message.length; i++) {
               let indexOfChar = alphabet.indexOf(message[i].toUpperCase());
               let encryptedChar = indexOfChar > -1 ? reversedAlphabet[indexOfChar] : message[i].toUpperCase();

               encryptedMessage += encryptedChar;
           }

           return encryptedMessage;
        },
        rot13: function(message) {
            let shiftedAlphabet = shiftAlphabet(13);
            let encryptedMessage = '';

            for (let i = 0; i < message.length; i++) {
                let indexOfChar = alphabet.indexOf(message[i].toUpperCase());
                let encryptedChar = indexOfChar > -1 ? shiftedAlphabet[indexOfChar] : message[i].toUpperCase();
 
                encryptedMessage += encryptedChar;
            }
 
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

    miq.init.prototype = miq.prototype;

    // Attach miq to the global object
    global.miq = miq;

}(window));