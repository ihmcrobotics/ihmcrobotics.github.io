hljs.initHighlightingOnLoad();

var script = document.getElementById("snippetscript");
var sources = eval(script.getAttribute('sources'));
var numberOfSources = sources.length;

// Getting the attributes from all the code blocks
var allCodeBlocks = Array.from(document.getElementsByTagName('code'));
var urls = []; // array of data from each source

// Throws error on invalid url
function notValidURL(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// Get and operate on data from source files
for (i = 0; i < numberOfSources; i++) {
  urls[i] = fetch(sources[i], {mode: 'no-cors'}).then(notValidURL).then(function(response) {
    return response.text()
  });
}

Promise
  .all(urls)
  .then(
    function(values) {
       var startString, endString, startIndex, endIndex, endExists, regexMatch, regex;
      for (i = 0; i < numberOfSources; i++) {
        var dataFromSource = values[i];
        var matchIndex = allCodeBlocks.findIndex(function(
          element) {
          return element.getAttribute('data-url-index') == i
            .toString();
        });

        // For each URL, find all the code blocks with matching
        // data-url-index
        while (matchIndex != -1) {

          // Change inner HTML of code block
          var codeBlock = allCodeBlocks[matchIndex];
          var typeOfSnippet = codeBlock
            .getAttribute('data-snippet');
          var codeChunk = "";

          if (typeOfSnippet == "complete") {
            codeChunk = dataFromSource;
          } else if (typeOfSnippet == "portion") {

            startString = codeBlock.getAttribute('data-start');
            if (startString.startsWith("/") && startString.endsWith("/")) {
              regex = new RegExp(startString.substring(1, startString.length-1));
              startIndex = dataFromSource.search(regex);
            } else {
              startIndex = dataFromSource.indexOf(startString);
            }

            if (startIndex < 0) throw "Start string not found at element id: " + codeBlock.id;

            // Substring from index to the rest of file
            if (codeBlock.getAttribute('data-end') === null) {
              codeChunk = dataFromSource
                .substring(startIndex);
            } else {
              endString = codeBlock.getAttribute('data-end');
              if (endString.startsWith("/") && endString.endsWith("/")) {
                regex = new RegExp(endString.substring(1, endString.length-1), 'g'); //matches from lastIndex only
                regex.lastIndex = startIndex;
                regexMatch = regex.exec(dataFromSource);
                endExists = regexMatch.index;
                endIndex = endExists + regexMatch[0].length;
              } else {
                endExists = dataFromSource.indexOf(endString, startIndex);
                endIndex = endExists + endString.length;
              }
              if (endExists < 0) throw "End string not found at element id: " + codeBlock.id;
              codeChunk = dataFromSource.substring(
                startIndex, endIndex);
            }
          } else
          // If the snippet involves multiple portions,
          // data-snippet="multipleportions"
          {
            var portions = eval(codeBlock
              .getAttribute('data-portions'));
            for (j = 0; j < portions.length; j++) {
              startString = portions[j][0];
              if (startString.startsWith("/") && startString.endsWith("/")) {
                regex = new RegExp(startString.substring(1, startString.length-1));
                startIndex = dataFromSource.search(regex);
              } else {
                startIndex = dataFromSource.indexOf(startString);
              }
              if (startIndex < 0) throw "Start string not found at element id: " + codeBlock.id;

              // Substring with start index to rest of
              // file
              if (portions[j].length == 1) {
                codeChunk = codeChunk +
                  "\n\n" +
                  dataFromSource
                  .substring(startIndex);
              } else {

                endString = portions[j][1];
                if (endString.startsWith("/") && endString.endsWith("/")) {
                  regex = new RegExp(endString.substring(1, endString.length-1), 'g'); //matches from lastIndex only
                  regex.lastIndex = startIndex;
                  regexMatch = regex.exec(dataFromSource);
                  endExists = regexMatch.index;
                  endIndex = endExists + regexMatch[0].length;

                } else {
                  endExists = dataFromSource.indexOf(endString, startIndex);
                  endIndex = endExists +  endString.length;
                }

                if (endExists < 0) throw "End string not found at element id: " + codeBlock.id;
                codeChunk = codeChunk +
                  "\n\n" +
                  dataFromSource.substring(
                    startIndex, endIndex);
              }
          }
          }
          codeBlock.innerHTML = hljs.highlight('java',
            codeChunk).value;
          allCodeBlocks.splice(matchIndex, 1);

          matchIndex = allCodeBlocks
            .findIndex(function(element) {
              return element
                .getAttribute('data-url-index') == i
                .toString();
            });
        }
      }
    });
