package com.example.todos.controller;

import com.example.todos.models.User;
import com.example.todos.dto.LoginRequest;
import com.example.todos.dto.UserResponse;
import com.example.todos.dto.RegisterRequest;
import com.example.todos.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Authentication API")
public class AuthController {
    private final AuthService authService;
    @Operation(summary = "Login", description = "Authenticate user with email and password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully logged in"),
        @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/login")
     public ResponseEntity<UserResponse> login(@RequestBody @Valid LoginRequest request) {
        UserResponse user = authService.login(request);
        return ResponseEntity.ok(user);
    }
    @Operation(summary = "Register", description = "Register a new user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Successfully registered"),
        @ApiResponse(responseCode = "400", description = "User already exists")
    })
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody @Valid RegisterRequest request) {
        UserResponse createdUser = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
}
}
