/**
 * Copyright (C) 2013 ANDLABS. All rights reserved.
 * Author: Shawn Davies <sodxeh@gmail.com>
 *
 * 
 */

var INTERNAL_ERROR = 500, STATUS_OK = 200;
var fsys = require("fs");

router = function() {
}


router.prototype = {
    post: function(result, code, data) {
	result.writeHead(code);
	return result.end(data);
    },

    post_file: function(result, request, data) {
	try {
	    return fsys.readFile(data, function(error, d) {
		if (error) {
		    return router.prototype.post(result, INTERNAL_ERROR, 'Error loading file data from: '+data);
		}
		return router.prototype.post(result, STATUS_OK, data);
	    });
	} catch (e) {
	    console.log("Post failed: data="+data+"\n"+e);
	    return null;
	}
    },

    post_render: function(result, data) {
	return result.render(data);
    }
}
