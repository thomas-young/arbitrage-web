requirejs(["ctyoscape.js", "jquery"], function(cytoscape, $) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
var elelist = []
var eleNames = []
var coins = ['ADA', 'BTC', 'DASH', 'EOS', 'ETH', 'LTC', 'TRX', 'XLM', 'XMR', 'XRP']
var exchanges = ['Binance', 'BitMEX', 'Bitfinex', 'Bithumb', 'Coinbase', 'Deribit', 'Huobi', 'Kraken', 'Kucoin', 'Liquid']
for (x=0;x<exchanges.length;x++) {
  for(i=0;i<coins.length;i++)
  {
    elelist.push({
      data: { id: `${exchanges[x]}_${coins[i]}`, centerNode: 0 }
    })
    eleNames.push(`${exchanges[x]}_${coins[i]}`)
  }
}
// for (x=0;x<100;x++) {
//     elelist.push({
//       data: { id: x, centerNode: 0 }
//     })
// }
// edgelist = []
// for(x=0;x<100;x++) {
//   for(i=0;i<100;i++) {
//     if(x != i) {
//       edgelist.push({group:'edges', data: {id: ('edge'+x.toString()+i.toString()), activeEdge: 0, source: x, target: i}})
//     }
//   }
// }
var cy = cytoscape({
  // very commonly used options
  container: document.getElementById('graphDiv'),
  elements: {
  nodes: elelist,
  // edges: edgelist,
  },

// so we can see the ids
style: [ // the stylesheet for the graph
  {
    selector: 'node',
    style: {
      'background-color': function( ele ){
        var nodeid = ele.data('id').toString()
          if(nodeid.includes('Binance')){
            return '#CB4335'
          }
          else if(nodeid.includes('BitMEX')){
            return '#884EA0'
          }
          else if(nodeid.includes('Bitfinex')){
            return '#2471A3'
          }
          else if(nodeid.includes('Bithumb')){
            return '#17A589'
          }
          else if(nodeid.includes('Coinbase')){
            return '#229954'
          }
          else if(nodeid.includes('Deribit')){
            return '#D4AC0D'
          }
          else if(nodeid.includes('Huobi')){
            return '#CA6F1E'
          }
          else if(nodeid.includes('Kraken')){
            return '#A6ACAF'
          }
          else if(nodeid.includes('Kucoin')){
            return '#2E4053'
          }
          else if(nodeid.includes('Liquid')){
            return '#5DADE2'
          }
          else {
            return '#5DADE2'
          }
        },
      'label': 'data(id)',
      'text-valign' : 'center',
      /*
      'shape': function( ele ){
        var nodeid = ele.data('id').toString()
          if(nodeid.includes('ADA')){
            return 'ellipse'
          }
          else if(nodeid.includes('BTC')){
            return 'triangle'
          }
          else if(nodeid.includes('DASH')){
            return 'rectangle'
          }
          else if(nodeid.includes('EOS')){
            return 'barrel'
          }
          else if(nodeid.includes('ETH')){
            return 'rhomboid'
          }
          else if(nodeid.includes('LTC')){
            return 'diamond'
          }
          else if(nodeid.includes('TRX')){
            return 'pentagon'
          }
          else if(nodeid.includes('XLM')){
            return 'hexagon'
          }
          else if(nodeid.includes('XMR')){
            return 'star'
          }
          else if(nodeid.includes('XRP')){
            return 'octagon'
          }
          else {
            return 'ellipse'
          }
        }
        */
      }

  },

  {
    selector: 'edge',
    style: {
      'width': 1,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'curve-style': 'haystack',
      'z-index': 1,
      'opacity': 1
    }
  },
  {
  selector: '.positivelink',
  style: {
    'line-color': '#6AF007',
    'target-arrow-color': '#6AF007',
    'z-index': 4,
    'opacity': 1,
    'width': 4,
    'curve-style': 'straight',
    'target-arrow-shape': 'triangle',
  }
},
{
  selector: '.activeNode',
  style: {
    'width': 40,
    'height': 40,
  }
},

],

  // initial viewport state:
  zoom: 0,
  pan: { x: 0, y: 0 },

  // interaction options:
  minZoom: 1e-50,
  maxZoom: 1e50,
  zoomingEnabled: true,
  userZoomingEnabled: false,
  panningEnabled: true,
  userPanningEnabled: false,
  boxSelectionEnabled: false,
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,

  // rendering options:
  headless: false,
  styleEnabled: true,
  hideEdgesOnViewport: false,
  hideLabelsOnViewport: false,
  textureOnViewport: false,
  motionBlur: true,
  motionBlurOpacity: 0.2,
  wheelSensitivity: 1,
  pixelRatio: 'auto'
});
cy.resize()
cy.fit()
cy.center()
console.log(cy.extent())
let options = {
  name: 'circle',

  fit: true, // whether to fit the viewport to the graph
  padding: 30, // the padding on fit
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
  nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
  spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  radius: undefined, // the radius of the circle
  startAngle: 3 / 2 * Math.PI, // where nodes start in radians
  sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
  clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
  sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  animate: true, // whether to transition the node positions
  animationDuration: 1200, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: undefined, // callback on layoutready
  stop: undefined, // callback on layoutstop
  transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts

};
let smallCircleOptions =
{
  name: 'circle',
  radius: 400,
  sort: function(a, b){ return a.data('order') - b.data('order') },
  animate: true, // whether to transition the node positions
  animationDuration: 1200, // duration of animation in ms if enabled
}

document.getElementById("generateButton").addEventListener("click", loadAPI);

function loadAPI() {
  return $.ajax({
    url: "https://cyclefinder-api-heroku.herokuapp.com/cycle",
    success: function(data) {
        var nodeList = [];
        var list = JSON.parse(data)
        for(x=0;x<list.length;x++) {
          list[x] = list[x].replace('/','_')
          cy.$(`#${list[x]}`).data('order', x)
        }
        console.log()
        makeLink(list);
      }
  })
}

function makeLink(activeNodes) {
  cy.remove(cy.$('edge'))
  cy.$('[centerNode = 1]').removeClass('activeNode');
  cy.$('[centerNode = 1]').data('centerNode', 0)
  // cy.$('[activeEdge = 1]').removeClass('positivelink');
  // cy.$('[activeEdge = 1]').data('activeEdge', 0)
  var elements = cy.$(`#${activeNodes[0]}`)
  var edgeList = []
  for( x = 0; x < activeNodes.length; x++) {
    for(i=0;i<activeNodes.length;i++) {
      edgeName = activeNodes[x]+'_'+activeNodes[i]
      if(x != i && ! edgeList.includes(edgeName)) {
        cy.add({group:'edges', data: {id: edgeName, activeEdge: 0, source: activeNodes[x], target: activeNodes[i]}})
        elements = elements.union((`#${activeNodes[x]}`))
        edgeList.push(edgeName)
      }
    }
  }
  // var edgeList = []
  // for(i=0;i<activeNodes.length;i++) {
  //   for(x=0;x<elelist.length;x++) {
  //     edgeName = activeNodes[i]+'_'+eleNames[x]
  //     if(eleNames[x] != activeNodes[i] && ! edgeList.includes(edgeName)) {
  //       edgeList.push(edgeName)
  //       console.log(edgeName)
  //       cy.add({group:'edges', data: {id: edgeName, activeEdge: 0, source: activeNodes[i], target: eleNames[x]}})
  //     }
  //   }
  // }
  for(i=0;i<activeNodes.length-1;i++) {
    cy.$('#'+activeNodes[i]+'_'+activeNodes[i+1]).data('activeEdge',1)
  }
  // cy.$('#'+activeNodes[activeNodes.length-1]+'_'+activeNodes[0]).data('activeEdge',1)
  // cy.add({group:'edges', data: {id: ('edge'+lastTarget.toString()+firstTarget.toString()), activeEdge: 1, source: lastTarget, target: firstTarget}})
  // cy.$('#edge'+lastTarget.toString()+firstTarget.toString()).data('activeEdge',1)
  // cy.add(newLinks)
  console.log(activeNodes.length)
  elements.data('centerNode', 1)
  let lout = cy.$('[centerNode = 0]').union('[activeEdge = 0]').layout( options );
  lout.run()
  var innerLayout = cy.$('[centerNode = 1]').union('[activeEdge = 1]').layout(smallCircleOptions);
  innerLayout.run();
  cy.$('[activeEdge = 1]').addClass('positivelink');
  cy.$('[centerNode = 1]').addClass('activeNode');
}
loadAPI()
// makeLink()
//setInterval(loadAPI, 5000);
var coinSymbols = ['BTC','ETH', 'XRP', 'XLM', 'EOS', 'LTC', 'ADA', 'XMR', 'DASH', 'TRX']
var apiData = []
var priceMap = {}
for(x=0;x<coinSymbols.length;x++){
  var promise = queryHisto(coinSymbols[x])
  apiData.push(promise)
}
var lineData = []
var labelGen = []
Promise.all(apiData).then(function(result) {
  console.log(result)
  for(x = 0; x<result[0].Data.length;x++) {
    var coinData = result[0].Data[x]
    console.log(coinData.time)
    var date = new Date(coinData.time*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2)
    labelGen.push(formattedTime)
  }
  for(x=0;x<result.length;x++) {
    priceMap[coinSymbols[x]] = []
    var coinData = result[x].Data
    for (i=0;i<coinData.length;i++) {
      priceMap[coinSymbols[x]].push(coinData[i].close)
    }
  }
  for (var key in priceMap) {
    var color1 = Math.floor(Math.random()*256).toString()
    var color2 = Math.floor(Math.random()*256).toString()
    var color3 = Math.floor(Math.random()*256).toString()
    lineData.push(
      {
        label: key,
        data: priceMap[key],
        backgroundColor: [
            `rgba(${color1}, ${color2}, ${color3}, 0.2)`,
        ],
        borderColor: [
            `rgba(${color1}, ${color2}, ${color3}, 1)`,
        ],
        borderWidth: 1
      }
    )
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelGen,
        datasets: lineData,
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        }
    }
    }
  });
})
// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var priceList = []
//     var myObj = JSON.parse(this.responseText);
//     data = myObj["Data"]
//     for (var k in data) {
//       priceList.push(data[k].close)
//     }
//     apiData.push(priceList)
//   }
// };
// xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/histohour?fsym="+coinSymbols[x]+"&tsym=USD&limit=10&api_key=95278ffa593f3e22d3b0608466ee0b8875245bcba090aa1769ea0f1514cb7546", true);
// xmlhttp.send();
for(x=0;x<coinSymbols.length;x++) {
  priceMap[coinSymbols[x]] = apiData[x]
}
function queryHisto(coinName) {
  return $.ajax({
    url: "https://min-api.cryptocompare.com/data/histohour?fsym="+coinName+"&tsym=USD&limit=24&api_key=95278ffa593f3e22d3b0608466ee0b8875245bcba090aa1769ea0f1514cb7546"
  })
}
});
