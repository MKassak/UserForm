import { ref } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  password: string
}

export function useModal() {
  const isModalOpen = ref(false)
  const currentUser = ref<User | null>(null)

  const toggleModal = (user: User | null = null) => {
    isModalOpen.value = !isModalOpen.value
    currentUser.value = user
  }

  return { isModalOpen, currentUser, toggleModal }
}
