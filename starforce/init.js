//scour the stylesheets and append them to the body with link as image tag
//this is to force the preloading of images so that the images don't just jitter on the screen when they're first shown because they didn't load until they were called
$(function() {
    //inline css
    if (true) {
        let s = $("style");
        let new_style = "";
        let new_image = "";

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

                new_style += `
                    url(${j_img})
                `;
            }
        }

        /*
            scour stylesheets from misaomaki github (link tags) and get images to preload. 
            (
                does not work locally and will result in CORS errors. only works while on the git site.
                if local detected, then exit and don't do it
            )
        */
        let ss = document.styleSheets;

        for (let i in ss) {
            let s = ss[i];
        
            if (s.href === undefined || s.href === null || (!s.href.includes("misaomaki") && !s.href.includes(":5500"))) continue; //inline or not from git domain (css from cdns and whatnot)
            if (s.href.includes("/css/")) continue; /* not a core css file for starforcing */
            //local host detected, so don't even bother trying
            if (s.href.startsWith("file://")) break;

            let css = s.cssRules;
        
            for (let j in css) {
                let rule = css[j];
                let cssText = rule.cssText;

                if (cssText === undefined) continue;
                
                if (
                    !cssText.includes("background-image") &&
                    !cssText.includes("background")
                ) continue;

                /* get the url in the background CSS url style */
                let bimg_match = cssText.match(/url\(["']?([^"')]+)["']?\)/);

                if (bimg_match == null || bimg_match === undefined || bimg_match.length < 1) continue;

                let bimg = bimg_match[1];
                
                /* ignore any data images */
                if (bimg.includes("data:image")) continue;

                new_style += `
                    <link rel="preload" href="${bimg}" as="image" media="(min-width: 600px)">
                `;

                new_image += `
                    url(${bimg})
                `;
            }
        }

        /* prepend preloaded images to head */
        $("head").prepend(new_style);

        /* stop chrome from complaining that preloaded images are not used right away */
        new_image = `
            body::after {
                content: ${new_image};
            }
        `;
        $("body").append(`
            <style id="preload_style">
            ${new_image}
            </style>
        `);
        setTimeout(()=>{
            $("#preload_style").remove();
        },100);
     }
});







//random functions
//Durstenfeld shuffle
var shuffle = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

//generate a pseudo-random number
var prng = function() {
    let arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    let m = (arr[0] * Math.pow(2,20)) + (arr[1] >>> 12)
    return m * Math.pow(2,-52);
};

Number.prototype.toNumber = function() {
    return this.toLocaleString();
}

/* chatgpt */
String.prototype.capitalize = function() {
  let sentence = this;

  // Split the sentence into an array of words
  let words = sentence.split(' ');

  // Capitalize the first letter of each word
  let capitalizedWords = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a sentence
  let capitalizedSentence = capitalizedWords.join(' ');

  return capitalizedSentence;
}

//pass the generate_r_map result into this and then use a pseudrorandom number
//to check against that map. return true if it
//provides a callback that passes the generated random value
var r_map_result = function(r_map, cb = ()=>{}) {
    let this_rng = prng();

    cb(this_rng);

    for (let i in r_map) {
        let i_r = r_map[i];

        for (let j = 0; j < i_r.length; ++j) {
            let j_r = i_r[j];

            let a = j_r[0];
            let b = j_r[1];

            if (this_rng >= a && this_rng < b) {
                return i;
            }
        }
    }

    //if reaches here, then the r_map did not go from 0 to 1 and a rng value
    //fell outside of the range
    return undefined;
}

//generate a random result map based off an initial map input
//genericized version from the item prototype function
//provides a callback that passes the r map
var generate_r_map = function(sr, cb = ()=>{}) {
    let poffset = prng();

    //randomize the catch map so that the result types are not always in the same order
    let catch_map = {};

    let catch_type = Object.keys(sr);

    shuffle(catch_type);

    let i_start = 0;
    let i_current = 0;
    for (let i = 0; i < catch_type.length; ++i) {
        let _i = catch_type[i];

        i_current += sr[_i];
        
        catch_map[_i] = [
            i_start,
            i_current
        ];

        i_start = i_current;
    }

    let catch_map_offset = {};

    for (let i in catch_map) {
        let cval1 = catch_map[i][0] + poffset;
        let cval2 = catch_map[i][1] + poffset;

        if (cval2 - cval1 === 0) continue;

        catch_map_offset[i] = [];

        if (cval2 <= 1) {
            catch_map_offset[i].push([
                cval1,
                cval2
            ]);
        } else if (cval1 < 1 && cval2 > 1) {
            catch_map_offset[i].push([
                cval1,
                1
            ]);

            catch_map_offset[i].push([
                0,
                cval2 - 1
            ]);
        } else {
            catch_map_offset[i].push([
                cval1 - 1,
                cval2 - 1
            ]);
        }
    }

    cb(catch_map_offset);

    return catch_map_offset;
}

//combines the r_map generation function with the result determination function
//cb1 is the callback for r map generation. cb2 is the callback for map result determination
var get_random_result = function(sr, cb1 = ()=>{}, cb2 = ()=>{}) {
    let grm = generate_r_map(sr, cb1);

    let rms = r_map_result(grm, cb2);

    return rms;
}

//for ids
var generateUUID = function() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

var congrats_from_maki = function(owo = false) {
    if (!owo && prng() > 0.001) {
        return;
    }

    let id = generateUUID();

    $("#OwOContainmentField").append(`
        <div id="${id}" class="maki"></div>
    `);

    setTimeout(()=>{
        $("#" + id).addClass("maki-goodbye");
        setTimeout(()=>{
            $("#" + id).remove();
        },3300);
    },4000);
}
$(function() {
    $("#OwOContainmentField").on("click", ".maki", function() {
        const _this = $(this);
        if (_this.hasClass("maki-goodbye")) return false;
        _this.addClass("maki-goodbye");
    });
});

var HtmlEncode = function(s) {
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}



/* 
    remove percent items from a list of probabilities then recalculate those probabilities in portion to each other 
    example: {a: 25, b: 25, c: 50} -> remove c -> {a: 50, b: 50} -> remove b -> {a: 33, c: 67 }
*/
function redistributePercentages(obj, removedKeys = []) {
    let entries = Object.entries(obj);

    // Filter out removed keys
    let remainingEntries = removedKeys.length > 0 ? entries.filter(([key]) => !removedKeys.includes(key)) : entries;

    // Calculate the remaining total
    let remainingTotal = remainingEntries.reduce((sum, [, value]) => sum + value, 0);

    // Compute expansion factor
    let expansionFactor = 1 / remainingTotal;

    // Apply expansion factor to redistribute values
    let newPercentages = Object.fromEntries(
        remainingEntries.map(([key, value]) => [key, value * expansionFactor])
    );

    return newPercentages;
}
