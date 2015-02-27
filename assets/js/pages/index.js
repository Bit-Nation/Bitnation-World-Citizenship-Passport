/* ---------- functions used to demonsatration ---------- */

function randNum(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200;
}

function randNum2(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 500;
}

function randNum3(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 300;
}

function randNum4(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 100;
}

function randNum5(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 1) * 1;
}

function chart24USD() {

	var prices=document.dataCache['chart24data'];

	arrayLength=prices.length;
	var minP=999999999;
	var maxP=0;
	var thisPrice=0;

	// manually set min and max prices
	for (var i=0;i<arrayLength;i++){
		thisPrice=prices[i][1];
		if (thisPrice>maxP){
			maxP=thisPrice;
		}
		if (thisPrice<minP){
			minP=thisPrice;
		}
	}


	var plot = $.plot($("#chart-24h"),
		[ { data: prices, label: "BTC" } ], {
			series: {
				lines: { 
					show: true,
					lineWidth: 2,
					fill: true,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] } 
				},
				points: { 
					show: false, 
					lineWidth: 2 
				},
				shadowSize: 0
			},
			grid: { 
				hoverable: true, 
				clickable: true, 
				borderWidth: 0
			},
			legend: {
				show: false
			},	
			colors: ["#bdea74"],
			xaxis: {mode:"time", ticks:10, tickDecimals: 0, tickColor: "#fff"},
			yaxis: {max:maxP*1.005, min:minP*0.995, autoscaleMargin:0.2, ticks:5, tickDecimals: 0, tickColor: "#e9ebec"}
		});

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#chart-24h").bind("plothover", function (event, pos, item) {
		
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));
		
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	});	
}

function chart24USDLanding() {

	var prices=document.dataCache['chart24data'];

	arrayLength=prices.length;
	var minP=999999999;
	var maxP=0;
	var thisPrice=0;

	// manually set min and max prices
	for (var i=0;i<arrayLength;i++){
		thisPrice=prices[i][1];
		if (thisPrice>maxP){
			maxP=thisPrice;
		}
		if (thisPrice<minP){
			minP=thisPrice;
		}
	}


	var plot = $.plot($("#landing_chart-24h"),
		[ { data: prices, label: "BTC" } ], {
			series: {
				lines: { 
					show: true,
					lineWidth: 2,
					fill: true,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] } 
				},
				points: { 
					show: false, 
					lineWidth: 2 
				},
				shadowSize: 0
			},
			grid: { 
				hoverable: true, 
				clickable: true, 
				borderWidth: 0
			},
			legend: {
				show: false
			},	
			colors: ["#bdea74"],
			xaxis: {mode:"time", ticks:10, tickDecimals: 0, tickColor: "#fff"},
			yaxis: {max:maxP*1.005, min:minP*0.995, autoscaleMargin:0.2, ticks:5, tickDecimals: 0, tickColor: "#e9ebec"}
		});

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#chart-24h").bind("plothover", function (event, pos, item) {
		
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));
		
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	});	
}

function chartMonthUSD() {

	var prices=document.dataCache['chartMonthdata']

	arrayLength=prices.length;
	var minP=999999999;
	var maxP=0;
	var thisPrice=0;

	// manually set min and max prices
	for (var i=0;i<arrayLength;i++){
		thisPrice=prices[i][1];
		if (thisPrice>maxP){
			maxP=thisPrice;
		}
		if (thisPrice<minP){
			minP=thisPrice;
		}
	}


	var plot = $.plot($("#chart-month"),
		[ { data: prices, label: "BTC" } ], {
			series: {
				lines: { 
					show: true,
					lineWidth: 2,
					fill: true,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] } 
				},
				points: { 
					show: false, 
					lineWidth: 2 
				},
				shadowSize: 0
			},
			grid: { 
				hoverable: true, 
				clickable: true, 
				borderWidth: 0
			},
			legend: {
				show: false
			},	
			colors: ["#2FABE9"],
			xaxis: {mode:"time", ticks:10, tickDecimals: 0, tickColor: "#fff"},
			yaxis: {max:maxP*1.005, min:minP*0.995, autoscaleMargin:0.2, ticks:5, tickDecimals: 0, tickColor: "#e9ebec"}
		});

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#chart-24h").bind("plothover", function (event, pos, item) {
		
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));
		
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	});	
}

