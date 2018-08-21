const m = miq();

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const encryptMessage = (cipher) => {
    let encryptedMessage = '';
    let message = '';

    switch(cipher) {
        case 'affine':
            message = document.getElementById('affine_message').value;

            const num1 = parseInt(document.getElementById('affine_num1_input').value);
            const num2 = parseInt(document.getElementById('affine_num2_input').value);

            encryptedMessage = m.affine(message, num1, num2);
            document.getElementById('affine_message_encrypted').value = encryptedMessage;

            if (encryptedMessage !== 'Error: Invalid number parameters.') {
                // Populate letter selector
                let select = document.getElementById("select_letter");
                let options = message.split('');

                // Clear any previous options
                for(let i = select.options.length - 1; i >= 0; i--) {
                    select.remove(i);
                }

                // Add new options
                for(let i = 0; i < options.length; i++) {
                    if (alphabet.includes(options[i].toUpperCase())) {
                        let opt = options[i];
                        let el = document.createElement("option");
    
                        el.textContent = opt.toUpperCase();
                        el.value = opt;
                        select.appendChild(el);
                    }
                }
            
                updateAffineExample();
            }

            break;
        case 'atbash':
            message = document.getElementById('atbash_message').value;

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
    let boldAlphabet = alphabet;

    for (let i = 0; i < message.length;  i++) {
        if (alphabet.includes(message[i].toUpperCase())) {
            boldAlphabet = boldAlphabet.replace(message[i].toUpperCase(), `<span style="color: ${colour}"><b>${message[i].toUpperCase()}</b></span>`);
        }
    }
    
    return boldAlphabet;
}

const updateAffineExample = () => {
    const num1 = parseInt(document.getElementById('affine_num1_input').value);
    const num2 = parseInt(document.getElementById('affine_num2_input').value);

    let select = document.getElementById("select_letter");

    const index = (num1 * alphabet.indexOf(select.value.toUpperCase()) + num2) % 26;

    const xHighlight = `<span style="color: #1e6bb8"><b>${alphabet.indexOf(select.value.toUpperCase())}</b></span>`;
    const yHighlight = `<span style="color: #ef4e7b"><b>${index}</b></span>`;

    document.getElementById("affine_equation").innerHTML = `(${num1} * ${xHighlight} + ${num2})(mod 26) = ${yHighlight}`;
    document.getElementById("affine_answer").value = alphabet[index];

    document.getElementById('affine_alpha').innerHTML = boldCharacters(select.value, alphabet, '#1e6bb8');
    document.getElementById('affine_alpha').innerHTML = boldCharacters(alphabet[index], document.getElementById('affine_alpha').innerHTML, '#ef4e7b');
}