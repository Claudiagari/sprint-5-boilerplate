var topicId = getParameterByName('topic_id');
// Solo por propositos de debug
if (topicId) {
  console.log('El topic ID es:' + topicId);
}
$('.modal').modal();
$.ajax({
  url: 'https://private-anon-7df87ec8eb-foroapi.apiary-proxy.com/topics/' + topicId + '',
  method: 'GET',
  contentType: 'application/json',
  crossOrigin: true,
  success: function(response) {
    console.log(response);
    $('#title').text(response.content);
    $('#author').text(response.author_name);
  },
  fail: function(request) { }
});
$.ajax({
  url: 'https://private-anon-7df87ec8eb-foroapi.apiary-proxy.com/topics/' + topicId + '/responses',
  method: 'GET',
  contentType: 'application/json',
  crossOrigin: true,
  success: function(response) {
    $.each(response, function(i, data) {
      if (i >= 0) {
        let output = `<div class="row"><div class="col offset-l2 l3"><span>${data.content}</span> </div><div class="col offset-l2 l3"><span>${data.author_name}</span> </div></div>`;
        $('#responses').append(output);
      } else {
        $('#no-responses').text('Aun no hay respuestas');
      }
    });
  },
  fail: function(request) { }
});
$('#saveResponses').on('click', function() {
  $('#no-responses').text('')
  let authorNewResponses = $('#authorNewResponses').val();
  let newResponses = $('#newResponses').val();
  $.ajax({
    data: {author_name: authorNewResponses,
      content: newResponses},
    type: 'POST',
    dataType: 'json',
    url: 'https://private-anon-7df87ec8eb-foroapi.apiary-proxy.com/topics/' + topicId + '/responses',
  })
    .done(function(msg) {
      $('#responses').append(`<div class="row"><div class="col offset-l2 l3"><span>${msg.content}</span> </div><div class="col offset-l2 l3"><span>${msg.author_name}</span> </div></div>`);
    });
});
console.log(topicId);
