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

    // Prototype holds methods
    miq.prototype = {
        atbash: function(message) {
            const reversedAlphabet = alphabet.split("").reverse().join("");;

            let cipherMessage = '';

           for (let i = 0; i < message.length; i++) {
               let indexOfChar = alphabet.indexOf(message[i].toUpperCase());
               let cipherChar = indexOfChar > -1 ? reversedAlphabet[indexOfChar] : message[i].toUpperCase();

               cipherMessage += cipherChar;
           }

           return cipherMessage;
        }
    };

    miq.init.prototype = miq.prototype;

    // Attach miq to the global object
    global.miq = miq;

}(window));