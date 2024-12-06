import { StoredUser } from '../types/auth';

export const MOCK_USERS: StoredUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    // Password: Admin@123
    password: '$2a$10$zPzOPTIGxJJhAyPY9cUvvOJYxwIZJZCe0AdF9tVD4mWKV8/MXzEe.',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    // Password: User@123
    password: '$2a$10$8RZqvxmFsvYwHEJfZcGQqeYPHYy0h7mB3FKpKwv3GRGtLgJhY1pMi',
    name: 'Regular User',
    role: 'user'
  }
];