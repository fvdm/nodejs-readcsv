/*
Name:          readcsv.js
Description:   Parse CSV file with automatic format detection
Author:        Franklin van de Meent (https://frankl.in)
Source code:   https://github.com/fvdm/nodejs-readcsv
Feedback:      https://github.com/fvdm/nodejs-readcsv/issues
License:       Unlicense / Public Domain
               (https://github.com/fvdm/nodejs-readcsv/raw/master/LICENSE)
*/

var fs = require('fs')

module.exports = function( head, file, callback ) {
	if( typeof file === 'function' ) {
		var callback = file
		var file = head
		var head = null
	}

	fs.readFile( file, function( err, data ) {
		if( err ) {
			callback( err )
			return
		}
		
		var output = []
		data = data.toString('utf8')
		
		var linebreak = data.slice(-2) === '\r\n' ? '\r\n' : '\n'
		data = data.trim().split( linebreak )
		
		var sep = ','
		var quotes = '\''
		
		if( data[0].match('\',\'') ) {
			sep = ','
			quotes = '\''
		} else if( data[0].match('\';\'') ) {
			sep = ';'
			quotes = '\''
		} else if( data[0].match('","') ) {
			sep = ','
			quotes = '"'
		} else if( data[0].match('";"') ) {
			sep = ';'
			quotes = '"'
		} else {
			callback( new Error('cannot detect line format') )
		}
		
		data.forEach( function( line ) {
			line = line.split( quotes + sep + quotes )
			line[0] = line[0].slice(1)
			line[ line.length -1 ] = line[ line.length -1 ].slice(0,-1)
			if( head ) {
				var tx = {}
				head.forEach( function( name, key ) {
					tx[ name ] = line[ key ]
				})
				output.push( tx )
				delete tx
			} else {
				output.push( line )
			}
			delete line
		})
		
		delete data
		callback( null, output )
		delete output
	})
}
