<template>
  <main>
    <div class="page-container">
      <!-- btn Add User -->
      <div class="flex justify-end mb-4">
        <button type="button" class="button-primary" @click="toggleModal(null)">Add User</button>
      </div>

      <!-- Table -->
      <table class="table-users">
        <thead class="table-header">
          <tr>
            <th scope="col" class="table-col">Id</th>
            <th scope="col" class="table-col">Name</th>
            <th scope="col" class="table-col">Email</th>
            <th scope="col" class="table-col">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id" class="table-row">
            <th scope="row" class="table-userName">
              {{ user.id }}
            </th>
            <th scope="row" class="table-userName">
              {{ user.name }}
            </th>
            <td class="px-6 py-4">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 text-right">
              <button class="button-editUser" @click="toggleModal(user)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Modal -->
    <UserModal :show-modal="isModalOpen" :user="currentUser" @close-modal="toggleModal" />
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useModal } from '@/types/UserModal'
import UserModal from '@/components/UserModal.vue'

const userStore = useUserStore()

const { isModalOpen, currentUser, toggleModal } = useModal()
</script>
