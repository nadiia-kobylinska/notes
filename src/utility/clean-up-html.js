Element.prototype.removeAttributes = function(...attrs) {
    attrs.forEach(attr => this.removeAttribute(attr))
}
function cleanUpHTML(el,tags){
    el.querySelectorAll(tags).forEach((e)=>{
        e.remove();
    });
    el.querySelectorAll('*').forEach((e) =>{
        if(e.style.position === 'fixed'){
            e.style.position = 'absolute'
        }
        e.removeAttributes('data-ga ','id', 'onclick','data-google-query-id','itemprop');
    })
}
export default cleanUpHTML;