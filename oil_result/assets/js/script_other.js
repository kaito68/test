//FAQ関連

$(function(){
  //プルダウンの設定
  $('#toFAQ1').click(function () {
    $("html,body").animate({scrollTop:$('#faq_1').offset().top});
  });

  $('#toFAQ2').click(function () {
    $("html,body").animate({scrollTop:$('#faq_2').offset().top});
  });

  $('#toFAQ3').click(function () {
    $("html,body").animate({scrollTop:$('#faq_3').offset().top});
  });

  // アコーディオンパネルの設定
  $('.js-faq_question > dd').hide();
  $('.js-faq_question > dt')
    .click(function(e){
      //選択したパネルを開く
      $('+dd', this).slideToggle(500);
    })

});
