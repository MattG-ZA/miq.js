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

    // Prototype holds methods
    miq.prototype = {
        affine: (message, num1, num2) => {
            let validParams = num2 <= alphabet.length - 1 && num2 > 0 && alphabet.length % num1 > 0;
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
        },
        atbash: (message) => {
            const reversedAlphabet = alphabet.split('').reverse().join('');
            let encryptedMessage = replaceCharacters(message, reversedAlphabet);

            return encryptedMessage;
        },
        caesar: (message, num) => {
            const shiftedAlphabet = shiftAlphabet(num);
            let encryptedMessage = replaceCharacters(message, shiftedAlphabet);

            return encryptedMessage;
        },
        columnarTransposition: (message, keyWord, padChar) => {
            let encryptedMessage = '';

            let columns = {};
            let rows = [];

            let rowStart = 0;
            let rowEnd = keyWord.length;

            // Build the rows of the grid
            for (let i = 0; i < Math.ceil(message.length / keyWord.length); i++) {
                rows[i] = message.substring(rowStart, rowEnd);

                rowStart += keyWord.length;
                rowEnd += keyWord.length;

                // Add padding
                if (rows[i].length < keyWord.length) {
                    rows[i] += padChar.repeat(keyWord.length - rows[i].length);
                }
            }

            // Build the columns of the grid
            for (let i = 0; i < keyWord.length; i++) {
                // Add the index to the char in case of duplicate chars in keyWord
                columns[keyWord[i] + i] = '';

                rows.forEach(row => {
                    columns[keyWord[i] + i] += row[i];
                })
            }

            // Create keyWord containing indices, and sort chars alphabetically
            let sortedKeyWord = keyWord.split('').map((char, index) => { return char + index; }).sort();

            // Create encryptedMessage from alphabetically sorted columns
            sortedKeyWord.forEach(char => {
                encryptedMessage += columns[char];
            })

            return encryptedMessage;
        },
        polybiusSquare: (message, key, cipherText) => {
            let validParams = key.length === 25 && cipherText.length === 5;
            let encryptedMessage = '';

            if (validParams) {
                for (let i = 0; i < message.length; i++) {
                    let currentChar = message[i] === 'j' ? 'i' : message[i];

                    let rowChar = cipherText[Math.floor(key.indexOf(currentChar) / 5)];
                    let columnChar = cipherText[key.indexOf(currentChar) % 5];

                    if (rowChar !== undefined && columnChar !== undefined) {
                        encryptedMessage += rowChar += columnChar;
                    }
                }
            }
            else {
                encryptedMessage = 'Error: Invalid key or cipher text length.';
            }

            return encryptedMessage;
        },
        railFence: (message, num) => {
            let encryptedMessage = '';

            if (num === 1) {
                encryptedMessage = message;
            }
            else {
                let rails = {};
                let rowCounter = 1;
                let goDown = true;

                for (let column = 0; column < message.length; column++) {
                    if (!rails[rowCounter]) {
                        rails[rowCounter] = '';
                    }

                    rails[rowCounter] += message[column];

                    if (goDown) {
                        rowCounter++;

                        if (rowCounter + 1 > num) {
                            goDown = !goDown;
                        }
                    }
                    else {
                        rowCounter--;

                        if (rowCounter - 1 < 1) {
                            goDown = !goDown;
                        }
                    }
                }

                for (let row in rails) {
                    if (rails.hasOwnProperty(row)) {
                        encryptedMessage += rails[row];
                    }
                }
            }

            return encryptedMessage;
        },
        rot13: (message) => {
            const shiftedAlphabet = shiftAlphabet(13);
            let encryptedMessage = replaceCharacters(message, shiftedAlphabet);

            return encryptedMessage;
        },
        simpleSubstitution: (message, cipherText) => {
            let encryptedMessage = replaceCharacters(message, cipherText);

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