/*Retrieves, parses, and sends articles scraped from Reddit_programming */

var request = require('request');
var cheerio = require('cheerio');
var helper = require('../libs/helpers.js');

function parse(html){
  var metadataArray = [ ];
  var $ = cheerio.load(html);

  $('a.title').each(function(){

    var a=$(this);

    var comments_tag = a.parent().parent().children('.flat-list').children('li.first').children('a');
    var comments_link = comments_tag.attr("href");
    var comments = parseInt(comments_tag.text());
    var points = a.parent().parent().parent().children('.midcol').children('.unvoted').text();

    var title=a.text();
    var url=a.attr('href');
    var cleanUrl = helper.cleanUrl(url);


    var metadata = {
      title:title,
      url:url,
      cleanUrl:cleanUrl,
      comments:comments,
      comments_link:comments_link,
      points: points
    };

    metadataArray.push(metadata);
  });

  return metadataArray;
}

exports.getR = function(req,res){
  request('http://www.reddit.com/r/'+req.params.subreddit, function(error, response, html){
    if(!error && response.statusCode === 200){
      res.send(parse(html));
    }
  });
};

