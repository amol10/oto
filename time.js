var log_enabled = false;

function log(str) {
    if (log_enabled) {
        console.log(str);
    }
}

function time_diff(date1, date2) {
    var diff_mins = null;

    var mins1 = date1.getMinutes();
    var mins2 = date2.getMinutes();

    var hours1 = date1.getHours();
    var hours2 = date2.getHours();

    log(`mins1: ${mins1}, mins2: ${mins2}`);
    log(`hours1: ${hours1}, hours2: ${hours2}`);

    var hours_diff = null;
    if (hours2 > hours1) {
        hours_diff = hours2 - hours1;
    }

    var mins_diff = null;
    if (hours2 === hours1) {
        mins_diff = mins2 - mins1;
        log(`mins diff: ${mins_diff}`);
        return mins_diff;
    } else {
        var h_mins = (hours_diff - 1) * 60;
        mins_diff = (60 - mins1) + (mins2) + (h_mins);
        log(`mins diff: ${mins_diff}`);
        return mins_diff;
    }
}

var fail_count = 0;
var success_count = 0;

function log_and_test(i, result, expected) {
    console.log(`test case: ${i}, result: ${result}, expected: ${expected}`);
    if (result !== expected) {
        console.log("failed");
        fail_count++;
    } else {
        success_count++;
    }
}

function test() {
    date1 = new Date("Sun Dec 12 2021 17:21:58 GMT+0530 (IST)");
    date2 = new Date("Sun Dec 12 2021 17:22:58 GMT+0530 (IST)");
    log_and_test(1, time_diff(date1, date2), 1);

    date1 = new Date("Sun Dec 12 2021 17:21:58 GMT+0530 (IST)");
    date2 = new Date("Sun Dec 12 2021 17:32:58 GMT+0530 (IST)");
    log_and_test(2, time_diff(date1, date2), 11);

    date1 = new Date("Sun Dec 12 2021 17:21:58 GMT+0530 (IST)");
    date2 = new Date("Sun Dec 12 2021 18:22:58 GMT+0530 (IST)");
    log_and_test(3, time_diff(date1, date2), 61);

    date1 = new Date("Sun Dec 12 2021 17:21:58 GMT+0530 (IST)");
    date2 = new Date("Sun Dec 12 2021 18:00:58 GMT+0530 (IST)");
    log_and_test(4, time_diff(date1, date2), 39);

    date1 = new Date("Sun Dec 12 2021 17:21:58 GMT+0530 (IST)");
    date2 = new Date("Sun Dec 12 2021 19:00:58 GMT+0530 (IST)");
    log_and_test(5, time_diff(date1, date2), 99);

    date1 = new Date("Sun Dec 12 2021 17:21:58 GMT+0530 (IST)");
    date2 = new Date("Sun Dec 12 2021 19:22:58 GMT+0530 (IST)");
    log_and_test(6, time_diff(date1, date2), 121);

    console.log(`\nsuccess: ${success_count}, failed: ${fail_count}`);
}

test();