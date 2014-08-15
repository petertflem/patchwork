(function (_this) {
  var map = [];
  var queue = [];
  var singleColumnWidth = 0;
  var maxNumberOfColumns = 0;
  
  // Default options
  var options = {
    desiredColumnWidth: 250,
    desiredRowHeight: 250,
    maxColumnSpan: 2,
    maxRowSpan: 2,
    rows: 10
  };
  
  _this.initialize = function(newOptions) {
    // Merge options, overwrite default ones
    for (var attrname in newOptions)
      options[attrname] = newOptions[attrname];
    
    calculateColumnWidth();
  };
  
  _this.getColumnWidth = function() {
    return singleColumnWidth;
  }
  
  _this.getRowHeight = function () {
    return options.desiredRowHeight;
  }
  
  _this.generateElements = function(numberOfElements) {
    var elementsAdded = 0;
    
    for (var i = 0; i < options.rows; i++) {
      map[i] = Array.apply(null, new Array(maxNumberOfColumns)).map(Number.prototype.valueOf, 1);
    }
    
    // i == rows
    for (i = 0; i < options.rows; i++) {
      // j == columns
      for (var j = 0; j < maxNumberOfColumns; j++) {
        if (elementsAdded === numberOfElements) {
          printMap();
          return queue;
        }
      
        // If this one is taken
        if (map[i][j] !== 1)
          continue;
        
        elementsAdded++;

        // If the next one is unavailable
        if (map[i][j + 1] !== 1) {

          // If it is the last row
          if ((i + 1) === options.rows) {
            // Small
            map[i][j] = '0';
            queue.push({ 
              x: singleColumnWidth * j,
              y: options.desiredRowHeight * i,
              type: 'small'
            });
          } else {
            // Isnt last row; small or standing
            var o = ['o', 'I'];
            var s = o[getRandomNumber(0, 2)];

            if (s === 'o') {
              map[i][j] = '0';
              queue.push({ 
                x: singleColumnWidth * j,
                y: options.desiredRowHeight * i,
                type: 'small'
              });
            }
            else {
              map[i][j] = '0';
              map[i + 1][j] = '0';
              queue.push({ 
                x: singleColumnWidth * j,
                y: options.desiredRowHeight * i,
                type: 'standing'
              });
            }

          }

          continue;
        }

        // If it is the last row, but not the last square
        if ((i + 1) === options.rows && (j + 1) !== maxNumberOfColumns) {
          // Isnt last row; small or standing
          var o = ['o', '-'];
          var s = o[getRandomNumber(0, 2)];

          if (s === 'o') {
            map[i][j] = '0';
            queue.push({ 
              x: singleColumnWidth * j,
              y: options.desiredRowHeight * i,
              type: 'small'
            });
          }
          else {
            map[i][j] = '0';
            map[i][j + 1] = '0';
            queue.push({ 
              x: singleColumnWidth * j,
              y: options.desiredRowHeight * i,
              type: 'laying'
            });
          }

          continue;
        }

        var o = ['o', '-', 'I', 'O'];
        var s = o[getRandomNumber(0, 4)];

        if (s === 'o') {
          map[i][j] = '0';
          queue.push({ 
            x: singleColumnWidth * j,
            y: options.desiredRowHeight * i,
            type: 'small'
          });
        } else if (s === '-') {
          map[i][j] = '0';
          map[i][j + 1] = '0';
          queue.push({ 
            x: singleColumnWidth * j,
            y: options.desiredRowHeight * i,
            type: 'laying'
          });
        } else if (s === 'I') {
          map[i][j] = '0';
          map[i + 1][j] = '0';
          queue.push({ 
            x: singleColumnWidth * j,
            y: options.desiredRowHeight * i,
            type: 'standing'
          });
        } else {
          map[i][j] = '0';
          map[i][j + 1] = '0';
          map[i + 1][j] = '0';
          map[i + 1][j + 1] = '0';
          queue.push({ 
            x: singleColumnWidth * j,
            y: options.desiredRowHeight * i,
            type: 'large'
          });
        }
      }
    }
    
    printMap();
    return queue;
  };
  
  function printMap() {
    var row = 0;
    var col = 0;

    var string = '';

    for (; row < map.length; row++) {
        for (; col < map[row].length; col++) {
            string += map[row][col] + ' ';
        }

        string += '\n';
        col = 0;
    }

    console.log(string);
  };
  
  function calculateColumnWidth () {
    var viewportWidth = document.documentElement.clientWidth - 20; // -20 because of the scroll bar that pops in late...
    maxNumberOfColumns = Math.floor(viewportWidth / options.desiredColumnWidth);
    var widthUsed = maxNumberOfColumns * options.desiredColumnWidth;
    var widthLeftovers = viewportWidth - widthUsed;
    var additionalWidthPerColumn = widthLeftovers / maxNumberOfColumns;
    var adjustedColumnWidth = options.desiredColumnWidth + additionalWidthPerColumn;
    
    singleColumnWidth = Math.floor(adjustedColumnWidth);
  }
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max + min);
  }
  
})(Patchwork.Map = Patchwork.Map || {});