$(document).ready(function() {
  $.ajax({
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
    method: 'GET',
    contentType: 'application/json',
    crossOrigin: true,
    success: function(response) {
      console.log(response);
      $.each(response, function(i, data) {
        let output = `<div class="row"><div class="col s6 l6"><span>${data.content}</span></div><div class="col s3 l3"><span>Por: </span><strong>${data.author_name}</strong></div><div class="col s3 l3"><a class="waves-effect waves-light btn indigo lighten-5 black-text text-black">${data.responses_count}<span> Respuestas </span> </a></div></div>`;
        $('.foro').append(output); 
      });
    },
    fail: function(request) { }
  });

  $.ajax({
    data: {author_name: 'claudia',
      content: 'Como usar las API con Ajax'},
    type: 'POST',
    dataType: 'json',
    url: 'http://private-anon-7df87ec8eb-foroapi.apiary-proxy.com/topics',
  })
    .done(function(msg) {
      alert('Data Saved: ' + msg.author_name);
    });
});