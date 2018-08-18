const m = miq();

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const encryptMessage = (cipher) => {
    let encryptedMessage = '';

    switch(cipher) {
        case 'atbash':
            const message = document.getElementById('atbash_message').value;

            encryptedMessage = m.atbash(message);
            document.getElementById('atbash_message_encrypted').value = encryptedMessage;
            
            document.getElementById('atbash_alpha').innerHTML = boldCharacters(message, alphabet, '#1e6bb8');
            document.getElementById('atbash_alpha_reversed').innerHTML = boldCharacters(encryptedMessage, alphabet.split('').reverse().join(''), '#ef4e7b');

            break;
        default:
            console.log('Not a cipher');
    }
};

// Utility Functions
const boldCharacters = (message, alphabet, colour) => {
    let boldAlphabet = '';

    for(let i = 0; i < alphabet.length; i++) {
        if (message.toUpperCase().indexOf(alphabet[i]) > -1) {
            boldAlphabet += `<span style="color: ${colour}"><b>` + alphabet[i] + '</b></span>';
        }
        else {
            boldAlphabet += alphabet[i];
        }
    }
    console.log(boldAlphabet);
    return boldAlphabet;
}