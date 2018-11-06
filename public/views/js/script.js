'use strict';

$(function() {

  var $products = $('#productsInList');
  var $stores = $('#storesInList');
  var $groceryList = $('#groceryList');
  var $editStores = $('#storeLogoEdit');
  var $chooseStores = $('#currentStores');
  var $availableStores = $('#availableStores');

  $.ajax({
    type: 'GET',
    url: '/storedproducts',
    success: function(products) {
      $.each(products, function(i, product) {
        $groceryList.append(
          `<option value="${product.name.replace(/\s+/g, '').toLowerCase()}">${product.name} ${product.size}</option>`
        );
      });
    }
  });


  $.ajax({
    type: 'GET',
    url: '/listproducts',
    success: function(products) {
      $.each(products, function(i, product) {
        $products.append(`<div class="result-row">
              						<div class="checkboxes">
              							<div class="checkedoff">
              								<form action="#" method="get">
              									<input type="checkbox" id="deleterow" name="prodchecked">
              								</form>
              							</div>
              							<div class="deleterow">
              								<img src="images/icons/icon-delete.png" alt="">
              							</div>
              						</div>
              						<div class="productdescription">
              							<div class="productname">${product.name}</div>
              							<div class="productsize">${product.size}</div>
              						</div>
              						<div class="price">$${product.prices[0].price}</div>
              						<div class="price">$${product.prices[1].price}</div>
              						<div class="price">$${product.prices[2].price}</div>
              						<div class="storeEnd"><a href="product-edit.html"><img src="images/icons/icon-edit-pencil-clear.png" width="20px"></a></div>
              					</div>`);
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/liststores',
    success: function(stores) {
      $.each(stores, function(i, store) {
        $stores.prepend(`<div class="storelogo">
        				<img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}" alt="${store.name} logo">
        			</div>`);
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/liststores',
    success: function(stores) {
      $.each(stores, function(i, store) {
        $editStores.append(`<div class="block-price">
            <div class="block-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo">
            </div>
            <div class="block-input-price">
              <input class="price-label" type="text" />
            </div>
          </div>
          `);
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/liststores',
    success: function(stores) {
      $.each(stores, function(i, store) {
        $chooseStores.append(`<div class="fav-store">
          <div class="fav-store-img">
            <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
          </div>
          <div class="fav-store-name">
            ${store.name}
          </div>
          <div class="fav-store-add">
            <a href="#">remove</a>
          </div>
        </div>
          `);
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/storedstores',
    success: function(stores) {
      $.each(stores, function(i, store) {
        $availableStores.append(`<div class="fav-store">
          <div class="fav-store-img">
            <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
          </div>
          <div class="fav-store-name">
            ${store.name}
          </div>
          <div class="fav-store-add">
            <a href="#">add+</a>
          </div>
        </div>
          `);
      });
    }
  });



  // Calculator Section
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
