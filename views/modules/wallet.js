function showWallet(data) {
    var html = '';

    if (!data.address) data.address = '<i>no address</i>';

    if (data.currencies.length > 0) {
      html = html + '<div class="walletcurrencies btn-group" role="group" aria-label="...">';
      var currencies = data.currencies;
      
      $.each(currencies, function(i, currency) {
        var classes = '';
        var width = (100/currencies.length);
        if (data.currency == currency.symbol) {
          classes = 'btn-textured active';
        } else {
          classes = 'btn-default';
        }
        html = html + '<button type="button" data-currency="'+currency.symbol+'" style="width:'+width+'%;" class="currency btn '+classes+'">';
        if (currency.balance) html = html + '<span class="amount">'+currencySwitch(currency.symbol)+currency.balance+' </span>';
        html = html + '<span class="name">'+currency.name+'</span>';
        html = html + '<span class="symbol">'+currency.symbol+'</span>';
        html = html + '</button>';
      });
      
      html = html + '</div>';

    }

    switch (data.currency) { 
      case 'BTC':

      html = html + '<div class="alert alert-info btcwalletbox" style="margin-top: 20px;min-height: 146px;">';
      html = html + '<div class="btcqr"></div>';
      html = html + '<div class="btcwallet" data-translate="yourbtcaddress">Your Bitcoin Address:</div>';
      html = html + '<div class="btcaddress liveaddress" id="btcaddress">'+data.address+'</div>';
      html = html + '<div class="btcbal"><strong>m<i class="fa fa-bitcoin"></i> '+data.balance+'</strong></div>';
      if (dualfactor == true) html = html + '<div class="btcsecure"><i class="fa fa-lock"></i><span data-translate="dualfactorenabled">Dual-Factor Protected</div>';
      if (dualfactor == false) html = html + '<div class="btcsecure"><i class="fa fa-key"></i><a class="btn btn-xs btn-blue showsecuirtypage" href="#" data-translate="enabledualfactor">Enable Dual-Factor</a></div>';
      html = html + '</div>';
      html = html + '<div class="alert alert-warning nomoney" style="margin-top: 20px;text-align: center;display: none;"><strong data-translate="justaddbitcoin"><i class="fa fa-flag" style="margin: 0px 5px 0px 5px;"></i> Add some Bitcoin to your account to get started.</stong></div>';

      $(".wallet").html(html);
      if (!data.address) $('.notif').html('<div class="alert alert-danger walleterror" style="display: none;"><strong data-translate="nobtcwalletfound">No Bitcoin wallet found.</strong> Please check back later.</div>');
      if (!data.address) $(".walleterror").show();
      $('.liveaddress').html(data.address);
      $('.btcbal').html('<strong class="georgia">m</strong><i class="fa fa-bitcoin"></i> <strong class="livebalance">'+data.balance+'</strong>')

      break;
      default:

      html = html + '<div class="no cards">'+
      //'<div class="card green"><div class="stripe"></div><div class="label"><i class="fa fa-cc-visa"></i></div><div class="value">'+data.currency+'</div><i class="fa fa-cc-stripe"></i><div class="numbers"><span>3759</span><span>xxxx</span><span>xxxx</span><span>3456</span></div><div class="valid"><i class="fa fa-clock-o"></i> 10 / 20</div><div class="secure">123 <i class="fa fa-lock"></i></div></div>'+
      //'<div class="card blue"><div class="stripe"></div><div class="label"><i class="fa fa-cc-visa"></i></div><div class="value">'+data.currency+'</div><i class="fa fa-cc-stripe"></i><div class="numbers"><span>3759</span><span>xxxx</span><span>xxxx</span><span>3456</span></div><div class="valid"><i class="fa fa-clock-o"></i> 10 / 20</div><div class="secure">123 <i class="fa fa-lock"></i></div></div>'+
      //'<div class="card purple"><div class="stripe"></div><div class="label"><i class="fa fa-cc-visa"></i></div><div class="value">'+data.currency+'</div><i class="fa fa-cc-stripe"></i><div class="numbers"><span>3759</span><span>xxxx</span><span>xxxx</span><span>3456</span></div><div class="valid"><i class="fa fa-clock-o"></i> 10 / 20</div><div class="secure">123 <i class="fa fa-lock"></i></div></div>'+
      '</div>'+
      '<div class="addcard nocards alert alert-info" style="margin-top: 20px;'+
        '">'+
        '<div class="center">'+
          '<div class="paymentmethod" data-translate="paymentmethod"><span>Add a Payment</span></div>'+
          '<div class="btn-group" role="group" aria-label="Payment type">'+
            '<button type="button" class="btn btn-method btn-group-xs" data-method="cc">Credit Card</button>'+
            '<button type="button" class="btn btn-method btn-group-xs" data-method="paypal">PayPal</button>'+
            '<button type="button" class="btn btn-method btn-group-xs" data-method="bank">Bank Account</button>'+
          '</div>'+
          '<div class="fundsinput">'+
            '<div class="method cc">'+
                '<div class="input-group">'+
                  '<span class="input-group-addon"><a href="https://stripe.com" target="_blank"><i class="fa fa-cc-stripe"></i></a></span>'+
                  '<input type="text" class="form-control" id="number" placeholder="••••  ••••  ••••  ••••" autocomplete="off">'+
                  '<input type="text" class="form-control" id="expiry" maxlength="5" placeholder="••/••" autocomplete="off">'+
                  '<input type="text" class="form-control" id="cvc" maxlength="3" placeholder="•••" autocomplete="off">'+
                    '<button class="btn btn-success sendcc">'+
                      'Add Card <i class="fa fa-plus-circle"></i>'+
                    '</button>'+
                  '</div>'+
            '</div>'+
            '<div class="method paypal">'+
                '<div class="input-group">'+
                  '<span class="input-group-addon"><i class="fa fa-cc-paypal"></i></span>'+
                  '<input type="text" class="form-control" id="paypalemail" placeholder="PayPal Email" autocomplete="off">'+
                    '<button class="btn btn-success addpaypal" data-update="false">'+
                      '<span data-translate="addpaypal">Add PayPal</span> <i class="fa fa-paypal"></i> '+
                    '</button>'+
                  '</div>'+
            '</div>'+
            '<div class="method bank">'+
                '<div class="input-group">'+
                  '<span class="input-group-addon"><a href="https://stripe.com" target="_blank"><i class="fa fa-bank"></i></a></span>'+
                  '<input type="text" class="form-control" id="routing" placeholder="Routing #" autocomplete="off">'+
                  '<input type="text" class="form-control" id="account" placeholder="Account #" autocomplete="off">'+
                    '<button class="btn btn-success sendbank">'+
                      'Add Account <i class="fa fa-plus-circle"></i>'+
                    '</button>'+
                  '</div>'+
            '</div>'+
          '</div>';
          if (data.stripe || data.paypal) {
            html = html + '<div class="addfunds notice">'+
              '<i class="fa fa-info-circle"></i> <span data-translate="selectacard">Please select a card to add funds.</span>'
            '</div>';
          }
        html = html + '</div>'+
        '</div>'+
      '</div>';

      break;
    }

    $(".wallet").html(html);
}
function showCards(data) {
  if (data) {
    var html = '', make, colors = ['blue', 'green', 'teal', 'orange', 'yellow', 'lime', 'purple'], a = 0;
   
    if (data.paypal) {
      html = html + '<div class="card paypal '+colors[a]+'"><div class="paypal"></div><div class="label"><i class="fa fa-paypal"></i></div><div class="numbers"><span>'+data.paypal+'</span></div></div>'
      a++;
    }

    if (data.stripe.data) {
      
      $.each(data.stripe.data, function (i, card) { a++;
        var brand = card.brand;
        brand = brand.toLowerCase();
        switch ( brand ) {
          case 'american express':
            brand = 'amex';
          break;
        }

        html = html + '<div class="card '+colors[i]+'"><div class="stripe"></div><div class="label"><i class="fa fa-cc-'+brand+'"></i></div><div class="value">'+card.country+'</div><i class="fa fa-cc-stripe"></i><div class="numbers"><span>xxxx</span><span>xxxx</span><span>xxxx</span><span>'+card.last4+'</span></div><div class="valid"><i class="fa fa-clock-o"></i> '+card.exp_month+' / '+card.exp_year+'</div><div class="secure">••• <i class="fa fa-lock"></i></div></div>'
      });
    }

    $('.addcard').removeClass('nocards');
    $('.cards').removeClass('no').append(html);
  }
}

