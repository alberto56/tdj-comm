class TextUtilities extends Service {

  sanitizeString(str) {
    const noTags = this.removeTags(str);
    const lowercase = noTags.toLowerCase();
    const noAccents = this.cleanUpSpecialChars(lowercase);
    return noAccents.trim();
  }

  sanitizeArray(arr) {
    const sanitized = [];
    for (let i = 0; i < arr.length; i++) {
      const sanitizedString = this.sanitizeString(arr[i]);
      if (sanitizedString.length > 0) {
        sanitized.push(sanitizedString);
      }
    }
    return sanitized;
  }

  removeTags(str) {
    // https://stackoverflow.com/a/41756926/1207752
    return str.replace(/<style[^>]*>.*<\/style>/g, '')
      // Remove script tags and content
      .replace(/<script[^>]*>.*<\/script>/g, '')
      // Remove all opening, closing and orphan HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove leading spaces and repeated CR/LF
      .replace(/([\r\n]+ +)+/g, '');
  }

  cleanUpSpecialChars(str){
    // https://stackoverflow.com/a/18123682/1207752
    return str
      .replace(/[àâ]/g,"a")
      .replace(/[éèê]/g,"e")
      .replace(/[ï]/g,"i")
      .replace(/[ô]/g,"o")
      .replace(/[ç]/g,"c")
      .replace(/[^a-z0-9 ]/gi,'');
  }

}
