$(document).ready(function() {
  $('.modal').modal();
  $.ajax({
    url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics',
    method: 'GET',
    contentType: 'application/json',
    crossOrigin: true,
    success: function(response) {
      console.log(response);
      $.each(response, function(i, data) {
        let output = `<div class="row post"><div class="col s6 l6"><a href="verTopic.html?topic_id=${data.id}">${data.content}</a></div><div class="col s3 l3"><span>Por: </span><strong>${data.author_name}</strong></div><div class="col s3 l3"><a class="waves-effect waves-light btn indigo lighten-5 black-text text-black">${data.responses_count}<span> Respuestas </span> </a></div></div>`;
        $('.foro').append(output); 
      });
    },
    fail: function(request) { }
  });
  $('#save-foro').on('click', function() {
    let authorNew = $('#author-new').val();
    let newForo = $('#new-foro').val();
    $.ajax({
      data: {author_name: authorNew,
        content: newForo},
      type: 'POST',
      dataType: 'json',
      url: 'https://private-anon-7df87ec8eb-foroapi.apiary-proxy.com/topics',
    })
      .done(function(msg) {
        $('.foro').prepend(`<div class="row"><div class="col s6 l6"><a href="verTopic.html?topic_id=${msg.id}">${msg.content}</a></div><div class="col s3 l3"><span>Por: </span><strong>${msg.author_name}</strong></div><div class="col s3 l3"><a class="waves-effect waves-light btn indigo lighten-5 black-text text-black">0<span>Respuestas </span> </a></div></div>`);
      });
  });
  var url = 'https://examen-laboratoria-sprint-5.herokuapp.com/topics';
  $('#searchForm').on('submit', function(e) {
    $('.foro').empty();
    var searchText = $('#search-foro').val();
    e.preventDefault();
    $.getJSON(url, function(themes) {
      var themesFilter = themes.filter(function(theme) {
        return theme.content.toLowerCase().indexOf(searchText) >= 0;
      });
      console.log(themesFilter);
      $.each(themesFilter, function(i, data) {
        let output = `<div class="row post"><div class="col s6 l6"><a href="verTopic.html?topic_id=${data.id}">${data.content}</a></div><div class="col s3 l3"><span>Por: </span><strong>${data.author_name}</strong></div><div class="col s3 l3"><a class="waves-effect waves-light btn indigo lighten-5 black-text text-black">${data.responses_count}<span> Respuestas </span> </a></div></div>`;
        $('.foro').append(output); 
      });
    });
  });
});