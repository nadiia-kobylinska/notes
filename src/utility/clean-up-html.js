Element.prototype.removeAttributes = function(attrs) {
    attrs.forEach(attr => this.removeAttribute(attr))
}
function cleanUpHTML(el,tags, attr=[]){
    el.querySelectorAll(tags).forEach((e)=>{
        e.remove();
    });
    el.querySelectorAll('*').forEach((e) =>{
        if(e.style.position === 'fixed'){
            e.style.position = 'absolute'
        }
        e.removeAttributes(attr);
    })
}
export default cleanUpHTML;