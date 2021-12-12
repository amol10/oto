const fs = require('fs');

function getDirs(path) {
    return fs.readdirSync(path, (f) => {
        return fs.statSync(path + '/' + f).isDirectory();
    })
}

function getFiles(path) {
    try {
        return fs.readdirSync(path, (f) => {
            return fs.statSync(path + '/' + f).isFile();
        });
    } catch {
        return null;
    }
}

var dirs = getDirs("sounds");
console.log(dirs);

var sounds = {};

for (var i = 0; i < dirs.length; i++) {
    var dir = dirs[i];
    console.log(dir);
    sounds[dirs[i]] = {};
    var d = sounds[dirs[i]];
    
    var files = getFiles('sounds/' + dir);
    console.log(files);

    for (var j = 0; j < files.length; j++) {
        var file = files[j];
        var name = file.substr(0, file.indexOf('.'));
        d[name] = {
            'file': 'sounds/' + dir + '/' + file,
            'mdelay': 60,
            'audio': null,
            'timer': null,
            'start_time': null
        } 
    }
}

console.log(sounds);

var content = "sounds_json = '" + JSON.stringify(sounds) + "';";
fs.writeFileSync("sounds.json", content, err => {
    console.log("error writing sounds.js");
});