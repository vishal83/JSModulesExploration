// ES Modules User Service
// Demonstrates default export and named export patterns

// User Service class that will be the default export
class UserService {
    constructor() {
        this.users = [
            { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
            { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
            { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'moderator' }
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

    getUsersByRole(role) {
        return this.users.filter(user => user.role === role);
    }

    addUser(user) {
        const newUser = {
            id: Math.max(...this.users.map(u => u.id)) + 1,
            role: 'user', // default role
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

    // Static method to validate user data
    static validateUser(user) {
        const errors = [];
        
        if (!user.name || user.name.trim().length === 0) {
            errors.push('Name is required');
        }
        
        if (!user.email || !user.email.includes('@')) {
            errors.push('Valid email is required');
        }
        
        if (user.role && !['admin', 'user', 'moderator'].includes(user.role)) {
            errors.push('Invalid role specified');
        }
        
        return errors;
    }
}

// Named exports - utility functions
export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator'
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const formatUser = (user) => {
    return `${user.name} (${user.email}) - ${user.role.toUpperCase()}`;
};

export const getUserDisplayName = (user) => {
    return user.name;
};

// Default export - the main UserService class
export default UserService;

// You can also combine default and named exports like this:
// export { UserService as default, ROLES, validateEmail, formatUser };

console.log('[ES Modules] user-service.js loaded');
