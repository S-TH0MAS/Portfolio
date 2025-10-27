import CryptoJS from 'crypto-js';
import encryptedFile from '../encrypted/encrypted-content.json'; // Importation directe du fichier

// Définir les types pour le contenu déchiffré
interface DecryptedData {
    html: string;
    images: Record<string, string>; // Un objet où les clés sont des strings et les valeurs des strings
    timestamp: string;
}

const EXPECTED_TEST_STRING = "valid";
export function checkPassword(password: string): boolean {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedFile.test, password)
            .toString(CryptoJS.enc.Utf8);
        return decrypted === EXPECTED_TEST_STRING;
    } catch {
        return false;
    }
}

/**
 * Tente de déchiffrer le contenu avec un mot de passe.
 * @param password Le mot de passe fourni par l'utilisateur.
 * @returns Les données déchiffrées (html, images) en cas de succès.
 * @throws Lance une erreur si le mot de passe est incorrect ou si les données sont corrompues.
 */
export function decryptContent(password: string): DecryptedData {
    try {
        // 1. Récupérer la chaîne chiffrée depuis le fichier importé
        const encryptedData = encryptedFile.encrypted;

        // 2. Tenter de déchiffrer
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8);

        // 3. Vérifier si le déchiffrement a produit un résultat valide
        if (!decryptedJsonString) {
            throw new Error('Mot de passe incorrect.');
        }

        // 4. Parser la chaîne JSON pour obtenir l'objet de données
        const data: DecryptedData = JSON.parse(decryptedJsonString);

        // 5. Remplacer les placeholders des images par leur contenu Base64
        let finalHtml = data.html;
        for (const imageName in data.images) {
            const base64Image = data.images[imageName];
            const imageRegex = new RegExp(imageName, 'g');
            finalHtml = finalHtml.replace(imageRegex, base64Image);
        }

        // Mettre à jour l'objet avec le HTML final
        data.html = finalHtml;

        return data;

    } catch (error) {
        // Intercepter les erreurs (mauvais mot de passe, JSON invalide) et relancer une erreur standard
        console.error('Échec du déchiffrement :', error);
        throw new Error('Mot de passe incorrect ou données corrompues.');
    }
}