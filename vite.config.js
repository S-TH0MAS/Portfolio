import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    base: '/Portfolio/',
    plugins: [
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/assets/icon.svg', // Le chemin vers votre fichier source
                    dest: 'assets' // Le dossier de destination dans "dist"
                }
            ]
        })
    ],
})
