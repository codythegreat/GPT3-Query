document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.altKey && event.key === 'o') {
    // create the outer div element
    var outerDiv = createOuterDiv();

    // create the header div element
    var headerDiv = createHeaderDiv(outerDiv);
    createHeaderDivDragEventListener(outerDiv, headerDiv);

    let inputDiv = createInputDiv();
  
    let responseDiv = createResponseDiv();
  
    outerDiv.appendChild(headerDiv);
    outerDiv.appendChild(inputDiv);
    outerDiv.appendChild(responseDiv);
  
    // append the outer div to the body
    document.body.appendChild(outerDiv);

    document.getElementById('cwm-openai-prompt').focus();
  }
});

function createOuterDiv() {
  var outerDiv = document.createElement('div');
  outerDiv.id = 'cwm-openai-div';

  return outerDiv;
}

function createHeaderDiv(outerDiv) {
  var headerDiv = document.createElement('div');
  headerDiv.id = "cwm-openai-div-header-div";
  headerDiv.innerHTML = 'Query OpenAI';

  // create the close button element
  var closeButton = document.createElement('button');
  closeButton.innerHTML = 'X';
  closeButton.addEventListener('click', function() {
    document.body.removeChild(outerDiv);
  });

  // append the close button to the header div
  headerDiv.appendChild(closeButton);

  return headerDiv;
}

function createHeaderDivDragEventListener(outerDiv, headerDiv) {
  headerDiv.addEventListener('mousedown', function(event) {
    var isDragging = true;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;
    var scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    var scrollBarHeight = window.innerHeight - document.documentElement.clientHeight;

    // prevent text selection while dragging
    document.onselectstart = function() { return false; };

    // get the initial position of the mouse
    initialX = event.clientX;
    initialY = event.clientY;

    // get the initial position of the outer div
    currentX = outerDiv.offsetLeft;
    currentY = outerDiv.offsetTop;

    // add a mousemove event listener to the document
    document.addEventListener('mousemove', function(event) {
      if (isDragging) {
        // calculate the new position of the outer div
        xOffset = event.clientX - initialX;
        yOffset = event.clientY - initialY;
        currentX = currentX + xOffset;
        currentY = currentY + yOffset;

        // update the position of the outer div
        outerDiv.style.top =  Math.max(Math.min(currentY, window.innerHeight - outerDiv.offsetHeight - scrollBarHeight), 0) + 'px';
        outerDiv.style.left = Math.max(Math.min(currentX, window.innerWidth - outerDiv.offsetWidth - scrollBarWidth), 0) + 'px';

        // reset the initial position of the mouse
        initialX = event.clientX;
        initialY = event.clientY;
      }
    });

    // add a mouseup event listener to the document
    document.addEventListener('mouseup', function() {
      isDragging = false;
      // re-enable text selection
      document.onselectstart = function() { return true; };
    });
  });
}

