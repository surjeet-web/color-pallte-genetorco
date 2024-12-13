import { User } from '../types';

export function generateUserId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function createUser(email: string): User {
  return {
    id: generateUserId(),
    email,
    hasEarlyAccess: true,
    createdAt: Date.now(),
  };
}