var model = (function () {
	var todos = [];
	return {
		get: index => todos[index], 
		push: text => {
			todos.push({
				text: text, 
				completed: false
			})
		},
		markAsCompleted: index => {
			todos[index].completed = !todos[index].completed;
		},
		remove: index => {
			todos.splice(index, 1);
		}, 
		getAll: () => todos, 
	}
})();