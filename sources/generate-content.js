// generate-content.js
import Twig from "twig";
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import {projectInfo} from "./project-info.js";

const __dirname = import.meta.dirname;

// Configuration
const templatesDir = __dirname.concat('/../src/templates');
const outputDir = __dirname.concat('/../src/content');

// Transformer la fonction de callback de Twig en une fonction qui retourne une Promise
const renderFileAsync = promisify(Twig.renderFile);

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Fonction pour générer un fichier HTML (maintenant asynchrone)
async function generateHTML(templatePath, outputPath, templateData = {}) {
    try {
        // "await" met en pause la fonction jusqu'à ce que le rendu soit terminé
        const html = await renderFileAsync(templatePath, templateData);

        fs.writeFileSync(outputPath, html);
        console.log(`✓ Fichier généré: ${outputPath}`);
    } catch (err) {
        console.error(`Erreur lors du rendu de ${templatePath}:`, err);
    }
}

// Fonction principale asynchrone pour pouvoir utiliser "await"
async function main() {
    console.log('Début de la génération...');
    await generateHTML(
        path.join(templatesDir, 'body.html.twig'),
        path.join(outputDir, 'content.html'),
        {projects: projectInfo}
    );
    console.log('Génération terminée.');
}

// Lancer l'exécution
main();