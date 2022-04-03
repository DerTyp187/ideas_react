function secure(text){
    text = text.replace(/'/g, "\\u0027");
    return text;
}

function decode(text){
    text = text.replace(/\\u0027/g, "'");
    return text;
}

module.exports = {
    secure, decode
}