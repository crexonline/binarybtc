var selectedtrade;
function showhistoric(data, append) {
    console.log(data);
    var twins = 0;
    var tpush = 0;
    var tlosses = 0;
    var tid = 0;
    $('.historictrades').html('');
    var tradehtml = '';
    tradehtml = tradehtml+ '<div class="historicblock"><div class="header" data-translate="historictrades">Historic Trades <span style="float:right"><span class="green twins">x</span> / <span class="orange tpush">y</span> / <span class="red tlosses">z</span></span></div>';     
    if (data) {
    tradehtml = tradehtml + '<div class="row-fluid"><div class="span12"><div><table class="table" id="historictrades">';
    tradehtml = tradehtml + '<tbody>';

     var definingrow = '<tr class="historictrade definingrow">' +
                    '<td class="symbol">Symbol</td>'+
                    '<td class="time">Time of Trade</td>'+
                    '<td class="trade">Direction and Price</td>'+
                    '<td class="price">Closing Price</td>'+
                    '<td class="outcome">Outcome</td>'+
                    '<td class="currency">Amount</td>';
                    //'<td title="Expires: '+thisdate+' '+thistime+'">'+thistime+'</td>'+
                    //'<td class="bold" title="Expires: '+thisdate+' '+thistime+'">Trade in: <span class="expiretime"></span></td>'+
                  tradehtml = tradehtml + '</tr>';

    var index;
    for (index = 0; index < data.length; ++index) {
      entry = data[index];

      entry.symbol = symbolSwitch(entry.symbol);

        var possiblewin = (+entry.amount+(entry.amount*entry.offer));
        possiblewin = possiblewin.toFixed(2);
        entry.price = Number(entry.price);

        if (entry.direction == 'Call') {
          var arrowhtml = '<span style="opacity: 0.7" class="glyphicon glyphicon-arrow-up"></span>';
        } else if (entry.direction == 'Put') {
          var arrowhtml = '<span style="opacity: 0.7" class="glyphicon glyphicon-arrow-down"></span>';
        }


        var coeff = 1000 * 60 * 1;
        var entrytime = new Date(0);
        var entrydate = new Date(0);
        var iodate = new Date(0);
        entrytime.setUTCMilliseconds(entry.time);
        entrydate.setUTCMilliseconds(entry.time);
        iodate.setUTCMilliseconds(entry.time);
        entrytime = new Date(Math.round(entrytime.getTime() / coeff) * coeff);
        entrydate = new Date(Math.round(entrydate.getTime() / coeff) * coeff);
        iodate = new Date(Math.round(iodate.getTime() / coeff) * coeff);
        entrytime = entrytime.customFormat( "#hhh#:#mm#:#ss# " );
        entrydate = entrydate.customFormat( "#DD#/#MM#/#YYYY#" );
        iodate = iodate.toISOString();

        if (entry.outcome == 'Win') {
          twins++;
          var thumbhtml = '<span class="green" data-translate="won">Won</span>';
        } else if (entry.outcome == 'Lose') {
          tlosses++;
          var thumbhtml = '<span class="red" data-translate="lost">Lost</span>';
        } else if (entry.outcome == 'Tie') {
          tpush++;
          var thumbhtml = '<span class="orange">Push</span>';
        }

        var currencyicon;
        if (entry.currency == 'BTC') { 
          currencyicon = 'm<i class="fa fa-btc"></i>'; 
        } else if (entry.currency == 'CAD') {
          currencyicon = '<span class="hideinmobile">CAD</span> <i class="fa fa-dollar"></i>'; 
        } else if (entry.currency == 'EUR') {
          currencyicon = '<span class="hideinmobile">EUR</span> <i class="fa fa-eur"></i>'; 
        } else if (entry.currency == 'GBP') {
          currencyicon = '<span class="hideinmobile">GBP</span> <i class="fa fa-gbp"></i>';
        } else if (entry.currency == 'USD') {
          currencyicon = '<span class="hideinmobile">USD</span> <i class="fa fa-dollar"></i>';
        } else {
          currencyicon = '<i class="fa fa-dollar"></i>';
        }
        
        var classes;
        if (selectedtrade == entry._id) classes = classes + ' selected';

        // Historic Trade Row
        tradehtml = tradehtml + '<tr class="historictrade '+classes+'" data-id="'+entry._id+'">' +
          '<td class="symbol keystonelink" data-symbol="'+entry.symbol+'">'+entry.symbol+'</td>'+
          '<td class="time"><i style="opacity: 0.7"  class="fa fa-clock-o"></i> <time class="timeago" datetime="'+iodate+'">'+entrytime+'</time></td>'+
          '<td class="trade">'+arrowhtml+' <span class="tradeprice">'+entry.price+'</span></td>'+
          '<td class="price"><i style="opacity: 0.7"  class="fa fa-bell"></i> <span class="tradeprice">'+entry.finalprice+'</span></td>'+
          '<td class="outcome">'+thumbhtml+'</td>';
          if (entry.winnings > 0) { tradehtml = tradehtml + '<td class="currency">'+currencyicon+' '+entry.winnings+'</td>'; }
          if (entry.winnings == 0) { tradehtml = tradehtml + '<td class="currency">'+currencyicon+' '+entry.amount+'</td>'; }
          //'<td title="Expires: '+thisdate+' '+thistime+'">'+thistime+'</td>'+
          //'<td class="bold" title="Expires: '+thisdate+' '+thistime+'">Trade in: <span class="expiretime"></span></td>'+

        tradehtml = tradehtml + '</tr>';

       
    }

    tradehtml = tradehtml + '</div></div></div></tbody></table></div>';
    $('.historictrades').html(tradehtml);
    $('.recenttrades').html(tradehtml);
    $('.twins').html(twins);
    $('.tpush').html(tpush);
    $('.tlosses').html(tlosses);
  }
}

