;(function (Wishlist, $) {
  var $wishlistButton = $('.wishlist-btn');
  var $wishlistTile = $('.wishlist-tile-container');
  var numProductTiles = $wishlistTile.length;
  var wishlist = localStorage.getItem('user_wishlist') || [];
  if (wishlist.length > 0) {
    wishlist = JSON.parse(localStorage.getItem('user_wishlist'));
   


  }



  /*
   * Update button to show current state (gold for active)
   */   
  var animateWishlist = function (self) {
    $(self).toggleClass('is-active');
  };

  /*
   * Add/Remove selected item to the user's wishlist array in localStorage
   * Wishlist button class 'is-active' determines whether or not to add or remove
   * If 'is-active', remove the item, otherwise add it
   */   
  var updateWishlist = function (self) {
     
      var productHandle = $(self).attr('data-product-handle');
      var isRemove = $(self).hasClass('is-active');
      /* Remove */
      if (isRemove) {
        var removeIndex = wishlist.indexOf(productHandle);
        wishlist.splice(removeIndex, 1);
        localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
      
      }
      /* Add */ 
      else {
        wishlist.push(productHandle);
        localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
      }
    	no_wishlists_items();
  };

  /*
   * Loop through wishlist buttons and activate any items that are already in user's wishlist
   * Activate by adding class 'is-active'
   * Run on initialization
   */   
  var activateItemsInWishlist = function () {
    $wishlistButton.each(function () {
      var productHandle = $(this).attr('data-product-handle');
      if (wishlist.indexOf(productHandle) > -1) {
        $(this).addClass('is-active');
      }
    });
  };

  /*
   * Loop through product titles and remove any that aren't a part of the wishlist
   * Decrement numProductTiles on removal
   */   
  var displayOnlyWishlistItems = function () {
    $wishlistTile.each(function () {
      var productHandle = $(this).attr('data-product-handle');
      if (wishlist.indexOf(productHandle) === -1) {
        $(this).remove();
        numProductTiles--;
      }
    });
  };

  function no_wishlists_items(){
     setTimeout(function(){ 
     var zero_message = '<h1 class="no-wishlist-items-msg">אין מועדפים להצגה</h1>';
      if ($('.wishlist-tile-container').length) {
     		$('.no-wishlist-items-msg').remove();
      }
      else {
			$('.wishlist-grid').append(zero_message);
      }                  
     }, 900);
  }
  /*
   * Check if on the wishlist page and hide any items that aren't a part of the wishlist
   * If no wishlist items exist, show the empty wishlist notice
   */   
  var loadWishlist = function () {

    displayOnlyWishlistItems();
    $('.wishlist-loader').fadeOut(2000, function () {
      $('.wishlist-grid').addClass('is_visible');
      $('.wishlist-hero').addClass('is_visible');
      if (numProductTiles == 0) {
        $('.wishlist-grid--empty-list').addClass('is_visible');
      } else {
        $('.wishlist-grid--empty-list').hide();
      }
    });
	no_wishlists_items()
  };

  $(document).ready(function(){
    $(".removeItem").click(function(){
      var data_varient = $(this).attr('data-varient');
      var removeIndex = wishlist.indexOf(data_varient);
      wishlist.splice(removeIndex, 1);
      no_wishlists_items();
    });
  });


  var bindUIActions = function () {
    $wishlistButton.click(function (e) {
      e.preventDefault();
      updateWishlist(this);
      animateWishlist(this);
    });
  };

  Wishlist.init = function () {
    bindUIActions();
    activateItemsInWishlist();
    loadWishlist();
  };

}(window.Wishlist = window.Wishlist || {}, jQuery, undefined));
