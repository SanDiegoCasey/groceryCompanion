'use strict';

$(function() {
  $('.submit-calc').click(function(e) {
    let selected = $('#conversion-selector option:selected').val();
    let qty = $('#unitQty').val();
    let prc = $('#price').val();
    console.log(selected);
    console.log(qty);
    console.log(prc);
    let perOz = (prc / qty).toFixed(2);
    console.log(perOz);
    let perLb = (perOz * 16).toFixed(2);
    console.log(perLb);
    let perLbByLb = (prc / qty).toFixed(2);
    let perOzByLb = (prc / (qty * 16)).toFixed(2);
    let perLtByOz = (prc / (qty / 33.814)).toFixed(2);
    let perGByLb = ((prc / qty) * 453.592).toFixed(2);
    let perGaByOz = ((prc / qty) * 128).toFixed(2);

    e.preventDefault();
    document.getElementById('unit-result').innerHTML = '';
    if (selected === 'oz') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLb}</span> per pound<br>\
      <span class="computed-price">$${perOz}</span> per ounce<br>\
      <span class='computed-price'>$${perLtByOz}</span> per liter<br>\
      <span class='computed-price'>$${perGaByOz}</span> per gallon`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
    } else if (selected === 'lbs') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLbByLb}</span> per pound<br>\
      <span class="computed-price">$${perOzByLb}</span> per ounce<br>\
      <span class='computed-price'>$${perGByLb}</span> per gram.`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
      return false;
    }
  });
});

var MOCK_PRODUCTS = {
  'products': [
    {
      'id': '111',
      'name': 'Roma Tomatoes',
      'units': 'per lb',
      'stores': [
        {
          'id': 1,
          'storeLogo': 'images/icons/grocery/icon-grocery-vons.jpg',
          'store1price': 1.99
        },
        {
          'id': 2,
          'storeLogo': 'images/icons/grocery/icon-grocery-walmart.jpg',
          'store2price': 1.49
        },
        {
          'id': 3,
          'storeLogo': 'images/icons/grocery/icon-grocery-wholefoods.jpg',
          'store3price': 1.89
        }
      ]
    },
    {
      'id': '222',
      'name': 'Red Pepper',
      'units': 'each',
      'stores': [
        {
          'id': 1,
          'storeLogo': 'images/icons/grocery/icon-grocery-vons.jpg',
          'store1price': 1.49
        },
        {
          'id': 2,
          'storeLogo': 'images/icons/grocery/icon-grocery-walmart.jpg',
          'store1price': .99
        },
        {
          'id': 3,
          'storeLogo': 'images/icons/grocery/icon-grocery-wholefoods.jpg',
          'store1price': 1.99
        }
      ]
    },
    {
      'id': '333',
      'name': 'Almonds',
      'units': 'per oz',
      'prices': [
        { '_id': 1,
          'price': .99,
          'store': {
          'storeLogo': 'images/icons/grocery/icon-grocery-walmart.jpg'}
        },
        { '_id'
          'price': .89,
          'store': {
          'storeLogo': 'images/icons/grocery/icon-grocery-vons.jpg'}
        },
        { '_id': 2,
          'price': 1.19,
          'store': {
          'storeLogo': 'images/icons/grocery/icon-grocery-wholefoods.jpg'}
        },
      ]
      'stores': [
        {
          'id': 1,
          'storeLogo': 'images/icons/grocery/icon-grocery-vons.jpg',
          'store1price': 1
        },
        {
          'id': 2,
          'storeLogo': 'images/icons/grocery/icon-grocery-walmart.jpg',
          'store1price': .62
        },
        {
          'id': 3,
          'storeLogo': 'images/icons/grocery/icon-grocery-wholefoods.jpg',
          'store1price': .75
        }
      ]
    }
  ]
};

var MOCK_STORES = {
  'stores': [
    {
      'id': 1,
      'name': '7 Eleven',
      'storeLogo':'images/icons/grocery/icon-grocery-7eleven.png'
    },
    {
      'id': 2,
      'name': 'Albertsons',
      'storeLogo':'images/icons/grocery/icon-grocery-albertsons.png'
    },
    {
      'id': 3,
      'name': 'COSTCO',
      'storeLogo':'images/icons/grocery/icon-grocery-costco.png'
    },
    {
      'id': 4,
      'name': 'Food Lion',
      'storeLogo':'images/icons/grocery/icon-grocery-foodlion.png'
    },
    {
      'id': 5,
      'name': 'Jewel Osco',
      'storeLogo':'images/icons/grocery/icon-grocery-jewelosco.png'
    },


    {
      'id': 6,
      'name': 'Kroger',
      'storeLogo':'images/icons/grocery/icon-grocery-kroger.png'
    },
    {
      'id': 7,
      'name': 'Meijer',
      'storeLogo':'images/icons/grocery/icon-grocery-meijer.png'
    },
    {
      'id': 8,
      'name': 'Publix',
      'storeLogo':'images/icons/grocery/icon-grocery-publix.png'
    },
    {
      'id': 9,
      'name': 'Ralphs',
      'storeLogo':'images/icons/grocery/icon-grocery-ralphs.png'
    },
    {
      'id': 10,
      'name': 'Safeway',
      'storeLogo':'images/icons/grocery/icon-grocery-safeway.png'
    },
    {
      'id': 11,
      'name': 'Sams Club',
      'storeLogo':'images/icons/grocery/icon-grocery-sams.png'
    },
    {
      'id': 12,
      'name': 'Sprouts',
      'storeLogo':'images/icons/grocery/icon-grocery-sprouts.png'
    },
    {
      'id': 13,
      'name': 'Store Blue',
      'storeLogo':'images/icons/grocery/icon-grocery-storeblue.png'
    },
    {
      'id': 14,
      'name': 'Store Green',
      'storeLogo':'images/icons/grocery/icon-grocery-storegreen.png'
    },
    {
      'id': 15,
      'name': 'Store Orange',
      'storeLogo':'images/icons/grocery/icon-grocery-storeorange.png'
    },
    {
      'id': 16,
      'name': 'Store Red',
      'storeLogo':'images/icons/grocery/icon-grocery-storered.png'
    },
    {
      'id': 17,
      'name': 'Store Yellow',
      'storeLogo':'images/icons/grocery/icon-grocery-storeyellow.png'
    },
    {
      'id': 18,
      'name': 'Target',
      'storeLogo':'images/icons/grocery/icon-grocery-target.png'
    },
    {
      'id': 19,
      'name': 'Trader Joes',
      'storeLogo':'images/icons/grocery/icon-grocery-traderjoes.png'
    },
    {
      'id': 20,
      'name': 'Sams Club',
      'storeLogo':'images/icons/grocery/icon-grocery-sams.png'
    },
    {
      'id': 21,
      'name': 'Sams Club',
      'storeLogo':'images/icons/grocery/icon-grocery-sams.png'
    },
    {
      'id': 22,
      'name': 'Sams Club',
      'storeLogo':'images/icons/grocery/icon-grocery-sams.png'
    },
    {
      'id': 23,
      'name': 'Sams Club',
      'storeLogo':'images/icons/grocery/icon-grocery-sams.png'
    },
    {
      'id': 24,
      'name': 'Sams Club',
      'storeLogo':'images/icons/grocery/icon-grocery-sams.png'
    },



  ]
}
