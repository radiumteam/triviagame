$(document).ready(() => {
  console.log(document.cookie);
  // Helper function for displaying a user's trivia questions
  const displayQuestion = triviaQuestion => {
    // Creates a container div for question and edit/delete buttons
    // const displayPromise = new Promise((resolve, reject) => {
      const questionContainer = $(`<div id=${triviaQuestion._id}>`).addClass('questionContainer');
      const questionHeader = $('<div>').addClass('questionHeader');
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
        console.log($(event.target).parent());
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
      questionHeader.append(questionTitle, questionButtons);

      // Creates a container div for answer options
      const answerContainer = $('<div>').addClass('answerContainer');
      const answerList = $('<ol type="A">');
      answerContainer.append(answerList);
      triviaQuestion.answerOptions.forEach(answer => {
        answerList.append(`<li>${answer}</li>`);
      });

       // Appends header and answers to question container 
      questionContainer.append(questionHeader, answerContainer);
      // Appends question containers to the display container
      $('#displayContainer').append(questionContainer);
  };

  // When document is ready, get the user's questions from the database
  fetch('/getAllQ') // TODO: Change this to a POST request and add object with user's ID
  .then(res => res.json())
  .then(triviaQuestions => triviaQuestions.forEach(triviaQuestion => { 
    displayQuestion(triviaQuestion);
  }))
  .catch(err => console.error('Error:', err));



});