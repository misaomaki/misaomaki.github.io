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
    // _ creates new instances instead of reusing the same one
    _CubeEnchantSuccess: "CubeEnchantSuccess.mp3",
    _BtMouseClick: "BtMouseClick.mp3",
    _BtMouseOver: "BtMouseOver.mp3",
    _DragStart: "DragStart.mp3",
    _DragEnd: "DragEnd.mp3"
};

let sfa = {
    audio: {},
    volume: 0.4,
    playback: 1,
    setVolume: function(val) {
        sfa.volume = val;
        for (i in sfa.audio) {
            sfa.audio[i].volume = sfa.volume;
        }
    },
    setSpeed: function(val) {
        sfa.playback = val;
        /*
        for (i in sfa.audio) {
            sfa.audio[i].playbackRate = sfa.playback;
        }
        */
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
    let sound_display = $("#sf_sound_display");
    let playback_display = $("#sf_playback_display");
    let vAnimation = $("#variableAnimation");
    body.on("input change", "#sf_sound", function() {
        let _this = $(this);
        let val = +_this.val();

        sfa.setVolume(val/100);
        sound_display.html(val);
    });

    body.on("input change", "#sf_playback", function() {
        let _this = $(this);
        let val = +_this.val();

        sfa.setSpeed(val);
        playback_display.html(val === 10 ? "None" : val.toFixed(1));
        system.animation_speed = val;

        system.animation_speed_actual = system.animation_speed == 10 ? 0 : 1/system.animation_speed;

        vAnimation.html("");
        for (let i in css_animation_speed) {
            let alength = css_animation_speed[i];

            vAnimation.append(`
                .${i}.sf-variable-animation {
                    animation-duration: ${alength/val}s;
                }
            `);
        };
    });
});

/*
$("body").on("click", function(){
    sfa.play("EnchantChanceTime", {loop: false});
});
*/