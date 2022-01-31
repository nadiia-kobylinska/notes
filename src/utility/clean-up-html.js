import DOMPurify from 'dompurify'

function cleanUpHTML(string){
    return DOMPurify.sanitize(string,{ USE_PROFILES: { html: true } });
}
export default cleanUpHTML;