"use strict";

var request = require('request');
var cheerio = require('cheerio');
var helper = require('../libs/helpers.js');

function fixSelfPost(url){
  if(url.match("http") === null){
    return ("https://lobste.rs" + url);
  }
  return url;
}

var getAlternateLink = function(a) {
  var detailsEl = a.parent();
  var storyLinerEl = detailsEl.parent();
  var listItemEl = storyLinerEl.parent();
  var storyID = listItemEl.attr("data-shortid");
  if (storyID) {
    return "https://lobste.rs/s/" + storyID;
  }
  return null;
};

var parseLobsterElement = function(a) {
  // parses href attribute from "a" element
  var url = fixSelfPost(a.children().attr('href'));
  

  // parses link title
  var title = a.text();
  var cleanUrl = helper.cleanUrl(url);

  var commentsLabel = a.parent().children('.byline').children('span.comments_label');
  var commentsMatch = commentsLabel.text().match("[0-9]+");
  var comments = commentsMatch !== null ? commentsMatch[0] : 0;
  var commentsLink = commentsLabel.children('a').attr("href");

  // transform comments link to absolute url if relative url found
  if (commentsLink) { commentsLink = "https://lobste.rs" + commentsLink; }

  // If there is no comments link,
  // then try to create a commentsLink from the data on the page.
  // The data-shortid="lponsp" looks promising in the form:
  // http://lobste.rs/s/lponsp
  if (!commentsLink) {
    commentsLink = getAlternateLink(a);
  }

  var metadata = {
    site: "lobste.rs",
    title:title,
    url:url,
    cleanUrl:cleanUrl,
    comments:comments,
    comments_link:commentsLink
  };

  return metadata;
};

var parseLobsterResponse = function(html) {
    var metadataArray = [ ];

    var $ = cheerio.load(html);
    $('span.link').each(function(){
      var a = $(this); //selects previous data
      var metadata = parseLobsterElement(a);
      if (metadata) { metadataArray.push(metadata); }
    });

    // Iterate through every link's score
    $('div.score').each(function (i) {
      // push the score value to it's respective link object
      metadataArray[i].points = $(this).text();
    });

    return metadataArray;
};

exports.getLB = function(req, res){
  request('https://lobste.rs', function(error, response, html){
      if(!error && response.statusCode === 200){
        var metadataArray = parseLobsterResponse(html);
        res.send(metadataArray);
      }
  });
};
