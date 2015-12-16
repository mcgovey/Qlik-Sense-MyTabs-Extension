// define( ["qlik"], function (qlik) {
// 	'use strict';
// 	// var sheetPropVar = "";
// 	var app = qlik.currApp();

// 	console.log(app.getAppObjectList());

// 	// var promise = new Promise(function(resolve, reject) {
		
// 		var something = app.getAppObjectList( 'sheet', function someFunc(reply){
// 			// var sheetFuncPropVar='';
// 			// //for each sheet in the workbook, create a definition object
// 			// $.each(reply.qAppObjectList.qItems, function(key, value) {
// 			// 	if(key!==0){
// 			// 		sheetFuncPropVar+=', ';
// 			// 	}
// 			// 	sheetFuncPropVar += 'sheet'+key+':{\
// 			// 					type: "items",\
// 			// 					label: "'+value.qData.title+'",\
// 			// 					items: {\
// 			// 						enabled: {\
// 			// 							ref : "buttons.isEnabled",\
// 			// 							label : "Show this Sheet",\
// 			// 							type : "boolean",\
// 			// 							defaultValue : true\
// 			// 						}\
// 			// 					}}';
// 			// });
// 		}).then(function(response) {
// 			var listVars = response.layout;
// 		  console.log('success',listVars);
// 		  return listVars;
// 		}, function(xhrObj) {
// 		  console.log('fail',xhrObj);
// 		});

// 		console.log('outer var', something); 
// 	//   if (sheetFuncPropVar!=='') {
// 	//     resolve("Stuff worked!");
// 	//   }
// 	//   else {
// 	//     reject(Error("It broke"));
// 	//   }
// 	// });

// 	// promise.then(function(result) {
// 	//   console.log(result); // "Stuff worked!"
// 	// }, function(err) {
// 	//   console.log(err); // Error: "It broke"
// 	// });

	

// 	// console.log(sheetPropVar);

// 	return '';
// });


// define(['qlik'], function(qlik) {
//		var app = qlik.currApp();
//     function getData(options) {
// 		app.getAppObjectList( 'sheet', function (reply){
// 			var sheetFuncPropVar='';
// 			//for each sheet in the workbook, create a definition object
// 			$.each(reply.qAppObjectList.qItems, function(key, value) {
// 				if(key!==0){
// 					sheetFuncPropVar+=', ';
// 				}
// 				sheetFuncPropVar += 'sheet'+key+':{\
// 								type: "items",\
// 								label: "'+value.qData.title+'",\
// 								items: {\
// 									enabled: {\
// 										ref : "buttons.isEnabled",\
// 										label : "Show this Sheet",\
// 										type : "boolean",\
// 										defaultValue : true\
// 									}\
// 								}}';
// 			});
// 		});
// 	}
//     return {
//         getData: getData
//     }
// });
// require(["qlik"], function(m) {
//     console.log(m, m.getData({
//         successCallback: function() { console.log("outside callback"); }
//     }));
// });



define(['qlik'], function(qlik) {
	var app = qlik.currApp();
    // We make a new promise: we promise the string 'result' (after waiting 3s)
    var getValue = new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) {
            app.getAppObjectList( 'sheet', function (reply){
				var sheetFuncPropVar='';
				//for each sheet in the workbook, create a definition object
				$.each(reply.qAppObjectList.qItems, function(key, value) {
					if(key!==0){
						sheetFuncPropVar+=', ';
					}
					sheetFuncPropVar += 'sheet'+key+':{\
									type: "items",\
									label: "'+value.qData.title+'",\
									items: {\
										enabled: {\
											ref : "buttons.isEnabled",\
											label : "Show this Sheet",\
											type : "boolean",\
											defaultValue : true\
										}\
									}}';
				});
				// console.log('inside',sheetFuncPropVar);
				resolve(sheetFuncPropVar);
			});
    	}
    );
	
	// getValue.then(function(value){console.log('outsidePromiseBeforeReturn',value);});	
	
	return getValue.then(function(value){
			thisValue : value;
		});
});
	// //call an api library then loop through to get all values for your object
	// define(['apiLibrary'], function (api) {
	// 	//create var that contains api method of current object
	// 	var apiMethod = api.someMethod();
	// 	//declare value var to be used inside callback
	// 	var value ='';
	// 	//call otherMethod, specifying an arguement and use callback to access contents of method
	// 	apiMethod.otherMethod('arg',function (reply) {
	// 		//loop through each value inside callback
	// 		$.each(reply.item, function (key, value) {
	// 			//add values to variable for each instance of method
	// 			value += 'the key is '+key+' and the value is'+value;
	// 		});
	// 	});
	// 	//return some values as well as the value set above for the overall define method
	// 	return {
	// 		valueFromElsewhere: 'hardcoded for example',
	// 		valueFromLibrary: value //value is '' since it is set insde a callback function
	// 	}
	// });