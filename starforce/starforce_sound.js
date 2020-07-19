let sf_audio_files = {
    Enchant: "Enchant.mp3",
    EnchantChanceTime: "EnchantChanceTime.mp3",
    EnchantDelay: "EnchantDelay.mp3",
    EnchantDestroy: "EnchantDestroy.mp3",
    EnchantDestroyed: "EnchantDestroyed.mp3",
    EnchantFail: "EnchantFail.mp3",
    EnchantHyper: "EnchantHyper.mp3",
    EnchantStar1: "EnchantStar1.mp3",
    EnchantStar2: "EnchantStar2.mp3",
    EnchantStar3: "EnchantStar3.mp3",
    EnchantStar4: "EnchantStar4.mp3",
    EnchantStar5: "EnchantStar5.mp3",
    EnchantStarStop: "EnchantStarStop.mp3",
    EnchantStarSuccess: "EnchantStarSuccess.mp3",
    EnchantSuccess: "EnchantSuccess.mp3",
    _BtMouseClick: "BtMouseClick.mp3",
    _BtMouseOver: "BtMouseOver.mp3"
};

let sfa = {
    audio: {},
    volume: 0.4,
    setVolume: function(val) {
        sfa.volume = val;
        for (i in sfa.audio) {
            sfa.audio[i].volume = sfa.volume;
        }
    },
    play: function(s, o) {
        let this_audio = {};

        if (!s.startsWith("_")) {
            this_audio = sfa.audio[s];
        } else {
            this_audio = new Audio("./assets/starforce/sounds/" + sf_audio_files[s]);
        }

        this_audio.volume = sfa.volume;
        
        for (let i in o) {
            this_audio[i] = o[i];
        }

        if (s === "EnchantChanceTime") {
            this_audio.ontimeupdate= function(i) {
                if((this.currentTime / this.duration) > 0.40){
                  this.currentTime = 0;
                  this.play();
                }
            };
        }

        this_audio.play();
    },
    stop: function(s) {
        let this_audio = sfa.audio[s];

        this_audio.pause();
        this_audio.currentTime = 0;
    }
};

for (let i in sf_audio_files) {
    if (i.startsWith("_")) continue;
    sfa.audio[i] = new Audio("./assets/starforce/sounds/" + sf_audio_files[i]);
}

$(function() {
    let body = $("body");
    body.on("input change", "#sf_sound", function() {
        let _this = $(this);
        let val = +_this.val();

        sfa.setVolume(val/100);
    });
});

/*
$("body").on("click", function(){
    sfa.play("EnchantChanceTime", {loop: false});
});
*/