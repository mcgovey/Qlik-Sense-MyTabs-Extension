define( ['qlik','ng!$q','underscore'], function (qlik, $q, _) {
    'use strict';

    var app = qlik.currApp();

	var getSheetListFormatted = function () { 
 		var defer = $q.defer();
 		app.getAppObjectList( function ( data ) { 
 			var sheets = {}; 
 			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) { 
 				return item.qData.rank; 
 			} );
 			_.each( sortedData, function ( item ) {
 				var sheetTitle = 'sheet'+item.qInfo.qId;

 				var innerObj = {
						type: "items",
						label: item.qMeta.title,
						items: {
							enabled: {
								ref : "buttons.isEnabled",
								label : "Show this Sheet",
								type : "boolean",
								defaultValue : true
							}
						}
					};

 				sheets[sheetTitle]=innerObj;
 			} );
 			return defer.resolve( sheets ); 
 		} ); 
 		return defer.promise; 
	};

	var getSheetList = function () {

		var defer = $q.defer();

		app.getAppObjectList( function ( data ) {
			var sheets = [];
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
				return item.qData.rank;
			} );
			_.each( sortedData, function ( item ) {
				sheets.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				} );
			} );
			return defer.resolve( sheets );
		} );

		return defer.promise;
	};
	// getSheetListFormatted().then( function ( items ) {
	// 	console.log('success: ',items);
	// },function (errorMsg) {
	// 	console.log('failure: ',errorMsg);
	// });

	var altSheetList = {
		component: "expandable-items",
		items: function () { return getSheetListFormatted().then( function ( items ) {
				console.log('success: ', items);
				return items;
			},function (errorMsg) {
				console.log('error: ',errorMsg);
			}
		);
		},
		label: "Sheet Configuration"
	};

	var sheetList = {
		component: "expandable-items",
		items: function () { 
			return getSheetList().then( function ( items ) {
				console.log('success: ', items);
	 			var sheets = {};
	 			_.each( items, function ( item ) {
	 				var sheetTitle = 'sheet'+item.value;

	 				var innerObj = {
							type: "items",
							label: item.label,
							items: {
								enabled: {
									ref : "buttons.isEnabled",
									label : "Show this Sheet",
									type : "boolean",
									defaultValue : true
								}
							}
						};

	 				sheets[sheetTitle]=innerObj;
	 			} );
				return sheets;
			},function (errorMsg) {
				console.log('error: ',errorMsg);
			}
		);
		},
		label: "Sheet Configuration"
	};
	console.log('sheetList: ',sheetList);

	var settings = {
		appearance: {
			uses: "settings"
		},
		behavior: altSheetList
	};

	var panelDefinition = {
		type: "items",
		component: "accordion",
		items: settings
	};

	console.log('panelDefinition: ',panelDefinition);

    return panelDefinition;
});