
imageApiBase = "https://randomfox.ca/floof/";
quoteApiBase = "https://api.adviceslip.com/advice";

frameOffset = 20;                                   //Frame Width Offset Min 10 Max 200
imageMaxHeight = 300;                               //Display Maximum Heigth

imageDiv = document.getElementById("image");
frameDiv = document.getElementById("frame");
quoteDiv = document.getElementById("quote");

SetAction();

function SetQuote() {
    $.getJSON(quoteApiBase, function (data) {
        var quote = data.slip[ "advice" ]
        quoteDiv.innerHTML = quote;
    })
}

function SetPhoto() {


    $.getJSON(imageApiBase, function (data) {

        imageUrl = "";
        image = new Image();
        this.imageUrl = data.image;
        imageDiv.src = this.imageUrl;

        getMeta(
            this.imageUrl,
            function (width, height) {
                if (height > imageMaxHeight) {
                    var ratio = height / imageMaxHeight;
                    frame.setAttribute("style", "width:" + ((width / ratio) + frameOffset) + "px;" + "height:" + (imageMaxHeight + frameOffset) + "px; border-width:" + frameOffset / 2 + "px;");
                }
                else
                    frame.setAttribute("style", "width:" + (width + frameOffset) + "px;" + "height:" + (imageMaxHeight + frameOffset) + "px; border-width:10px;");
            }
        );

    })
}
function getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function () { callback(this.width, this.height); }
}

function SetAction() {

    SetPhoto();
    SetQuote();
}