function historicTrades(data) {
    var twins = 0;
    var tpush = 0;
    var tlosses = 0;
    var tid = 0;
    $('.allhistorictrades').html('');
    var tradehtml = '';
    tradehtml = tradehtml+ '<div class="historicblock"><div class="header" data-translate="historictrades">Historic Trades <span style="float:right"><span class="green twins">x</span> / <span class="orange tpush">y</span> / <span class="red tlosses">z</span></span></div>';
    if (data) {
    tradehtml = tradehtml + '<div class="row-fluid"><div class="span12"><div><table class="table" id="historictrades">';
    tradehtml = tradehtml + '<tbody>';
 var definingrow = '<tr class="historictrade definingrow">' +
    '<td class="symbol">Symbol</td>'+
    '<td class="trade">Direction and Price</td>'+
    '<td class="time">Time of Trade</td>'+
    '<td class="price">Closing Price</td>'+
    '<td class="amount">Amount</td>'+
    '<td class="outcome">Outcome</td>'+
    '<td class="currency">Closing Amount</td>';
    var index;
    for (index = 0; index < data.length; ++index) {
      entry = data[index];
       //console.log(entry.symbol);
      entry.symbol = symbolSwitch(entry.symbol);

        var possiblewin = (+entry.amount+(entry.amount*entry.offer));
        possiblewin = possiblewin.toFixed(2);
        entry.price = Number(entry.price);

        if (entry.direction == 'Call') {
          var arrowhtml = '<span style="opacity: 0.7" class="glyphicon glyphicon-arrow-up"></span>';
        } else if (entry.direction == 'Put') {
          var arrowhtml = '<span style="opacity: 0.7" class="glyphicon glyphicon-arrow-down"></span>';
        }

        var coeff = 1000 * 60 * 1;
        var entrytime = new Date(0);
        var entrydate = new Date(0);
        var iodate = new Date(0);
        entrytime.setUTCMilliseconds(entry.time);
        entrydate.setUTCMilliseconds(entry.time);
        iodate.setUTCMilliseconds(entry.time);
        entrytime = new Date(Math.round(entrytime.getTime() / coeff) * coeff);
        entrydate = new Date(Math.round(entrydate.getTime() / coeff) * coeff);
        iodate = new Date(Math.round(iodate.getTime() / coeff) * coeff);
        entrytime = entrytime.customFormat( "#hhh#:#mm# " );
        entrydate = entrydate.customFormat( "#DD#/#MM#/#YYYY#" );
        iodate = iodate.toISOString();


        if (entry.outcome == 'Win') {
          twins++;
          var thumbhtml = '<span class="green" data-translate="won">Won</span>';
        } else if (entry.outcome == 'Lose') {
          tlosses++;
          var thumbhtml = '<span class="red" data-translate="lost">Lost</span>';
        } else if (entry.outcome == 'Tie') {
          tpush++;
          var thumbhtml = '<span class="orange">Push</span>';
        }

        var currencyicon;
        if (entry.currency == 'BTC') { 
          currencyicon = 'm<i class="fa fa-btc"></i>'; 
        } else if (entry.currency == 'CAD') {
          currencyicon = 'CAD <i class="fa fa-dollar"></i>'; 
        } else if (entry.currency == 'EUR') {
          currencyicon = 'EUR <i class="fa fa-eur"></i>'; 
        } else if (entry.currency == 'GBP') {
          currencyicon = 'GBP <i class="fa fa-gbp"></i>';
        } else if (entry.currency == 'USD') {
          currencyicon = 'USD <i class="fa fa-dollar"></i>';
        } else {
          currencyicon = '<i class="fa fa-dollar"></i>';
        }
              //'<td title="Expires: '+thisdate+' '+thistime+'">'+thistime+'</td>'+
              //'<td class="bold" title="Expires: '+thisdate+' '+thistime+'">Trade in: <span class="expiretime"></span></td>'+
            tradehtml = tradehtml + '</tr>';

        var classes = '';
        if (index == 0) tradehtml = tradehtml + definingrow;
        if (selectedtrade == entry._id) classes = classes + ' selected';

        tradehtml = tradehtml + '<tr class="historictrade '+classes+'" id="'+entry._id+'">' +
                    '<td class="symbol">'+entry.symbol+'</td>'+
                    '<td class="trade">'+arrowhtml+' <span class="tradeprice">'+entry.price+'</span></td>'+
                    '<td class="time"><i style="opacity: 0.7"  class="fa fa-clock-o"></i> <time class="timeago" datetime="'+iodate+'">'+entrydate+' '+entrytime+'</time></td>'+
                    '<td class="price"><i style="opacity: 0.7"  class="fa fa-bell"></i> <span class="tradeprice">'+entry.finalprice+'</span></td>'+
                    //'<td title="Expires: '+thisdate+' '+thistime+'">'+thistime+'</td>'+
                    '<td class="amount">'+currencyicon+' '+entry.amount+'</td>'+
                    '<td class="outcome">'+thumbhtml+'</td>';
                    if (entry.winnings > 0) { tradehtml = tradehtml + '<td class="currency">'+currencyicon+' '+entry.winnings+'</td>'; }
                    if (entry.winnings == 0) { tradehtml = tradehtml + '<td class="currency">'+currencyicon+' '+entry.amount+'</td>'; }
                    //'<td class="bold" title="Expires: '+thisdate+' '+thistime+'">Trade in: <span class="expiretime"></span></td>'+
                  tradehtml = tradehtml + '</tr>';
 
     if (selectedtrade == entry._id) {
          if (entry.winnings > 0) { 
            amount = entry.winnings;
          } else { 
            amount = entry.amount;
          }
          tradehtml = tradehtml + '<tr class="historicdetails selected" data-id="'+entry._id+'">'+
          '<td class="historicchart">  </td>'+
          '<td class="historicoutcome">'+
            '<div class="outcomeamount">'+amount+'</div>'+
            '<div class="outcomemessage">'+thumbhtml+' Trade</div>'+
            
            '<table class="outcomeprices"><tbody>'+
              '<tr class="outcomeopening"><td>Opening</td><td class="outcomeclosing">Closing</td></tr>'+
              '<tr><td class="outcomeopeningprice">'+entry.price+'</td><td class="outcomeclosingprice">'+entry.finalprice+'</td></tr>'+
            '</tbody></table>'+

          '</td>';
          tradehtml = tradehtml + '</tr>';
        }


  }
}
    tradehtml = tradehtml + '</div></div></div></tbody></table></div>';
    $('.allhistorictrades').append(tradehtml);
    $('.twins').html(twins);
    $('.tpush').html(tpush);
    $('.tlosses').html(tlosses);
}

// Operations
$(function() { 
  $('.hook').on( 'click', '.historictrade', function(e) {
    e.preventDefault();
    $('.historictrade').removeClass('selected');
    $(this).addClass('selected');
    selectedtrade = $(this).attr('id');
  });
  $('.hook').on("click", ".guesttrades .row-fluid", function (e) {
    // if ( $(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight ) {
      console.log(e);
    // }
  });
});