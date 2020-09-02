//scour the stylesheets and preload any images into a pseudocontainer, then delete the container
//this is to force the preloading of images so that the images don't just jitter on the screen when they're first shown because they didn't load until they were called
$(function() {
    let s = $("style");
    let ip = $("#img_preloader");

    for (let i = 0; i < s.length; ++i) {
        let i_s = s[i].innerHTML;

        let i_img_match = i_s.match(/background: url\((.*)\);/gi) || [];
        let i_img_match2 = i_s.match(/background-image: url\((.*)\);/gi) || [];
        let i_img_match3 = i_s.match(/border-image: url\((.*)\);/gi) || [];

        let i_img_m = [...i_img_match, ...i_img_match2, ...i_img_match3];
        
        let i_img_l = i_img_m.length;
        
        if (i_img_l === 0) continue;

        for (let j = 0; j < i_img_l; ++j) {
            let j_img = i_img_m[j].replace("background: url(","").replace("background-image: url(", "").replace("border-image: url(", "").replace(");","");

            ip.html(`
                <img src="${j_img}">
            `);
        }
    }

    ip.remove();
});