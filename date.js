//jshint esversion:6

exports.getDate = function () {

    const today = new Date();

    //Javasript date format
    const options = {
        weekday: "long",
        day: 'numeric',
        month: "long"
    };


    //below code is for languages
    return today.toLocaleDateString("en-US", options);
}



exports.getDay = function () {

    const today = new Date();

    //Javasript date format
    const options = {
        weekday: "long",

    };


    //below code is for languages
    return today.toLocaleDateString("en-US", options);
};


