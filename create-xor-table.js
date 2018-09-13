var xor = require('bitwise-xor');
var Buffer = require('buffer/').Buffer;

const DISPLAY_HEX = true;
const DISPLAY_INVISIBLE = true;
const PRINT_OBJ = true;

var charsArray = (function() {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
	var arr = [];
	arr = chars.split('');
	return arr;
})();

var obj = {};

//print header
console.log('   ' + charsArray.join('  '));
//print body
for(i=0; i<charsArray.length; i++) {
	var s = charsArray[i] + ' ';
	for (c=0; c<i; c++) s = s + '   ';

	for(j=i; j<charsArray.length; j++) {
		//console.log('xoring '+charsArray[i] + ' with ' + charsArray[j]);
		var x = runXOR(charsArray[i], charsArray[j]);
		s = s + displayResult(x) + ' ';

		addCharsToTable(charToHex(x), charsArray[i], charsArray[j]);
	}	
	console.log(s);
}
if (PRINT_OBJ) { //generate table
	console.log('var obj = [];');
	for(var xorValue in obj) {
		console.log("obj['" + xorValue+ "'] = [" + obj[xorValue].join(',') + "];");
	}
}

function addCharsToTable(xorValue, a, b)
{
	if (!obj[xorValue]) {
		obj[xorValue] = [];
	}
	var aC = "'" + a + "'";
	var bC = "'" + b + "'";
	if (obj[xorValue].indexOf(aC) < 0 ) obj[xorValue].push(aC);
	if (obj[xorValue].indexOf(bC) < 0 ) obj[xorValue].push(bC);
}


function displayResult(x)
{
	if (!DISPLAY_INVISIBLE) {
		if(visibleChar(x)) {
			if (DISPLAY_HEX) return charToHex(x)
			return ' '+x.toString();
		} else return '..';
	} else {
			if (DISPLAY_HEX) return charToHex(x)
			return ' '+x.toString();		
	}
}

function visibleChar(c) {
	var asciiDec = c.toString().charCodeAt(0);
	return (asciiDec>= 48 && asciiDec <=57) || 
		   (asciiDec>= 65 && asciiDec <=90) || 
		   (asciiDec>= 97 && asciiDec <=122);
}

function charToHex(c) {
	var str = c.toString().charCodeAt(0).toString(16);
	if (str.length == 1) str = '0'+str;
	return str;
}

function runXOR(a, b) {
	//assume that params are single-byte chars
	var h1 = a.charCodeAt(0).toString(16);
	var h2 = b.charCodeAt(0).toString(16);
	return xor(new Buffer(h1, 'hex'), new Buffer(h2, 'hex'));
}