function createInputDiv() {
  // create the input div element
  var inputDiv = document.createElement('div');
  
  // create the text input element
  var promptInput = document.createElement('textarea');
  promptInput.id = 'cwm-openai-prompt'
  
  // append the text textarea and button elements to the input div
  inputDiv.appendChild(promptInput);
  
  // create the parameter inputs div
  var parameterInputsDiv = document.createElement('div');
  parameterInputsDiv.style.display = 'flex';
  parameterInputsDiv.id = 'cwm-openai-parameters-div'
  
  // create the model label and input
  var modelLabel = document.createElement('label');
  modelLabel.innerText = 'Model';
  var modelInput = document.createElement('input');
  modelInput.type = 'text';
  modelInput.value = 'text-davinci-003';
  var modelDiv = document.createElement('div');
  modelDiv.appendChild(modelLabel);
  modelDiv.appendChild(modelInput);
  
  // create the temperature label and input
  var temperatureLabel = document.createElement('label');
  temperatureLabel.innerText = 'Temp';
  var temperatureInput = document.createElement('input');
  temperatureInput.type = 'number';
  temperatureInput.value = 0.7;
  temperatureInput.step = 0.1;
  temperatureInput.min = 0;
  temperatureInput.max = 1;
  var temperatureDiv = document.createElement('div');
  temperatureDiv.appendChild(temperatureLabel);
  temperatureDiv.appendChild(temperatureInput);
  
  // create the max tokens label and input
  var maxTokensLabel = document.createElement('label');
  maxTokensLabel.innerText = 'Max Tokens';
  var maxTokensInput = document.createElement('input');
  maxTokensInput.type = 'number';
  maxTokensInput.value = 256;
  var maxTokensDiv = document.createElement('div');
  maxTokensDiv.appendChild(maxTokensLabel);
  maxTokensDiv.appendChild(maxTokensInput);
  
  // create the top p label and input
  var topPLabel = document.createElement('label');
  topPLabel.innerText = 'Top P';
  var topPInput = document.createElement('input');
  topPInput.type = 'number';
  topPInput.value = 1;
  var topPDiv = document.createElement('div');
  topPDiv.appendChild(topPLabel);
  topPDiv.appendChild(topPInput);
  
  // create the frequency penalty label and input
  var frequencyPenaltyLabel = document.createElement('label');
  frequencyPenaltyLabel.innerText = 'Freq. Penalty';
  var frequencyPenaltyInput = document.createElement('input');
  frequencyPenaltyInput.type = 'number';
  frequencyPenaltyInput.value = 0;
  var frequencyPenaltyDiv =  document.createElement('div');
  frequencyPenaltyDiv.appendChild(frequencyPenaltyLabel);
  frequencyPenaltyDiv.appendChild(frequencyPenaltyInput);
  
  // create the presence penalty label and input
  var presencePenaltyLabel = document.createElement('label');
  presencePenaltyLabel.innerText = 'Pres. Penalty';
  var presencePenaltyInput = document.createElement('input');
  presencePenaltyInput.type = 'number';
  presencePenaltyInput.value = 0;
  var presencePenaltyDiv = document.createElement('div');
  presencePenaltyDiv.appendChild(presencePenaltyLabel);
  presencePenaltyDiv.appendChild(presencePenaltyInput);
  
  // append the parameter divs to the parameter inputs div
  parameterInputsDiv.appendChild(modelDiv);
  parameterInputsDiv.appendChild(temperatureDiv);
  parameterInputsDiv.appendChild(maxTokensDiv);
  parameterInputsDiv.appendChild(topPDiv);
  parameterInputsDiv.appendChild(frequencyPenaltyDiv);
  parameterInputsDiv.appendChild(presencePenaltyDiv);
  
  // append the parameter inputs div to the input div
  inputDiv.appendChild(parameterInputsDiv);

  // add a keydown event listener to the textarea element
  promptInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      // don't add a \n
      event.preventDefault();
      // fire the queryOpenAI function
      queryOpenAI([
        modelInput.value,
        promptInput.value,
        temperatureInput.value,
        maxTokensInput.value,
        topPInput.value,
        frequencyPenaltyInput.value,
        presencePenaltyInput.value
      ]);
    }
  });

  return inputDiv;
}

function createResponseDiv() {
  var responseDiv = document.createElement('div');

  var clearSpan = document.createElement('span');
  clearSpan.id = 'openai-response-clear';
  clearSpan.textContent = 'clear';
  clearSpan.addEventListener('click', () => {
    responseP.textContent = '';
    let changeEvent = new Event('change');
    responseP.dispatchEvent(changeEvent);
  });

  var copySpan = document.createElement('span');
  copySpan.id = 'openai-response-copy';
  copySpan.textContent = 'copy';
  copySpan.addEventListener('click', () => {
    navigator.clipboard.writeText(responseP.textContent);
  });

  var useInInputSpan = document.createElement('span');
  useInInputSpan.id = 'openai-response-use-in-input';
  useInInputSpan.textContent = 'use in input';
  useInInputSpan.addEventListener('click', () => {
    document.getElementById('cwm-openai-prompt').value += '\n\n' + responseP.innerHTML.replace(/<br\s*\/?>/ig, "\n") + '\n\n';
    document.getElementById('cwm-openai-prompt').focus();
  });

  var responseP = document.createElement('p');
  responseP.id = 'openai-response';

  responseP.addEventListener('change', () => {
    if (responseP.textContent) {
      clearSpan.style.display = 'inline';
      copySpan.style.display = 'inline';
      useInInputSpan.style.display = 'inline';
    } else {
      clearSpan.style.display = 'none';
      copySpan.style.display = 'none';
      useInInputSpan.style.display = 'none';
    }
  });

  responseDiv.appendChild(clearSpan);
  responseDiv.appendChild(copySpan);
  responseDiv.appendChild(useInInputSpan);
  responseDiv.appendChild(responseP);

  return responseDiv;
}


function queryOpenAI(inputsArray) {
  fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model:inputsArray[0],
      prompt:inputsArray[1],
      temperature:Number(inputsArray[2]),
      max_tokens:Number(inputsArray[3]),
      top_p:Number(inputsArray[4]),
      frequency_penalty:Number(inputsArray[5]),
      presence_penalty:Number(inputsArray[6]) 
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.choices) {
        let answer = data.choices[0].text.trim();
        document.getElementById("openai-response").innerText = answer;
        let changeEvent = new Event('change');
        document.getElementById("openai-response").dispatchEvent(changeEvent);
      }
    })
    .catch(error => console.error(error));
}