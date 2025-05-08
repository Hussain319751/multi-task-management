package com.today.crud.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.today.crud.Entity.Todo;
import com.today.crud.service.TodoService;

@RestController
public class TodoController {

	private TodoService todoService;
	
	public TodoController(TodoService todoService) {
		this.todoService=todoService;
	}
	
	@GetMapping(path="/users/{username}/todos")
	public List<Todo> getTodos(@PathVariable String username) {
		return todoService.findByUsername(username);
	}
	
	@GetMapping(path="/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username,@PathVariable int id) {
		return todoService.findById(id);
	}
	
	@DeleteMapping(path="/users/{username}/todos/{id}")
	public ResponseEntity<Todo> deleteTodos(@PathVariable String username,@PathVariable int id) {
		todoService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path="/users/{username}/todos/{id}")
	public Todo updateTodo(
	    @PathVariable String username,
	    @PathVariable int id,
	    @RequestBody Todo todo
	) {
	    todoService.updateTodo(todo);
	    return todo;
	}

	@PostMapping(path="/users/{username}/todos")
	public Todo createTodo(
	    @PathVariable String username,
	    @RequestBody Todo todo
	) {
		Todo createdTodo = todoService.addTodo(
		        username,
		        todo.getDescription(),
		        todo.getTargetDate(),
		        false
		    );
		return createdTodo;
	}
}