function btcWalletUpdate(data) {  
  //bal = bal.toFixed(8);
  if (data.currency == 'BTC') {
      if (!data.address) {
        var qraddress = window.location.href;
      } else {
        var qraddress = data.address;
      }
      $(".btcqr").qrcode({
        render: 'canvas',
        size: 100,
        radius: 100,
        fill: '#31708f',
        text: qraddress
      });
  }
}


$(document).ready(function() {


  // Change the currency icon when you click currency button
  $(".hook").on("click",".currency",function(e) {    
    var currency = $(this).data('currency');
    socket.emit('currency', { currency: currency });
    page('wallet');
  });


  // Change the add fund method
  var selectedmethod = false;
  $('.hook').on('click', '.btn-method', function(e) {
    if ( !$(this).hasClass('active') ) {
      $('.btn-method').removeClass('active');
      $(this).addClass('active');
      var method = $(this).attr('data-method');
      $('.addcard').addClass('opened');
      $('.addfunds').fadeOut();
      if (selectedmethod) {
        $('.fundsinput .method').removeClass('showmethod');
        setTimeout( function() { $('.fundsinput .'+method).addClass('showmethod'); }, 500 );
      } else {
        $('.fundsinput .'+method).addClass('showmethod');
      }

      selectedmethod = method;
    }
  });


  // Validate CC Number
  $('.hook').on('keyup', '#number', function (e) {
    var val = $('#number').val().replace(' ', '').replace('-','');
    var type = Stripe.cardType(val).toLowerCase();
    if ( Stripe.validateCardNumber(val) == true ) {
      $('#number').css('color', 'hsl(113, 100%, 35%)');
    } else {
      $('#number').css('color', '#D83300');
    }

  });
  $('.hook').on('keyup', '#expiry', function (e) {
    var val = $('#expiry').val();
    if ( Stripe.validateExpiry(val) == true ) {
      $('#expiry').css('color', 'hsl(113, 100%, 35%)');
    } else {
      $('#expiry').css('color', '#D83300');
    }
  });
  $('.hook').on('keyup', '#cvc', function (e) {
    var val = $('#cvc').val();
    if ( Stripe.validateCVC(val) == true ) {
      $('#cvc').css('color', 'hsl(113, 100%, 35%)');
    } else {
      $('#cvc').css('color', '#D83300');
    }
  });


  $('.hook').on('click', '.sendcc', function (e) {
    var number = $('#number').val().replace(' ', '').replace('-','');
    var expiry = $('#expiry').val();
    var cvc = $('#cvc').val();
    $('.cc').css('width', '100%');
    if ( Stripe.validateCardNumber(number) != true || Stripe.validateExpiry(expiry) != true || Stripe.validateCVC(cvc) != true ) {
      // Invalid Card
      $('#number').css('color', '#D83300');
      $('#expiry').css('color', '#D83300');
      $('#cvc').css('color', '#D83300');
      var btntxt = $('.sendcc').html();
      $('.sendcc').html('Invalid Card <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
      setTimeout( function() {
        $('.sendcc').html(btntxt).removeClass('btn-danger').addClass('btn-success');
      }, 2000);
    } else {
      var btntxt = $('.sendcc').html();
      $('#number').css('color', 'hsl(113, 100%, 35%)');
      $('#expiry').css('color', 'hsl(113, 100%, 35%)');
      $('#cvc').css('color', 'hsl(113, 100%, 35%)');
      $('.sendcc').html('Adding Card <i class="fa fa-refresh fa-spin"></i>').removeClass('btn-danger').addClass('btn-success');
      
      var exp = expiry.split('/');

      Stripe.card.createToken({
        number: number,
        cvc: cvc,
        exp: expiry
      }, function (content, responce) {
        if (responce.error) {
          $('.sendcc').html('<i class="fa fa-times"></i> Token Error').removeClass('btn-success').addClass('btn-danger');
          setTimeout( function() { $('.sendcc').html(btntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
        } else {
          socket.emit('addcard', {token: responce.id});
        }
      });
      socket.on('addcard', function (data) {
        if (data.error) {
          if (data.error == 'stripe') $('.sendcc').html('Card Error <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
          if (data.error == 'customer') $('.sendcc').html('Customer <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
          setTimeout( function() { $('.sendcc').html(btntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
        } else {
          if (data.result == 'success') {
            $('.sendcc').html('Card Added <i class="fa fa-check"></i>').removeClass('btn-danger').addClass('btn-success');
            loadDeposit();
            setTimeout( function() { $('.sendcc').html(btntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
          }
        }
      });  
      
    }
  });

$('.hook').on('click', '.sendbank', function (e) {
    var account = $('#account').val();
    var routing = $('#routing').val();
    var country = $('#country').val();
    $('.bank').css('width', '100%');
    if ( Stripe.validateRoutingNumber(routing, country) != true ) {
      // Invalid Routing
      $('#routing').css('color', '#D83300');
      var btntxt = $('.sendbank').html();
      $('.sendbank').html('Routing Number <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
      setTimeout( function() {
        $('.sendbank').html(btntxt).removeClass('btn-danger').addClass('btn-success');
      }, 2000);

    } else if ( Stripe.validateAccountNumber(account, country) != true ) {
      // Invalid Card
      $('#account').css('color', '#D83300');
      $('#routing').css('color', '#D83300');
      $('#country').css('color', '#D83300');
      var btntxt = $('.sendbank').html();
      $('.sendcc').html('Account Number <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
      setTimeout( function() {
        $('.sendbank').html(btntxt).removeClass('btn-danger').addClass('btn-success');
      }, 2000);
    } else {
      var btntxt = $('.sendbank').html();
      $('#account').css('color', 'hsl(113, 100%, 35%)');
      $('#routing').css('color', 'hsl(113, 100%, 35%)');
      $('#country').css('color', 'hsl(113, 100%, 35%)');
      $('.sendbank').html('Adding Account <i class="fa fa-refresh fa-spin"></i>').removeClass('btn-danger').addClass('btn-success');

      Stripe.bankAccount.createToken({
        country: country,
        currency: currency,
        routing_number: routing,
        account_number: account
      }, function (content, responce) {
        console.log(responce);
        if (responce.error) {
          $('.sendbank').html('Bank Error <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
          setTimeout( function() { $('.sendbank').html(btntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
        } else {
          socket.emit('addbank', {token: responce.id});
        }
      });
      socket.on('addbank', function (data) {
        if (data.error) {
          if (data.error == 'stripe') $('.sendbank').html('Bank Error <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
          if (data.error == 'customer') $('.sendbank').html('Token <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
          setTimeout( function() { $('.sendbank').html(btntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
        } else {
          if (data.result == 'success') {
            $('.sendbank').html('Account Added <i class="fa fa-check"></i>').removeClass('btn-danger').addClass('btn-success');
            loadDeposit();
            setTimeout( function() { $('.sendbank').html(btntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
          }
        }
      });  
      
    }
  });

  var errortimer;
  $('.hook').on('click', '.addpaypal', function (e) {
    var paypalbtntxt = '<span data-translate="addpaypal">Add Paypal</span> <i class="fa fa-paypal"></i>';
    var email = $('#paypalemail').val();
    var update = $(this).attr('data-update');
    $('.addcard .paypal').css('width', '100%');
    if ( !email ) {
      // Invalid Card
      $('#email').css('color', '#D83300');
      $('.addpaypal').html('Invalid Email <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
      setTimeout( function() {
        $('.addpaypal').html(paypalbtntxt).removeClass('btn-danger').addClass('btn-success');
      }, 2000);
    } else {
      $('#email').css('color', 'hsl(113, 100%, 35%)');

      if (update == true) {
        $('.addpaypal').html('Updating PayPal <i class="fa fa-refresh fa-spin"></i>').removeClass('btn-warning').addClass('btn-success');
      } else {
        $('.addpaypal').html('Adding PayPal <i class="fa fa-refresh fa-spin"></i>').removeClass('btn-danger').addClass('btn-success');
      }
      
      setTimeout( function () { socket.emit('addcard', { paypal: email, update: update }); }, 500);

      socket.on('addcard', function (data) {
          if (data.error == 'email') {
            $('#email').css('color', '#D83300');
            $('.addpaypal').html('Email Error <i class="fa fa-times"></i>').removeClass('btn-success').addClass('btn-danger');
            errortimer = setTimeout( function() { $('.addpaypal').html(paypalbtntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
          } else if (data.error == 'paypal') {
            $('#email').css('color', '#D83300');
            $('.addpaypal').html('Update Address?').attr('data-update', true).removeClass('btn-success').addClass('btn-warning');
            errortimer = setTimeout( function() { $('.addpaypal').html(paypalbtntxt).attr('data-update', false).removeClass('btn-warning').addClass('btn-success'); }, 2000);
          }
          if (data.result == 'success') {
            $('#email').css('color', 'hsl(113, 100%, 35%)');
            $('.addpaypal').html('Email Added <i class="fa fa-check"></i>').removeClass('btn-danger').removeClass('btn-warning').addClass('btn-success');
            loadDeposit();
            clearTimeout(errortimer);
            setTimeout( function() { $('.addpaypal').html(paypalbtntxt).removeClass('btn-danger').addClass('btn-success'); }, 2000);
          }
      });
    }
  });

  // Selection BTC Accress
  $(".hook").on("click",".btcaddress",function(e) {    
    select_all(this);
    var add = $(this).html();
    clientText.setText( add );
  });
  // Selection of CC Numbers
  $(".hook").on("click",".numbers",function(e) {    
    select_all(this);
    var add = $(this).html();
    clientText.setText( add );
  });

  // Show security page
  $(".hook").on("click",".showsecuirtypage",function(e) {    
    page('security');
    showAccount();
  });

});
