$(document).ready(() => {
  // Helper function for displaying a user's trivia questions
  const displayQuestion = triviaQuestion => {
    // Creates a container div for question and edit/delete buttons
    // const displayPromise = new Promise((resolve, reject) => {
      const questionContainer = $(`<div id=${triviaQuestion._id}>`).addClass('questionContainer');
      const questionHeader = $('<div>').addClass('questionHeader');
      const categoryName = $(`<div class= "categoryName">${triviaQuestion.category}</div>`);
      const questionTitle = $('<div>').addClass('questionTitle').text(triviaQuestion.question);
      const questionButtons = $('<div class="buttonContainer"></div>');
      questionButtons.append('<button class="editButton">Edit</button>');
      questionButtons.append('<button class="saveButton">Save</button>');
      questionButtons.append('<button class="cancelButton">Cancel</button>');
      questionButtons.append('<button class="deleteButton">Delete</button>');

      // Bind event handlers to each newly created button
      // Clicking edit button generates an input field where the user can edit question title text
      questionButtons.children('.editButton').click(event => {
        const questionTitle = $(event.target).parent().siblings('.questionTitle');
        const questionText = questionTitle.text();
        // 1) Remove questionTitle, append inputText (input field)
        questionTitle.remove();
        const inputField = $(`<input type="text" value="${questionText}">`);
        $(event.target).parent().before(inputField);
        // 2) Hide edit button, show save and cancel buttons
        $(event.target).hide();
        $(event.target).siblings('.deleteButton').hide();
        $(event.target).siblings('.saveButton').show();
        $(event.target).siblings('.cancelButton').show();
      });

      // Clicking delete button deletes the question from the database and the DOM
      questionButtons.children('.deleteButton').click(event => {
        const questionId = $(event.target).parents('.questionContainer').attr('id');
        const requestBody = JSON.stringify({ _id: questionId });
        fetch('/deleteQ', {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json' },
          body: requestBody
        })
        .then(() => {
        // Delete question from display container (front end)
          $(`#${questionId}`).remove();
        })
        .catch(err => console.error('Error:', err));
      });

      // Clicking save button saves the new question title to the database and updates in DOM
      questionButtons.children('.saveButton').click(event => {
        const questionId = $(event.target).parents('.questionContainer').attr('id');
        const updatedText = $(event.target).parent().siblings('input').val();
        const requestBody = JSON.stringify({ 
          _id: questionId,
          question: updatedText
         });
         // Update question text on back end
        fetch('/updateQText', {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json' },
          body: requestBody
        })
        .then(() => {
          // Remove input field and replace with updated question text
          $(event.target).parent().siblings('input').remove();
          const questionTitle = $('<div>').addClass('questionTitle').text(updatedText);
          $(event.target).parent().before(questionTitle);
          // Show edit and delete buttons
          // Hide save and cancel
          $(event.target).hide();
          $(event.target).siblings('.cancelButton').hide();
          $(event.target).siblings('.editButton').show();
          $(event.target).siblings('.deleteButton').show();
        })
        .catch(err => console.error('Error:', err));
      });
      
      // Clicking cancel button eliminates changes that the user makes
      questionButtons.children('.cancelButton').click(event => {
        // Save value of input field
        const inputField = $(event.target).parent().siblings('input');
        const inputFieldVal = inputField.attr('value');
        // Delete input field from DOM
        inputField.remove();
        // Put question title back
        const questionTitle = $('<div>').addClass('questionTitle').text(inputFieldVal);
        $(event.target).parent().before(questionTitle);
        $(event.target).hide();
        $(event.target).siblings('.saveButton').hide();
        $(event.target).siblings('.editButton').show();
        $(event.target).siblings('.deleteButton').show();
      });

      // Hide save and cancel buttons when first displaying a trivia question
      questionButtons.children('.saveButton').hide();
      questionButtons.children('.cancelButton').hide();

      // Appending question title and question buttons (container) to the question header div
      questionHeader.append(categoryName, questionTitle, questionButtons);

      // Creates a container div for answer options
      const answerContainer = $('<div>').addClass('answerContainer');
      const answerList = $('<ol type="A">');
      answerContainer.append(answerList);
      triviaQuestion.answerOptions.forEach((answer, index) => {
        const newAnswer = $(`<li>${answer}</li>`);
        if (triviaQuestion.correctAnswerIndex === index) newAnswer.css('font-weight', 'bold');
        answerList.append(newAnswer);
      });

       // Appends header and answers to question container 
      questionContainer.append(questionHeader, answerContainer);
      // Appends question containers to the display container
      $('#displayContainer').append(questionContainer);
  };

  // Display a single answer option input field when user is creating a question
  const displayAnswerOptionInput = () => {
    const answerLine = $('<li class="answerLine">');
    answerLine.append('<input class="answerInputField" type="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 
                      '<label><input type="radio" name="answerOption"><em> Correct Answer</em></label>&nbsp;&nbsp;&nbsp;',
                      '<button class="addOptionButton">Add</button>',
                      '<button class="deleteOptionButton">Delete</button>'
                    );
    // Bind add and delete event handlers
    // Add option handler
    answerLine.children('.addOptionButton').click(event => {
      const answerInputField = $(event.target).siblings('.answerInputField');
      const answerInputText = answerInputField.val();
      // 1) Remove input field, replace with saved text from input field 
      answerInputField.remove();
      const optionText = $(`<span class="answerOption">${answerInputText}</span>`);
      $(event.target).parent().prepend(optionText);
      // 2) Hide add button, show delete button
      $(event.target).hide();
      $(event.target).siblings('.deleteOptionButton').show();
      displayAnswerOptionInput();
    });
    // Delete option handler
    answerLine.children('.deleteOptionButton').click(event => {
      $(event.target).parent().remove();
    });

    // Hide delete button on display
    answerLine.children('.deleteOptionButton').hide();
    
    // Append new answer line to the ordered list of answer options
    $('#createAnswerOptions').append(answerLine);
  };

  // -------END HELPER FUNCTIONS - MAIN FUNCTIONALITY BEGINS HERE-------------
  // Populate the create questions container with first answer option
  displayAnswerOptionInput();
  // Bind event handler to submit button in create questions container
  $('#submitButton').click(event => {
    // Populate a request body object with data for creating a new question in database
    const answerOptions = [];
    $('.answerOption').each(function() {
      answerOptions.push($(this).text());
    });
   
    const radioButtons = $('input[name="answerOption"]');
    const correctAnswerIndex = radioButtons.index($('input:checked'));
    console.log(radioButtons.length);
    if (correctAnswerIndex === -1 || correctAnswerIndex >= radioButtons.length - 1) {
      alert('Must indicate a correct answer first!');
      return;
    }
    // Generate request body for fetch
    const requestBody = {
      answerOptions,
      correctAnswerIndex,
      category: $('#categoryInput').val(),
      question: $('#questionInput').val()
    };

    // On back end, create a new question in database containing data from input fields
    fetch('/addQ', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    // On front end, the newly created question should appear on the DOM
    .then(createdQuestion => displayQuestion(createdQuestion))
    .then(() => {
      // Clear input fields
      $('#categoryInput').val('');
      $('#questionInput').val('');
      $('#createAnswerOptions').empty();
      displayAnswerOptionInput();
    })
    .catch(err => console.error('Error:', err));
  });

  // Get the user's questions from the database
  fetch('/getUserQ', {
    method: 'GET',
    credentials: 'include'
  }) 
  .then(res => res.json())
  .then(triviaQuestions => triviaQuestions.forEach(triviaQuestion => { 
    displayQuestion(triviaQuestion);
  }))
  .catch(err => console.error('Error:', err));



});