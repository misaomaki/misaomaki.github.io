const cube_rates = {
    stat_tiers: {
        flat_stat: 0, 
        percent_stat: 0,
        percent_def: 0,
        flat_def: 0,
        hpmp: 0
    },
    /* based on level of item, get the index of its stat tier, which will determine its stats */
    stat_tier_ranges: {
        flat_Stats: [20, 40, 50, 70, 90, 150],
        percent_stats: [30, 70, 150],
        percent_def: [30, 70, 150],
        flat_def: [10,20,30,40,50,60,70,80,90,90,100,110,150],
        hpmp: [30, 70, 150]
    },
    get_stat_tier_index(stat_tier_range = [], level = 0) {    
        for (let i = 0; i < stat_tier_range.length; i++) {
            if (level <= stat_tier_range[i]) {
                return i;
            }
        }
    
        return stat_tier_range.length; 
    },
    /* this - Item */
    get_item_stat_tiers() {
        function get_stat_tier_index(level) {
            const ranges = [20, 40, 50, 70, 90, 150]; 
        
            for (let i = 0; i < ranges.length; i++) {
                if (level <= ranges[i]) {
                    return i;
                }
            }
        
            return ranges.length; 
        }
        
    }
};