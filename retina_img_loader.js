/**
 * @fileoverview reload image when retina iPad.
 *               original image and 2x image files should exist same directory .
 *               do not check existing 2x image file.
 *               need jquery.
 * @author  neya
 * @version 0.1.0
 * @date    2012/05/08 新規作成
 */

/**
 * constractor
 * @param sufx file suffix
 *             if suffix is "_2x"
 *             origin:abc.png -> retina:abc_2x.png
 */
var RetinaImgLoader = function(sufx){
    this.img2xSuffix = sufx;
};

/**
 * convert filename to "with suffix".
 */
RetinaImgLoader.prototype.convertRetinaSrc = function(orgsrc) {
    var retinasrc = orgsrc;
    var periIdx = orgsrc.lastIndexOf(".");
    if(periIdx>0) {
        retinasrc = orgsrc.substr(0, periIdx) + this.img2xSuffix + orgsrc.substr(periIdx);
    }
    return retinasrc;
};

/**
 * for all "img" tag
 */
RetinaImgLoader.prototype.loadRetinaImage = function() {
    if(window.devicePixelRatio==2) {
        var targetImgs = $("img");
        for(var i=0; i<targetImgs.length; i++) {
            var retinasrc = this.convertRetinaSrc(targetImgs[i].src);
            targetImgs[i].src = retinasrc;
        }
    }
};

/**
 * for certain class tag "background-image" set .
 * @param clsSel class name. e.x. ".class_name"
 */
RetinaImgLoader.prototype.loadRetinaBgImage = function(clsSel) {
    if(window.devicePixelRatio==2) {
        var targetDivs = $(clsSel);
        for(var i=0; i<targetDivs.length; i++) {
            var div = $(targetDivs[i]);
            var bgsrc = div.css("background-image");
            if(bgsrc=="none") {
                continue;
            }
            bgsrc = bgsrc.replace(")", "");
            bgsrc = bgsrc.replace("url(", "");
            var retinasrc = this.convertRetinaSrc(bgsrc);
            div.css("background-image", "url(" + retinasrc + ")");
            
        }
    }
};

