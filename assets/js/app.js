const m = miq();

const encryptMessage = (cipher) => {
    let encryptedMessage = '';

    switch(cipher) {
        case 'atbash':
            const message = document.getElementById('atbash_message').value;

            encryptedMessage = m.atbash(message);
            document.getElementById('atbash_message').value = encryptedMessage;

            break;
        default:
            console.log('Not a cipher');
    }
};