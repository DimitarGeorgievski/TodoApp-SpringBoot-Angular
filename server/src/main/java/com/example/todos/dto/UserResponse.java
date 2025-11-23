package com.example.todos.dto;

import lombok.Data;
import com.example.todos.models.Todo;
import java.util.ArrayList;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private List<Todo> todos;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}