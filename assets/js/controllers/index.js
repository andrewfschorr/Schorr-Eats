var app = angular.module('todoController', []);
	
app.controller('mainController', ['$scope', '$rootScope', '$http','Todos', function($scope, $rootScope, $http, Todos) {
	$scope.formData = {};
	$scope.loading = true;

	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos 
	Todos.get() 
		.success(function(data) {    
			$scope.todos = data;  
			$scope.loading = false;
		});  

	// CREATE ==================================================================
	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formData.name != undefined) {
			$scope.loading = true;
			// call the  create function from our service (returns a promise object)
			Todos.create($scope.formData)

				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.todos = data; // assign our new list of todos
					$(function () {
					   $('#addModal').modal('toggle');
					});

				}); 
		}
	};

	// DELETE ==================================================================
	// delete a todo after checking it
	$scope.deleteTodo = function() {
		
		var result = window.confirm('Are you absolutely positively sure you want to delete this!???'); 

		if(!result) return;

		$scope.loading = true;

		Todos.delete($scope.originalItem._id)
			// if successful creation, call our get function to get all the new todos
			.success(function(data) {
				$scope.loading = false;
				$scope.todos = data; 
				$(function () {
				   $('#editModal').modal('toggle');
				});
			});
	}; 

	$scope.editTodo = function(todo) {
		$scope.editingItem = angular.copy(todo);
		$scope.originalItem = todo;
	};

	$scope.updateTodo = function() { 
		console.log($scope.editingItem);
		Todos.update($scope.editingItem)
			.success(function(data) {
				$scope.todos = data;   
				$scope.loading = false;
				$(function () {
				   $('#editModal').modal('toggle');
				});
			});
	};

}]);


