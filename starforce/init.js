//scour the stylesheets and preload any images into a pseudocontainer, then delete the container
$(function() {
    let s = $("style");
    let ip = $("#img_preloader");

    for (let i = 0; i < s.length; ++i) {
        let i_s = s[i].innerHTML;

        let i_img_match = i_s.match(/background: url\((.*)\);/gi);
        
        let i_img_l = i_img_match == null ? 0 : i_img_match.length;
        
        if (i_img_l === 0) continue;

        for (let j = 0; j < i_img_l; ++j) {
            let j_img = i_img_match[j].replace("background: url(","").replace(");","");

            ip.html(`
                <img src="${j_img}">
            `);
        }
    }

    ip.remove();
});