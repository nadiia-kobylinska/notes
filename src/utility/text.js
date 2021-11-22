export function truncate(str, limit) {
    return str.length > limit ? str.substring(0, limit-1) + "..." : str;
}
export function plainText(str) {
    const regex = /(<([^>]+)>)/ig;
    return str.replace(regex, '');
}