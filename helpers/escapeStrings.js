export const escapeStrings = (string) => {
    return string
        .replace(/\\/g, '\\\\')   // Escape backslashes
        .replace(/'/g, "\\'")     // Escape single quotes (JS strings)
        .replace(/"/g, '&quot;')  // Escape double quotes (HTML attribute)
        .replace(/</g, '&lt;')    // Escape <
        .replace(/>/g, '&gt;')    // Escape >
        .replace(/&/g, '&amp;')   // Escape &
        .replace(/\n/g, '\\n');   // Optional: Escape newlines
};
