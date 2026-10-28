/*
    per star option pickers used by the auto starforce and starforce statistics forms
*/

/*
    checkbox list for picking which stars an option applies to (ex. which stars to starcatch at).
    star n is the attempt from n to n+1 stars. shift + click a star to set every star between it and the last one clicked.
    used by the auto starforce and starforce statistics forms
*/
var star_picker = {
    last: {}, /* last picked stars for each picker, so reopening a form keeps them */

    /* html for a picker with stars 0 to max_star - 1, in rows of 10 */
    html: function(id, max_star) {
        let checked = this.last[id] || [];
        let rows = "";

        for (let i = 0; i < max_star; i += 10) {
            let stars = "";

            for (let j = i; j < Math.min(i + 10, max_star); ++j) {
                stars += `
                    <label class="star-picker-star" title="${j} > ${j + 1} stars">
                        <input type="checkbox" value="${j}" ${checked.includes(j) ? "checked" : ""}> ${j}
                    </label>
                `;
            }

            rows += `<div class="star-picker-row">${stars}</div>`;
        }

        return `
            <div class="star-picker" id="${id}">
                <label class="star-picker-all">
                    <input type="checkbox" ${max_star > 0 && checked.length >= max_star ? "checked" : ""}> [All]
                </label>
                <span class="star-picker-hint">Shift + click to select a range.</span>
                ${rows}
            </div>
        `;
    },

    /* get the checked stars */
    get: function(id) {
        let stars = $(`#${id} .star-picker-star input:checked`).map(function() {
            return +this.value;
        }).get();

        this.last[id] = stars;

        return stars;
    }
};

/*
    enhancement mode level dropdowns for each star it's available at (15-21).
    safeguard checkboxes with data-enhance-picker="<picker id>" are linked to the picker, since safeguard and levels 2-3
    can't be used at the same star. checking safeguard resets that star's level to 1, and picking level 2+ unchecks its safeguard.
    used by the auto starforce and starforce statistics forms
*/
var enhance_mode_picker = {
    last: {}, /* last picked levels for each picker, so reopening a form keeps them */

    html: function(id) {
        let levels = this.last[id] || {};

        return `
            <div class="enhance-mode-picker" id="${id}">
                <label class="enhance-mode-picker-label">
                    [All] <select class="enhance-mode-picker-all">
                        ${[1,2,3,4].map(a => `<option value="${a}">${a}</option>`).join("")}
                    </select>
                </label>
                ${
                    Object.keys(star_enhance_modes).map((a)=>{
                        let modes = star_enhance_modes[a];
                        return `
                            <label class="enhance-mode-picker-label">
                                ${a} <select class="enhance-mode-picker-star" data-star="${a}">
                                    ${[1,2,3,4].map(b => `<option value="${b}" ${b > 1 && !modes[b] ? "disabled" : ""} ${levels[a] === b ? "selected" : ""}>${b}</option>`).join("")}
                                </select>
                            </label>
                        `
                    }).join("")
                }
                <span class="form-footer">
                    Higher levels cost more but boom less. Level 4 can't boom and is only available at 18-21 stars (use Safeguard at 15-17).
                    Safeguard and levels 2-3 can't be used at the same star.
                </span>
            </div>
        `;
    },

    /* get the level for each star as {star: level} */
    get: function(id) {
        let levels = {};

        $(`#${id} .enhance-mode-picker-star`).each(function() {
            levels[$(this).data("star")] = +$(this).val();
        });

        this.last[id] = levels;

        return levels;
    }
};

$(function() {
    /* set the level for all stars. stars without that level use their highest level */
    $(document).on("change", ".enhance-mode-picker-all", function() {
        let level = +this.value;

        $(this).closest(".enhance-mode-picker").find(".enhance-mode-picker-star").each(function() {
            $(this).val(star_enhance_level($(this).data("star"), level)).trigger("change");
        });
    }).on("change", ".enhance-mode-picker-star", function() {
        let id = $(this).closest(".enhance-mode-picker").attr("id");

        if (+this.value > 1) {
            $(`input[data-enhance-picker="${id}"][value="${$(this).data("star")}"]`).prop("checked", false);
        }

        enhance_mode_picker.get(id);
    }).on("change", "input[data-enhance-picker]", function() {
        if (!this.checked) return;

        let id = $(this).attr("data-enhance-picker");
        $(`#${id} .enhance-mode-picker-star[data-star="${this.value}"]`).val(1);
        enhance_mode_picker.get(id);
    });
});

$(function() {
    let range_click = false; /* shift was held when the star was clicked */
    let last_clicked = null;

    $(document).on("mousedown", ".star-picker-star", function(e) {
        range_click = e.shiftKey;
    }).on("change", ".star-picker-star input", function() {
        let picker = $(this).closest(".star-picker");
        let boxes = picker.find(".star-picker-star input");

        if (range_click && last_clicked && $.contains(picker[0], last_clicked)) {
            let a = boxes.index(last_clicked);
            let b = boxes.index(this);
            boxes.slice(Math.min(a, b), Math.max(a, b) + 1).prop("checked", this.checked);
        }

        range_click = false;
        last_clicked = this;

        picker.find(".star-picker-all input").prop("checked", boxes.length === boxes.filter(":checked").length);
        star_picker.get(picker.attr("id"));
    }).on("change", ".star-picker-all input", function() {
        let picker = $(this).closest(".star-picker");
        picker.find(".star-picker-star input").prop("checked", this.checked);
        star_picker.get(picker.attr("id"));
    });
});
