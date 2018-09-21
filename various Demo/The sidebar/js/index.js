$(function () {
    var hasShow = false;
    $(".text1").click(function () {
        hasShow = !hasShow;
        if (hasShow) {
            $(".left-nav").stop(true).animate({
                left: 0
            },500,"linear");
        }else{
            $(".left-nav").stop(true).animate({
                left: -300 + "px"
            },500,"linear");
        }
    })
});