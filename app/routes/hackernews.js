/*Retrieves, parses, and sends articles scraped from Hacker News*/

var request = require('request');
var cheerio = require('cheerio');
var helper = require('../libs/helpers.js');


function parse(html){
  var articleArr = [ ];
  var $ = cheerio.load(html);

  $('span.comhead').each(function(){
    var a=$(this).prev(); 
    var rank=a.parent().parent().text(); 
    var title=a.text(); 
    var url=a.attr('href'); 
    var cleanUrl = helper.cleanUrl(url);
    var subtext = a.parent().parent().next().children('.subtext').children(); 
    var points = $(subtext).eq(0).text();
    var username = $(subtext).eq(1).text();
    var YCOMB_COMMENT_URL = "https://news.ycombinator.com/";
    var comments = $(subtext).eq(2).text();
    var comments_link = YCOMB_COMMENT_URL + $(subtext).eq(3).attr('href');

    var article = { 
      rank: parseInt(rank),
      site: "HN",
      title:title,
      url:url,
      cleanUrl:cleanUrl,
      points: parseInt(points),
      username: username,
      comments: parseInt(comments),
      comments_link:comments_link
    };
    
    articleArr.push(article); // pushes the object
  });
  return(articleArr);
}

exports.getHN = function(req,res){
  request('https://news.ycombinator.com', function(error, response, html){
      if(!error && response.statusCode === 200){
        res.send(parse(html));
      } else {
        res.send("An error occured while parsing")
      }
  });

};
