const passwordInput = document.getElementById("password");

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const message = document.getElementById("message");


const characters = {

    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    lowercase: "abcdefghijklmnopqrstuvwxyz",

    numbers: "0123456789",

    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"

};


// Atualiza o tamanho mostrado na tela

lengthInput.addEventListener("input", () => {

    lengthValue.textContent = lengthInput.value;

});


// Gera um caractere aleatório usando crypto

function secureRandomChar(string) {

    const randomValues = new Uint32Array(1);

    crypto.getRandomValues(randomValues);

    return string[randomValues[0] % string.length];

}


// Embaralha a senha

function shuffle(string) {

    const array = string.split("");

    for (let i = array.length - 1; i > 0; i--) {

        const randomValues = new Uint32Array(1);

        crypto.getRandomValues(randomValues);

        const j = randomValues[0] % (i + 1);

        [array[i], array[j]] =
        [array[j], array[i]];

    }

    return array.join("");
}


// Gera a senha

function generatePassword() {

    const length = Number(lengthInput.value);

    let availableCharacters = "";

    let password = "";

    const selectedSets = [];


    if (uppercase.checked) {

        availableCharacters += characters.uppercase;

        selectedSets.push(characters.uppercase);

    }


    if (lowercase.checked) {

        availableCharacters += characters.lowercase;

        selectedSets.push(characters.lowercase);

    }


    if (numbers.checked) {

        availableCharacters += characters.numbers;

        selectedSets.push(characters.numbers);

    }


    if (symbols.checked) {

        availableCharacters += characters.symbols;

        selectedSets.push(characters.symbols);

    }


    // Nenhum tipo selecionado

    if (availableCharacters.length === 0) {

        passwordInput.value = "";

        strengthFill.style.width = "0%";

        strengthText.textContent =
            "Selecione pelo menos um tipo de caractere.";

        return;
    }


    // Adiciona um caractere de cada categoria

    selectedSets.forEach(set => {

        password += secureRandomChar(set);

    });


    // Completa a senha

    while (password.length < length) {

        password +=
            secureRandomChar(availableCharacters);

    }


    // Embaralha

    password = shuffle(password);


    passwordInput.value = password;


    // Avalia a força

    evaluateStrength(password);

}


// Avalia a força da senha

function evaluateStrength(password) {

    let score = 0;


    if (password.length >= 8)
        score++;

    if (password.length >= 12)
        score++;

    if (password.length >= 16)
        score++;


    if (/[A-Z]/.test(password))
        score++;

    if (/[a-z]/.test(password))
        score++;

    if (/[0-9]/.test(password))
        score++;

    if (/[^A-Za-z0-9]/.test(password))
        score++;


    let percentage;
    let text;
    let color;


    if (score <= 2) {

        percentage = 30;

        text = "🔴 Fraca";

        color = "#ef4444";

    }

    else if (score <= 4) {

        percentage = 55;

        text = "🟠 Média";

        color = "#f97316";

    }

    else if (score <= 5) {

        percentage = 75;

        text = "🟡 Forte";

        color = "#eab308";

    }

    else {

        percentage = 100;

        text = "🟢 Muito forte";

        color = "#22c55e";

    }


    strengthFill.style.width =
        percentage + "%";

    strengthFill.style.backgroundColor =
        color;

    strengthText.textContent =
        text;

    strengthText.style.color =
        color;
}


// Botão gerar senha

generateBtn.addEventListener("click", () => {

    generatePassword();

    message.textContent =
        "Nova senha gerada!";

    setTimeout(() => {

        message.textContent = "";

    }, 2000);

});


// Botão copiar

copyBtn.addEventListener("click", async () => {

    const password = passwordInput.value;


    if (!password) {

        message.textContent =
            "Gere uma senha primeiro.";

        return;
    }


    try {

        await navigator.clipboard.writeText(password);

        message.textContent =
            "✅ Senha copiada!";

    }

    catch (error) {

        passwordInput.select();

        document.execCommand("copy");

        message.textContent =
            "✅ Senha copiada!";

    }


    setTimeout(() => {

        message.textContent = "";

    }, 2000);

});


// Gera uma senha automaticamente

generatePassword();
