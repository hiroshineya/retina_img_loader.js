/**
 * @fileoverview retina iPad時にretina用画像を切替える。
 *               オリジナルのsrcと同じディレクトリに *[suffix].* のファイルが存在することを想定。
 *               めんどくさいので 2x ファイルの存在チェックまでは行わない。
 *               要 jquery。
 * @author  neya
 * @version 0.1.0
 * @date    2012/05/08 新規作成
 */

/**
 * コンストラクタ
 * @param sufx ファイルサフィックス
 *             サフィックスが "_2x" の場合、
 *             通常サイズ:abc.png -> Retinaサイズ:abc_2x.png
 */
var RetinaImgLoader = function(sufx){
    this.img2xSuffix = sufx;
};

/**
 * サフィックス付きのファイル名に変換
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
 * imgタグのロード
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
 * 指定のクラスでスタイルに"background-image"が設定されているものに対してロード
 * @param clsSel 背景指定したクラス名。".class_name"
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

