module.exports = {

    cleanUrl : function(url) {
        var re = /(https:\/\/|http:\/\/)/;
        var headless = url.replace(re,'');
        var cleanUrl = headless.split('/')[0];

        return cleanUrl;
    }

    

}