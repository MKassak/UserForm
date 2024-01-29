import { defineStore } from 'pinia'
import { type User } from '@/types/UserModal'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      {
        id: 1,
        name: 'Demo User',
        email: 'demo.user@gmail.com',
        password: '123'
      }
    ] as User[]
  }),
  actions: {
    /* Generate ID for new User */
    generateNewUserId() {
      if (this.users.length === 0) {
        return 1
      }
      const maxId = Math.max(...this.users.map((user) => user.id))
      return maxId + 1
    },

    addUser(user: User) {
      user.id = this.generateNewUserId()
      this.users.push(user)
    },

    updateUser(updatedUser: User) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = updatedUser
      }
    },

    deleteUser(userId: number) {
      this.users = this.users.filter((user) => user.id !== userId)
    }
  }
})
