setBottomAndSelectAll();

$('form').submit(function(e) {
	e.preventDefault();
	createTask($(e.target).find('input[type=text]'));
    taskCounter();
    setBottomAndSelectAll();
});

$('#all').click(function(e){
     $(this).addClass('active_mode');
     $('#active, #complete').removeClass('active_mode');
     $(".task").css("display", "block");
     $( "checkbox" ).each(function(i, val){
         $(this).chenge(markAsCompleted);
     });
});

$('#active').click(function(e){
     $(this).addClass('active_mode');
     $('#all, #complete').removeClass('active_mode');
     $(".task").filter(".uncompleted").css("display", "block");
     $(".task").filter(".completed").css("display", "none");
     $( "checkbox" ).each(function(i, val){
         $(this).chenge(markAsCompleted);
     });
});

$('#complete').click(function(){
     $(this).addClass('active_mode');
     $('#all, #active').removeClass('active_mode');
     $(".task").filter(".completed").css("display", "block");
     $(".task").filter(".uncompleted").css("display", "none");
     $( "checkbox" ).each(function(i, val){
         $(this).chenge(markAsCompleted);
     });
});

function createTask(input) {
	buildTask(input.val());
	model.push(input.val());
	input.val('');
}

function buildTask(text) {
	var task = $('<li>', {class: "task uncompleted"});
	$('<input>', {
		type: "checkbox",
        class: "check_list_item",
		change: markAsCompleted, 
	}).appendTo(task);
	$('<span>', {
		text: text, 
		class: "text"
	}).appendTo(task);
	$('<button>', {
		text: '?', 
		class: "delete", 
		click: deleteTask,
	}).appendTo(task);
	task.appendTo('#tasks_container');
}

function deleteTask(e) {
	var task = $(e.target).parent('li');
	var index = $(e.target).parents('ul').children('li').index(task);
	model.remove(index);
	task.remove();
    setClearCompleted();
    taskCounter();
    setBottomAndSelectAll();
}

function markAsCompleted(e) {
	var task = $(e.target).parent('li');
	var index = $(e.target).parents('ul').children('li').index(task);
    if (e.target.checked){
        task.addClass('completed');
        task.removeClass('uncompleted');
        $(this).css("background", "url(img/checked.svg) no-repeat");
    }    
    else{
        task.addClass('uncompleted');
        task.removeClass('completed');
        $(this).css("background", "url(img/unchecked.svg) no-repeat");
    }
	model.markAsCompleted(index);
    taskCounter();
    setClearCompleted();   
}

$('.check_all_list').change(function(e){
    if(e.target.checked){
        $(".task" ).each(function(i, val){
            $(this).children('input').attr('checked', true);
            model.get(i).completed = true;
            $(this).addClass('completed');
            $(this).removeClass('uncompleted');
            $('.check_list_item').css("background", "url(img/checked.svg) no-repeat");
        });
        taskCounter();
        setClearCompleted();
    }else{
        $(".task" ).each(function(i, val){
            $(this).children('input').attr('checked', false);
            model.get(i).completed = false;
            $(this).addClass('uncompleted');
            $(this).removeClass('completed');
            $('.check_list_item').css("background", "url(img/unchecked.svg) no-repeat");
        });
        taskCounter();
        setClearCompleted();
    }
});

function setBottomAndSelectAll(){
    if (model.getAll().length == 0){
        $('.check_all_list').addClass('undisplay');
        $('.bottom_list').addClass('undisplay'); 
    }else{
        $('.check_all_list').removeClass('undisplay');
        $('.bottom_list').removeClass('undisplay');
    }
}

function setClearCompleted (){
    if ($(".task").filter(".completed").length > 0){
        $('.clear_completed').removeClass('undisplay');
    }else{
        $('.clear_completed').addClass('undisplay');
    }
}

$('.clear_completed').click(function(e){
    var completedTasks = $(".task").filter(".completed");
    $.each(completedTasks, function(i, val){
        model.remove(i);
        val.remove();
    });
    $(e.target).addClass('undisplay');
    setBottomAndSelectAll();
});

function taskCounter(){
    var uncompletedTasks = $(".task").filter(".uncompleted");
    return $('#counter').text(uncompletedTasks.length);
}