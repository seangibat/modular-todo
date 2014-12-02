var Todo = (function(){
  var locals=[], privates=[];

  var saveLocal = function(){
    localStorage.todos = JSON.stringify(locals);
  };

  var savePrivate = function(){
    sessionStorage.todos = JSON.stringify(privates);
  };

  var localsFn = function(){
    return locals;
  };

  var privatesFn = function(){
    return privates;
  };

  var initFn = function(){
    if (localStorage.todos)
      locals = JSON.parse(localStorage.todos);
    if (sessionStorage.todos)
      privates = JSON.parse(sessionStorage.todos);
  };

  var toggleDoneFn = function(id, priv){
    if (priv) {
      privates[id].done = (privates[id].done) ? false : true;
      savePrivate();
    }
    else {
      locals[id].done = (locals[id].done) ? false : true;
      saveLocal();
    }
  };

  var deleteDoneFn = function(){
    locals = locals.filter(function(item){
      return !(item.done);
    });
    privates = privates.filter(function(item){
      return !(item.done);
    });
    saveLocal();
    savePrivate();
  };

  var saveFn = function(description, priv){
    var td = {
      description : description,
      priv        : priv,
      done        : false
    }
    if (priv) {
      privates.push(td);
      savePrivate();
    }
    else {
      locals.push(td);
      saveLocal();
    }
  };

  return {
    toggleDone : toggleDoneFn,
    deleteDone : deleteDoneFn,
    save       : saveFn,
    locals     : localsFn,
    privates   : privatesFn,
    init       : initFn
  }
})();