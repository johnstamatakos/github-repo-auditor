/*

Author: John Stamatakos
Date: October 26, 2016

*/

var request     = require('request');
var querystring = require('querystring');
var fs          = require('fs');

////////////////////////

var github = function (path, options, callback) {
    //Use environment variables for github username and password
    var username = process.env.GITHUB_UN;
    var password = process.env.GITHUB_PW;

    if (typeof options == 'function') {
        callback = options;
        options  = {
            per_page:100,
            type:'all'
        };
    }

    if (Object.keys(options).length) path += '?' + querystring.stringify(options);

    request({ 
        url: 'https://api.github.com' + path, 
        json:true,
        headers: { 
            'Host': 'api.github.com', 
            'User-Agent': process.env.GITHUB_UN,
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64') 
        }
    }, function (err, response, body) { callback(err, body); });
}

//Call function with callback
github('/orgs/VolusionDev/repos', writeResults);

//Write to JSON file
function writeResults(err, body){

    if(err){
        console.log(err);
        return 0;
    }

    var repos = [];

    for(var i = 0;i<body.length;i++){
        
        var d = new Date(body[i].updated_at);
        var obj = {};
        obj.name = body[i].name;
        obj.description = body[i].description;
        obj.created_at = body[i].created_at;
        obj.last_updated = body[i].updated_at;
        obj.private = body[i].private;
        obj.language = body[i].language;
        obj.size = body[i].size;

        repos.push(obj);

    }
    fs.writeFile('githubRepos.json', JSON.stringify(repos, null, 2) , 'utf-8');
}

