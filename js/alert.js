jQuery(document).ready(function ($) {
  //Check feed.
  const feed_url = '/omnialert.php';
  getFeedItems(feed_url);  
});

/**
 * 
 * @param {String} feed_url 
 * @return array of objects
 */
function getFeedItems(feed_url){
  $.ajax({
    type: "GET",
    url: feed_url,
    dataType: "xml",
    success: function(xmlResponse) {
      var $items = $(xmlResponse).find("item");
      var count = 0;
      const MAX_SHOWN = 6;

      $items.each(function(){
        count++;

        if(count > MAX_SHOWN){
          return false;
        }
        
        const date_string = $(this).find('pubDate').text(),
          title = decode($(this).find('title').text()),
          //link = decode($(this).find('age').text()),
          description=  decode($(this).find('description').text());

          const date = new Date(date_string);
          const alert_id = 'alert_id_'+date.getTime();

        if(getCookie(alert_id) === '1'){
          return;
        }

        const html = "<div id='"+alert_id+"' class='alert alert-dismissible fluid-container bg-danger border-bottom border-light' role='alert'> \
          <div class='p-3'> \
            <div class='container'> \
              <div class='row align-items-center'> \
                <div class='col-auto'> \
                  <i class='d-none d-md-flex fas fa-exclamation-triangle fa-2x text-light mr-2'></i> \
                </div> \
                <div class='col row'> \
                  <div class='col-12 col-md-auto d-md-flex align-items-center'> \
                    <p class='p-0 m-0'> \
                      <strong class='text-light'>Campus Alert: </strong> \
                      <span class='text-light op75'>"+(date.getMonth()+1)+"."+date.getDate()+"."+date.getFullYear()+" |</span> \
                      <span class='text-light op75'>"+(date.getHours()%12)+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()+" " + (date.getHours()>=12?'PM':'AM') + "</span> \
                    </p> \
                  </div> \
                  <div class='col-12 col-lg-auto d-md-flex align-items-center'> \
                    <p class='p-0 m-0'> \
                      <span class='text-white'>"+title+"</span> \
                    </p> \
                  </div> \
                  <div class='col-12 d-md-flex align-items-center'> \
                    <p class='desc text-light mt-2 smaller op75'>"+description+"</p> \
                  </div> \
                  <div class='col-12 d-md-flex align-items-center op75'> \
                    <a class='text-light border-white border-bottom' href='https://pctoday.pct.edu/'>More&nbsp;information</a> \
                  </div> \
                </div> \
                <div class='col-auto text-right'> \
                  <button type='button' class='close position-relative p-0 m-0 text-white' data-dismiss='alert' aria-label='Close'> \
                    <span class='fa-stack smaller' style='vertical-align: top;'> \
                      <i class='fal fa-circle fa-stack-2x'></i> \
                      <i class='fal fa-times fa-stack-1x'></i> \
                    </span> \
                  </button> \
                </div> \
              </div> \
            </div> \
          </div> \
        </div>";

        $('div#page').before(html);

        $('div#'+alert_id).alert();
        $('div#'+alert_id).on('closed.bs.alert', function () {
          setCloseCookie(alert_id, date);
        })
      });


    }
  });
}

/**
 * Remove html entities
 * 
 * @param {String} html 
 */
function decode(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

/**
 * 
 * @param {String} id 
 * @param {Date} date
 */
function setCloseCookie(id, date){
  const EXPIRES_IN_DAYS = 1;
  const date_expires = new Date(Date.now() + EXPIRES_IN_DAYS);
  console.log('close_'+id+'=1; domain=pct.edu; expires='+date_expires.toUTCString()+'');

  document.cookie = 'close_'+id+'=1; path=/; domain=pct.edu;max-age=86400';
  console.log(document.cookie);
}

/**
 * 
 * @param {String} id 
 */
function getCookie(id){
  var cookieValue = document.cookie.split('; ').find(row => row.startsWith('close_'+id));

  if(cookieValue){
    cookieValue = cookieValue.split('=')[1];
  }

  return cookieValue;
}