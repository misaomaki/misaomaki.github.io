let marvel_audio = {
    Start: {
        name: "start_spin.mp4",
        instances: 2
    },
    Double: {
        name: "double_spin.mp4",
        instances: 2
    },
    StartFast: {
        name: "start_noAnimation.mp4",
        instances: 2
    }
};

let mva = {
    audio: {},
    volume: 0.4,
    playback: 1,
    setVolume: function(val) {
        mva.volume = val;
        for (i in mva.audio) {
            let this_file = marvel_audio[i];

            if (typeof this_file === "string") {
                mva.audio[i].volume = mva.volume;
            } else {
                for (let j in mva.audio[i]) {
                    mva.audio[i][j].volume = mva.volume;
                }
            }
        }
    },
    setSpeed: function(val) {
        mva.playback = val;
        /*
        for (i in mva.audio) {
            mva.audio[i].playbackRate = mva.playback;
        }
        */
    },
    play: function(s, o) {
        let this_audio = {};

        let this_file = marvel_audio[s];

        if (typeof this_file === "string") {
            this_audio = mva.audio[s];
        } else {
            //move through audio instances on audio play. used to allow audio to overlap itself.
            this_audio = mva.audio[s][s + "_" + this_file.current_instance];

            ++this_file.current_instance;

            if (this_file.current_instance >= this_file.instances) {
                this_file.current_instance = 0;
            }

            //play any audi-specific events
            for (let i in this_file.events) {
                this_audio[i] = this_file.events[i];
            }
        }

        this_audio.volume = mva.volume;
        
        for (let i in o) {
            this_audio[i] = o[i];
        }

        this_audio.play();
    },
    stop: function(s) {
        let this_file = marvel_audio[s];
        let this_audio = {};

        if (typeof this_file === 'string') {
            this_audio = mva.audio[s];
            this_audio.pause();
            this_audio.currentTime = 0;
        } else {
            //pause and reset all channels for an audio file
            for (let i in mva.audio[s]) {
                this_audio =  mva.audio[s][i];
                this_audio.pause();
                this_audio.currentTime = 0;
            }
        }
    },
    stopAll: function() {
        for (let audio in marvel_audio) {
            mva.stop(audio);   
        }
    }
};

//init audio file and store it in the sound object.
let init_audio_channels = function(i) {
    let saf = marvel_audio[i];

    let this_audio = "";

    //if the object is string, then it is simply the name of the audio. if it's an object, the it has additional options
    if (typeof saf === "string") {
        this_audio = new Audio("./marvel2/assets/sound/" + marvel_audio[i]);
        this_audio.preload = "auto";
        mva.audio[i] = this_audio;
    } else {
        if (saf.instances == undefined) {
            saf.instances = 1;
        }

        if (saf.events == undefined) {
            saf.events = {};
        }

        //current instance of audio channel to get for particular audio file. increment by 1 when played and reset when it reaches its max instances
        if (saf.current_instance == undefined) {
            saf.current_instance = 0;
        }

        if (mva.audio[i] == undefined) {
            mva.audio[i] = {};
        }

        for (let a = 0; a < saf.instances; ++a) {
            this_audio = new Audio("./marvel2/assets/sound/" + marvel_audio[i].name);
            mva.audio[i][i + "_" + a] = this_audio;
        }
    }
};

for (let i in marvel_audio) {
    init_audio_channels(i);
}

/*
$("body").on("click", function(){
    mva.play("EnchantChanceTime", {loop: false});
});
*/