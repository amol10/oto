var log_enabled = false;

function log(str) {
    if (log_enabled) {
        console.log(str);
    }
}

function load_settings() {
    window.settings = JSON.parse(settings_json);

    log(`settings-timeout: ${settings.timeout}`);
}

function set_timeout(timeout) {
    
}