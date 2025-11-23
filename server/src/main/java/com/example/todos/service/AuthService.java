package com.example.todos.service;
import com.example.todos.dto.LoginRequest;
import com.example.todos.dto.RegisterRequest;
import com.example.todos.dto.UserResponse;
import com.example.todos.models.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    public UserResponse login(LoginRequest request) {
        User user = userService.getAllUsers().stream()
            .filter(u -> u.getEmail().equals(request.getEmail()))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));  
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return modelMapper.map(user, UserResponse.class);
    }
    public UserResponse register(RegisterRequest request) {
        User user = modelMapper.map(request, User.class);
        User createdUser = userService.createUser(user);
        return modelMapper.map(createdUser, UserResponse.class);
    }
}
