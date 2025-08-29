// CommonJS User Service
// Demonstrates module.exports vs exports and different export patterns

// Example of a service class using module.exports (replaces entire exports object)
class UserService {
    constructor() {
        this.users = [
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' },
            { id: 3, name: 'Charlie', email: 'charlie@example.com' }
        ];
    }

    getAllUsers() {
        return [...this.users]; // Return a copy
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    addUser(user) {
        const newUser = {
            id: Math.max(...this.users.map(u => u.id)) + 1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id, updates) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;
        
        this.users[userIndex] = { ...this.users[userIndex], ...updates };
        return this.users[userIndex];
    }

    deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return false;
        
        this.users.splice(userIndex, 1);
        return true;
    }
}

// Using module.exports to export the class directly
// This replaces the entire exports object
module.exports = UserService;

// Note: After using module.exports = ..., you cannot use exports.something
// because exports still points to the original empty object
// If you try to add exports.someFunction = ... here, it won't work

console.log('[CommonJS] user-service.js loaded');
