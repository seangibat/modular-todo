var Display = (function(){
  var todoTemplate, $todoList, $todoSave, $todoInput, 
    $todoPrivate, $todoClear, $goodJob;

  var displayTodos = function(){
    var locals = Todo.locals();
    var privates = Todo.privates();
    $todoList.html(todoTemplate(locals));
    $todoList.append(todoTemplate(privates));
    if (locals.length + privates.length === 0)
      $goodJob.show();
    else
      $goodJob.hide();
  }

  var doneClickHandlerFn = function(event){
    var id = $(this).data('id');
    var priv = $(this).hasClass('private');
    Todo.toggleDone(id,priv);
    console.log(id,priv);
    displayTodos();
  };

  var clearClickHandlerFn = function(event){
    Todo.deleteDone();
    displayTodos();
  }

  var saveClickHandlerFn = function(event){
    var description = $todoInput.val();
    var priv = $todoPrivate.is(":checked");
    Todo.save(description,priv);
    $todoInput.val('');
    displayTodos();
  };

  var inputTypeHandlerFn = function(event){
    console.log(event);
    if (event.which === 13)
      saveClickHandlerFn();
  };

  var initFn = function(){
    todoTemplate = Handlebars.compile($('#todo-template').html());
    $todoList = $('.todo-list');
    $todoSave = $('.todo-save');
    $todoInput = $('.todo-input');
    $todoPrivate = $('.todo-private');
    $todoClear = $('.todo-clear');
    $goodJob = $('.goodJob');

    $(document).on('click', '.todo-save', Display.saveClickHandler);
    $(document).on('click', '.todo-clear', Display.clearClickHandler);
    $(document).on('click', '.todo-done', Display.doneClickHandler);
    $(document).on('keypress', '.todo-input', Display.inputTypeHandler);

    displayTodos();
  };

  return {
    init              : initFn,
    saveClickHandler  : saveClickHandlerFn,
    clearClickHandler : clearClickHandlerFn,
    doneClickHandler  : doneClickHandlerFn,
    inputTypeHandler  : inputTypeHandlerFn,
  }
})();