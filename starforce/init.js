//scour the stylesheets and preload any images into a pseudocontainer, then delete the container
$(function() {
    let s = $("style");
    let ip = $("#img_preloader");

    for (let i = 0; i < s.length; ++i) {
        let i_s = s[i].innerHTML;

        let i_img_match = i_s.match(/background: url\((.*)\);/gi) || [];
        let i_img_match2 = i_s.match(/background-image: url\((.*)\);/gi) || [];

        let i_img_m = [...i_img_match, ...i_img_match2];
        
        let i_img_l = i_img_m.length;
        
        if (i_img_l === 0) continue;

        for (let j = 0; j < i_img_l; ++j) {
            let j_img = i_img_m[j].replace("background: url(","").replace("background-image: url(", "").replace(");","");

            ip.html(`
                <img src="${j_img}">
            `);
        }
    }

    ip.remove();
});