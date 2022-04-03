function secure(text){
    text = text.replace(/'/g, "\\u0027");
    return text;
}

function decode(text){
    text = text.replace(/\\u0027/g, "'");
    return text;
}

function secureId(id){
    id = id.replace(/'/g, "");
    // Regex test if id is a number
    let regexPattern = /^[0-9]*$/;
    if(!regexPattern.test(id)){
        return "";
    }

    return id;
}

module.exports = {
    secure, decode, secureId
}