/**
 * @function CaesarCipher
 * @description - Encrypt/Decrypt using a Caesar cipher
 * The Caesar cipher shifts each letter by a fixed number of positions.
 * For example, with shift 3: A → D, B → E, C → F, etc.
 * Non-alphabetic characters remain unchanged.
 * @param {string} text - text to be encrypted/decrypted
 * @param {number} shift - number of positions to shift (e.g., 3, -3)
 * @return {string} encrypted/decrypted string
 */
export const CaesarCipher = (text: string, shift: number): string => {
  return text.replace(/[a-zA-Z]/g, (char: string) => {
    const isUpperCase = char === char.toUpperCase();
    const base = isUpperCase ? 65 : 97; // ASCII codes: A=65, a=97
    const charCode = char.charCodeAt(0) - base;
    const shiftedCode = (charCode + shift + 26) % 26;
    return String.fromCharCode(base + shiftedCode);
  });
};

// Legacy export for backward compatibility
export const XORCipher = (str: string, key: number): string =>
  str.replace(/./g, (char: string) =>
    String.fromCharCode(char.charCodeAt(0) ^ key)
  )

