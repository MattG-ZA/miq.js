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
    const reversed = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

    // Prototype holds methods
    miq.prototype = {
        atbash: function(message) {
            let encrypyedMessage = '';

           for (let i = 0; i < message.length; i++) {
               let indexOfLetter = alphabet.indexOf(message[i].toUpperCase());
               let oppositeLetter = reversed[indexOfLetter];

               encrypyedMessage += oppositeLetter;
           }

           return encrypyedMessage;
        }
    };

    miq.init.prototype = miq.prototype;

    // Attach miq to the global object
    global.miq = miq;

}(window));