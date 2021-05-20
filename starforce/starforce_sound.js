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
    // _ creates new instances instead of reusing the same one (no longer true with options added)
    _CubeEnchantSuccess: {
        name: "CubeEnchantSuccess.mp3",
        instances: 20 //number of audio channels to initialize. big number incase animation is removed and user goes nuts
    },
    _BtMouseClick: {
        name: "BtMouseClick.mp3",
        instances: 8
    },
    _BtMouseOver: {
        name: "BtMouseOver.mp3",
        instances: 8
    },
    _DragStart: {
        name: "DragStart.mp3",
        instances: 8
    },
    _DragEnd: {
        name: "DragEnd.mp3",
        instances: 8
    }
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

        let this_file = sf_audio_files[s];

        if (typeof this_file === "string") {
            this_audio = sfa.audio[s];
        } else {
            //move through audio instances on audio play. used to allow audio to overlap itself.
            this_audio = sfa.audio[s + "_" + this_file.current_instance];

            ++this_file.current_instance;

            if (this_file.current_instance === this_file.instances) {
                this_file.current_instance = 0;
            }
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

//init audio file and store it in the sound object.
let init_audio_channels = function(i) {
    let saf = sf_audio_files[i];

    let this_audio = "";

    //if the object is string, then it is simply the name of the audio. if it's an object, the it has additional options
    if (typeof saf === "string") {
        this_audio = new Audio("./assets/starforce/sounds/" + sf_audio_files[i]);
        this_audio.preload = "auto";
        sfa.audio[i] = this_audio;
    } else {
        if (saf.instances == undefined) {
            saf.instances = 1;
        }

        //current instance of audio channel to get for particular audio file. increment by 1 when played and reset when it reaches its max instances
        if (saf.current_instance == undefined) {
            saf.current_instance = 0;
        }

        for (let a = 0; a < saf.instances; ++a) {
            this_audio = new Audio("./assets/starforce/sounds/" + sf_audio_files[i].name);
            sfa.audio[i + "_" + a] = this_audio;
        }
    }
};

for (let i in sf_audio_files) {
    init_audio_channels(i);
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