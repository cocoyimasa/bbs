export function textToImg(uname) {
    if(!uname) return
    var name = uname.charAt(0) || '';
    if(name.charCodeAt(0) > 'a'.charCodeAt(0) &&
        name.charCodeAt(0) < 'z'.charCodeAt(0)){
        name = name.toUpperCase()
    }
    var fontSize = 125;
    var fontWeight = 'bold';

    var canvas = document.getElementsByTagName('canvas')[0]
    canvas.width = 250;//分辨率尽量大
    canvas.height = 250;
    canvas.style.cssText += 'border-radius:25px;'
    var context = canvas.getContext('2d');
    context.fillStyle = 'lightskyblue';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
    context.textAlign = 'center';
    context.textBaseline="middle";
    context.fillText(name, fontSize, fontSize);
    canvas.toDataURL("image/png")
    return canvas.toDataURL("image/png")
}
