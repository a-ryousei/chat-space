$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Main__message">
          <div class="Main__message__info" data-message-id=${message.id}>
            <div class="Main__message__info__name">
              ${message.user_name}
            </div>
            <div class="Main__message__info__time">
              ${message.created_at}
            </div>
          </div>
          <div class="Main__message__text">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Main__message">
        <div class="Main__message__info" data-message-id=${message.id}>
          <div class="Main__message__info__name">
            ${message.user_name}
          </div>
          <div class="Main__message__info__time">
            ${message.created_at}
          </div>
        </div>
        <div class="Main__message__text">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageBox').append(html);      
      $('form')[0].reset();
      $('.MessageBox').animate({ scrollTop: $('.MessageBox')[0].scrollHeight});
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    })
    .always(function(){
      $('.submit-btn').prop("disabled", false);
    });
  });
});