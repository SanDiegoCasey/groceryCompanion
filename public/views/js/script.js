'use strict';

$(function(){
  $('.submit-calc').click(function(e){
    e.preventDefault();
    console.log($('#conversion-selector option:selected').text());
    if ($('#conversion-selector option:selected') !== 'oz'){
      console.log('does this also works');
    }
  });
});

// function conversion(price, units, type){
//   if (type.value === 'oz'){
//     console.log('itworksoz');
//   }
// }
