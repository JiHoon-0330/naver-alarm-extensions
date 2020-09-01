window.onload = function() {
    chrome.storage.local.get('test',function(result){
        document.getElementById('alarmMemo').innerHTML = result['test'];
        
    });
}

$(function(){
    var gradation = {
      $content: $(".js-target"),
      scroll: function(){
        bodyHeight = $(".js-target").height(),
          scrollTop = $(document).scrollTop();
        rate = scrollTop/bodyHeight+0.9763033175;
        grade = "linear-gradient("+(rate*45)+"deg, rgba(157,237,244,1) 0%, rgba(157,237,244,0) 70%),linear-gradient("+(rate*135)+"deg, rgba(235,170,236,1) 10%, rgba(235,170,236,0) 80%),linear-gradient("+(rate*225)+"deg, rgba(170,236,170,1) 10%, rgba(170,236,170,0) 80%),linear-gradient("+(rate*315)+"deg, rgba(244,234,122,1) 100%, rgba(244,234,122,0) 70%)";
        gradation.$content.css({
          background: grade
        });
      }
    };
    $(window).scroll(function(){
      gradation.scroll();
      console.log('test')
    });
  });