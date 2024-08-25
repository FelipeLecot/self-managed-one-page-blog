export const escapeStrings = (string) => {
    return string
        .replace(/\\/g, '\\\\') 
        .replace(/'/g, "\\'") 
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;') 
        .replace(/\n/g, '\\n'); 
};
