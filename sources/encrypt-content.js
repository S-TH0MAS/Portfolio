import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname

// Configuration
const PASSWORD = process.argv[2];

if (!PASSWORD) {
    throw new Error("Veuillez indiquer un mot de passe en argument.");
}

const CONTENT_DIR = __dirname.concat('/../src/content');
const OUTPUT_FILE = __dirname.concat('/../src/encrypted/encrypted-content.json');
// ▼▼▼ CHEMIN VERS LE FICHIER DE TEST ▼▼▼
const TEST_FILE_PATH = __dirname.concat('/test.txt');

/**
 * Convertit une image en Base64
 */
function imageToBase64(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64 = imageBuffer.toString('base64');
    const ext = path.extname(imagePath).toLowerCase();
    const mimeTypes = {
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
        '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml'
    };
    const mimeType = mimeTypes[ext] || 'image/jpeg';
    return `data:${mimeType};base64,${base64}`;
}

/**
 * Chiffre le contenu
 */
function encryptContent() {
    console.log('🔒 Début du chiffrement...\n');

    // Lire le fichier HTML
    const htmlPath = path.join(CONTENT_DIR, 'content.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    console.log('✓ HTML lu');

    // ▼▼▼ LIRE LE FICHIER DE TEST ▼▼▼
    if (!fs.existsSync(TEST_FILE_PATH)) {
        throw new Error(`Le fichier de test est introuvable à l'emplacement: ${TEST_FILE_PATH}`);
    }
    const testContent = fs.readFileSync(TEST_FILE_PATH, 'utf8').trim(); // .trim() pour enlever les espaces/sauts de ligne
    console.log('✓ Fichier de test lu');

    // Lire les images
    const images = {};
    const imageFiles = fs.readdirSync(CONTENT_DIR).filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));
    imageFiles.forEach(file => {
        const imagePath = path.join(CONTENT_DIR, file);
        images[file] = imageToBase64(imagePath);
        console.log(`✓ Image convertie: ${file}`);
    });

    // Créer l'objet de données
    const data = {
        html: htmlContent,
        images: images,
        timestamp: new Date().toISOString()
    };

    // Chiffrer les données principales
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), PASSWORD).toString();

    // ▼▼▼ CHIFFRER LE CONTENU DU FICHIER DE TEST ▼▼▼
    const encryptedTest = CryptoJS.AES.encrypt(testContent, PASSWORD).toString();
    console.log(`✓ Contenu du fichier de test chiffré`);

    // Sauvegarder dans un fichier
    const output = {
        encrypted: encrypted,
        test: encryptedTest,
        createdAt: new Date().toISOString()
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

    console.log(`\n✓ Contenu chiffré sauvegardé dans: ${OUTPUT_FILE}`);
}

// Exécuter
encryptContent();