// Create web Server comments application
// 1. create a web server
// 2. read the comments.json file
// 3. render the comments.json file to the client
// 4. when the user posts a comment, add it to the comments.json file
// 5. when the user posts a comment, redirect to the comments page

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

function renderCommentList(comments) {
  var list = [];
  for (var i = 0; i < comments.length; i++) {
    list.push('<li>' + comments[i] + '</li>');
  }
  return '<ul>' + list.join('') + '</ul>';
}

function renderCommentForm() {
  return '<form method="POST" action="/comment">' +
    '<input type="text" name="comment"/>' +
    '<input type="submit" value="Submit"/>' +
    '</form>';
}

function renderCommentPage(comments) {
  return '<html><head><title>Comments</title></head><body>' +
    renderCommentList(comments) + renderCommentForm() + '</body></html>';
}

function handleRequest(request, response) {
  var parsedUrl = url.parse(request.url);
  var path = parsedUrl.pathname;
  var query = querystring.parse(parsedUrl.query);
  var method = request.method;

  if (path === '/') {
    response.end('Hello, World!');
  } else if (path === '/comment' && method === 'POST') {
    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      var newComment = querystring.parse(body).comment;
      comments.push(newComment);
      fs.writeFileSync('comments.json', JSON.stringify(comments));
      response.writeHead(303, {
        'Location': '/comments'
      });
      response.end();
    });
  } else if (path === '/comments') {
    response.end(renderCommentPage(comments));
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
}

var server = http.createServer(handleRequest);
server.listen(3000);