/*
    combos for auto flames and auto cubes. the auto process stops at the first result that matches any of the combos.
    the table shows the chance to roll each combo, and to roll any of them.
*/

/* chance per use and average number of uses to get it */
var format_combo_estimate = function(p, unit) {
    if (p == null) return ["-", "-"];

    if (p === 0) {
        return ["0%", `<span class="auto-combo-never" title="These lines can't be rolled with this ${unit.toLowerCase()}">Never</span>`];
    }

    let pct = p * 100;

    return [
        `${pct >= 0.01 ? +pct.toFixed(2) : +pct.toPrecision(2)}%`,
        Math.round(1 / p).toLocaleString()
    ];
}

/*
    draw the combo table

    con - container for the table
    rows - [{
        labels: lines in the combo (html)
        idx: index of the saved combo. null for the values entered in the form, which aren't saved
        error: reason the combo can't be used. "" if it can
    }]
    unit - what is used to roll the combos (Flame, Cube)

    returns a function to set a row's chance (row = index of rows or "total") once it's calculated
*/
var draw_combo_table = function(con, rows, unit) {
    if (rows.length === 0) {
        con.html("");
        return ()=>{};
    }

    con.html(`
        <table class="auto-combo-table">
            <thead>
                <tr>
                    <th style="width:30px">#</th>
                    <th>${unit} Combo</th>
                    <th style="width:130px" title="Chance for a single ${unit.toLowerCase()} to roll the combo">Chance per ${unit}</th>
                    <th style="width:110px" title="Average number of ${unit.toLowerCase()}s used to roll the combo">Avg. ${unit}s</th>
                    <th style="width:80px"></th>
                </tr>
            </thead>
            <tbody>
                ${
                    rows.reduce((a,b,i)=>{
                        let unsaved = b.idx == null;

                        a += `
                            <tr data-row="${i}" class="${unsaved ? "auto-combo-unsaved" : ""}">
                                <td>${unsaved ? "" : b.idx + 1}</td>
                                <td class="auto-combo-lines">
                                    ${b.labels.reduce((x,y)=>x + `<span class="auto-combo-line">${y}</span>`, "")}
                                    ${unsaved ? `<span class="auto-combo-note">entered above, not saved</span>` : ""}
                                </td>
                                ${
                                    b.error !== "" ? `
                                        <td colspan="2" class="auto-combo-error">${b.error}</td>
                                    ` : `
                                        <td class="auto-combo-chance">...</td>
                                        <td class="auto-combo-avg">...</td>
                                    `
                                }
                                <td>${unsaved ? "" : `<button class="auto-combo-remove" data-idx="${b.idx}">Remove</button>`}</td>
                            </tr>
                        `;

                        return a;
                    }, "")
                }
            </tbody>
            ${
                rows.length > 1 ? `
                    <tfoot>
                        <tr data-row="total" class="auto-combo-total">
                            <td></td>
                            <td class="auto-combo-lines">Any combo</td>
                            <td class="auto-combo-chance">...</td>
                            <td class="auto-combo-avg">...</td>
                            <td></td>
                        </tr>
                    </tfoot>
                ` : ""
            }
        </table>
    `);

    return function(row, p) {
        let [chance, avg] = format_combo_estimate(p, unit);
        let tr = con.find(`tr[data-row="${row}"]`);

        tr.find(".auto-combo-chance").html(chance);
        tr.find(".auto-combo-avg").html(avg);
    };
}

/* item to send to an estimate worker. leaves out the flame and cube logs, which can be large and don't change the estimate */
var combo_estimate_item = function(it) {
    return {
        idata: {
            ...it.idata,
            meta: {
                ...it.idata.meta,
                flames_meta_data: [],
                cube_meta_data: []
            }
        }
    };
}