function chartWeekUSD() {

	var prices=document.dataCache['chartMonthdata']
	var d = new Date();
	var currenttime=d.getTime();
	var lastweek=currenttime-(1000*60*60*24*7);

	var weekPrices=Array();

	arrayLength=prices.length;
	var minP=999999999;
	var maxP=0;
	var thisPrice=0;
	var j=0

	// manually set min and max prices and filter prices older than 1 week
	for (var i=0;i<arrayLength;i++){
		if (prices[i][0]>lastweek){
			
			weekPrices[j]=Array();
			weekPrices[j][0]=prices[i][0];
			weekPrices[j][1]=prices[i][1];

			thisPrice=prices[i][1];

			if (thisPrice>maxP){
				maxP=thisPrice;
			}
			if (thisPrice<minP){
				minP=thisPrice;
			}

			j++;
		}
		
	}


	var plot = $.plot($("#chart-week"),
		[ { data: weekPrices, label: "BTC" } ], {
			series: {
				lines: { 
					show: true,
					lineWidth: 2,
					fill: true,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] } 
				},
				points: { 
					show: false, 
					lineWidth: 2 
				},
				shadowSize: 0
			},
			grid: { 
				hoverable: true, 
				clickable: true, 
				borderWidth: 0
			},
			legend: {
				show: false
			},	
			colors: ["red"],
			xaxis: {mode:"time", ticks:10, tickDecimals: 0, tickColor: "#fff"},
			yaxis: {max:maxP*1.005, min:minP*0.995, autoscaleMargin:0.2, ticks:5, tickDecimals: 0, tickColor: "#e9ebec"}
		});

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#chart-24h").bind("plothover", function (event, pos, item) {
		
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));
		
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	});	
}

function chartYearUSD() {

	var prices=document.dataCache['chartYeardata']
	var d = new Date();
	var currenttime=d.getTime();
	var lastyear=currenttime-(1000*60*60*24*365);

	var yearPrices=Array();

	arrayLength=prices.length;
	var minP=999999999;
	var maxP=0;
	var thisPrice=0;
	var j=0

	// manually set min and max prices and filter prices older than 1 week
	for (var i=0;i<arrayLength;i++){
		if (prices[i][0]>lastyear){
			
			yearPrices[j]=Array();
			yearPrices[j][0]=prices[i][0];
			yearPrices[j][1]=prices[i][1];

			thisPrice=prices[i][1];

			if (thisPrice>maxP){
				maxP=thisPrice;
			}
			if (thisPrice<minP){
				minP=thisPrice;
			}

			j++;
		}
		
	}


	var plot = $.plot($(".chart-year"),
		[ { data: yearPrices, label: "BTC" } ], {
			series: {
				lines: { 
					show: true,
					lineWidth: 2,
					fill: true,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] } 
				},
				points: { 
					show: false, 
					lineWidth: 2 
				},
				shadowSize: 0
			},
			grid: { 
				hoverable: true, 
				clickable: true, 
				borderWidth: 0
			},
			legend: {
				show: false
			},	
			colors: ["#FACC2E"],
			xaxis: {mode:"time", ticks:10, tickDecimals: 0, tickColor: "#fff"},
			yaxis: {max:maxP*1.005, min:minP*0.995, autoscaleMargin:0.2, ticks:5, tickDecimals: 0, tickColor: "#e9ebec"}
		});

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#chart-24h").bind("plothover", function (event, pos, item) {
		
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));
		
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	});	
}

$(document).ready(function(){
		
	/* ---------- DateRangepicker for Bootstrap ---------- */
	$('#daterange').daterangepicker();
	
	/* ---------- Placeholder Fix for IE ---------- */
	$('input, textarea').placeholder();

	/* ---------- Auto Height texarea ---------- */
	$('textarea').autosize();
	
	/*------- Easy Pie Chart Init -------*/
    $('.piechart').easyPieChart({
        barColor: "#fff",
        trackColor: 'rgba(255,255,255,.2)',
        scaleColor: false,
        lineCap: 'butt',
        rotate: -90,
        lineWidth: 4,
		size: 40,
        animate: 1000,
        onStep: function(value) {
            this.$el.find('span').text(~~value);
        }
    });

	/* ---------- Tabs ---------- */
	$('#mainCharts a:first').tab('show');
	$('#mainCharts a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	});
	
	$('#recent a:first').tab('show');
	$('#recent a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	});

});

