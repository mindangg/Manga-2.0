const removeSpecialChar = (str) => {
    return str.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

module.exports = removeSpecialChar