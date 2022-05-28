let cube_line_stats = {
    stats: function(tier) {
        let level = this.idata.level;

        let s = 0;
        
        if (level <= 20) {
            s = 1;
        } else if (level <= 40) {
            s = 2;
        } else if (level <= 50) {
            s = 3;
        } else if (level <= 70) {
            s = 4;
        } else if (level <= 90) {
            s = 5;
        } else {
            s = 6
        }

        if (tier > 1) {
            s *= 2;
        }

        return s;
    },
    hp_mp_def: function(level) {
        let s = 0;
        let max_level = 120;
        let e_level = level;

        if (level > max_level) {
            e_level = max_level;
        }

        for (let i = 0; i <= e_level; i += 10) {
            s += 5;
        }

        return s;
    }
};