import './style.css';
import {checkPassword, decryptContent} from "./service/decrypt.ts";

const params = new URLSearchParams(window.location.search);

const password_params = params.get("password")

if (password_params && checkPassword(password_params)) {

    showContent(password_params)

} else {

    const passwordInput = document.querySelector<HTMLInputElement>('#password-input');

    if (passwordInput) {

        passwordInput.addEventListener('input', (event) => {

            const password = (event.target as HTMLInputElement).value

            if (checkPassword(password)) {
                showContent(password)
            }

        });

    }
}


function showContent(password: string) {

    const data = decryptContent(password)

    document.body.innerHTML = data.html
}

