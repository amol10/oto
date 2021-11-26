
window.sounds_data = JSON.parse(sounds_json);
console.log(sounds_data);
//sed replace>

var heartbeat = new Howl({
    src: ['sounds/misc/ding2.mp3'],
    volume: 0.1
});



window.muteSounds = false;
function shutdown() {
    //console.log("in shutdown");
    for (var sound in sounds) {
        //console.log(sound);
        jQuery("#" + sound).prop("checked", false);
    }
}

function mute() {
    if (window.muteSounds == false) {
        window.muteSounds = true;
        jQuery("#mute").prop("value", "Unmute");
    } else {
        window.muteSounds = false;
        jQuery("#mute").prop("value", "Mute");
    }
}

function chaos() {
    if (confirm("Are you sure?")) {
        for (var sound in sounds) {
            jQuery("#" + sound).prop("checked", true);
            jQuery("#" + sound + "-mdelay").prop("value", parseInt(Math.random() * 30));
        }
    }
}


function volume(category, sound) {
    var v = jQuery('#' + category + '-' + sound + '-volume').prop('value');
    console.log(v / 100);

    var s = sounds_data[category][sound];

    //to do: store it in a volume variable
    console.log("volume: ", v);
    if (s['audio'] === null) {
        s['audio'] = new Howl({
            src: [s['file']],
            volume: v / 100
        });
    } else {
        s['audio'].volume(v / 100);
    }
}

function set_timer(sound) {
    var t = jQuery('#' + sound + '-at').prop('value');
    console.log(t);
    sounds[sound]['timer'] = t;
}

function cat_snd(category, sound) {
    return category + '-' + sound;
}

function list_sounds() {
    console.log("in list_sounds");
    console.log(window.sounds_data);
    for (var category in window.sounds_data) {
        console.log("category:", category);
        var sounds = sounds_data[category];
        for (var sound in sounds) {
            var s = sounds[sound];
            //console.log(s);
            s['timer'] = null;

            var tr = jQuery("<tr>", {}).appendTo("#sounds-table");
            var catsnd = cat_snd(category, sound);
            
            var td = jQuery("<td>", {}).appendTo(tr);
            jQuery("<input>", {
                id: catsnd,
                type: "checkbox",
                class: "form-check-input"
            }).appendTo(td);

            var td = jQuery("<td>", {}).appendTo(tr);
            jQuery("<label>", {
                for: catsnd,
                text: sound
            }).appendTo(td);

            var td = jQuery("<td>", {}).appendTo(tr);
            jQuery("<input>", {
                id: catsnd + "-mdelay",
                type: "number",
                min: 0,
                max: 5000,
                step: 10,
                //size: 1,
                style: "text-align:right",
                class: "form-control",
                value: sounds[sound]["mdelay"]
            }).appendTo(td);

            var td = jQuery("<td>", {}).appendTo(tr);
            jQuery("<input>", {
                id: catsnd + "-volume",
                type: "range",
                class: "form-range px-2",
                min: 0,
                max: 100,
                value: 100
            }).appendTo(td);
            
            jQuery('#' + sound + '-volume').attr('onchange', 'volume(\"' + category + '\', \'' + sound + '\")');

            var td = jQuery("<td>", {}).appendTo(tr);
            jQuery("<input>", {
                id: catsnd + "-at",
                type: "time",
                class: "form-control"
            }).appendTo(td);

            var td = jQuery("<td>", {}).appendTo(tr);
            jQuery("<input>", {
                id: catsnd + "-at-btn",
                type: "button",
                class: "btn btn-primary btn-sm",
                value: "set"
            }).appendTo(td);

            jQuery('#' + catsnd + '-at-btn').attr('onclick', 'set_timer(\"' + catsnd + '\")');

            //jQuery("<br>").appendTo("#sounds");
            //$("#sounds").append("<label for=\"" + sound + "\">" + sound + "</label><br>");
        }
    }
}


/*jQuery.get("data://list.txt", function(data) {
    console.log(data);
});*/
console.log("script")
function checker() {
    /*if (document.querySelector("#ding2:checked") !== null) {
        console.log("in checker if")
        var ding2 = new Audio("ding2.mp3");
        ding2.play();
        setTimeout(checker, 1000);
        return;
    }
    setTimeout(checker, 1000);*/

    for (var category in window.sounds_data) {
        var sounds = sounds_data[category];
        for (var sound in sounds) {
            if (window.muteSounds) {
                continue;
            }
            var catsnd = cat_snd(category, sound);
            var s = sounds[sound];
            if (document.querySelector("#" + catsnd + ":checked") !== null) {
                console.log("checked");
                s["mdelay"] = parseInt(jQuery("#" + catsnd + "-mdelay")[0].value);
                console.log(sound, sounds[sound]["mdelay"], sounds[sound]["sleep"]);
                if (isNaN(s["sleep"])) {
                    s["sleep"] = parseInt(Math.random() * s["mdelay"]);
                    continue;
                }
                if (s["sleep"] == 0) {
                    if (s['audio'] === null) {
                        //sounds[sound]['audio'] = new Audio(sounds[sound]['file']);
                        s['audio'] = new Howl({
                            src: [s['file']],
                            volume: 1
                        });
                    }
                    //var s = new Audio(sounds[sound]["file"]);
                    s['audio'].play();
                    s["sleep"] = parseInt(Math.random() * s["mdelay"]);
                } else {
                    s["sleep"]--;
                }
            }

            if (timer(s)) {
                if (s['audio'] === null) {
                        //sounds[sound]['audio'] = new Audio(sounds[sound]['file']);
                        s['audio'] = new Howl({
                            src: [s['file']],
                            volume: 1
                        });
                    }
                    //var s = new Audio(sounds[sound]["file"]);
                s['audio'].play();    
            }
        }
    }
    //alive();
    setTimeout(checker, 1000);
}
checker()

function timer(s) {
    if (s['timer'] === null) {
        return false;
    }
    var d = new Date();
    var current_time = d.getHours() + ":" + d.getMinutes();
    //console.log("current time: ", current_time);
    if (current_time.localeCompare(s['timer']) == 0) {
        //console.log("timer on");
        s['timer'] = null;
        return true;
    }
    return false;
}

function alive() {
    //sheartbeat.play();
}


function perfmon() {
    var mem = window.performance.memory;
    jQuery('#jsHeapSizeLimit').text(mem.jsHeapSizeLimit);
    jQuery('#totalJSHeapSize').text(mem.totalJSHeapSize);
    jQuery('#usedJSHeapSize').text(mem.usedJSHeapSize);

    setTimeout(perfmon, 2000);
}
perfmon();

