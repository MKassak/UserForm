<template>
  <transition name="modal-animation">
    <div v-show="props.showModal" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="props.showModal" class="modal-inner">
          <!-- Modal Header  -->
          <div class="flex justify-between">
            <p class="text-3xl font-bold">{{ props.user ? 'Edit' : 'Create' }} user</p>
            <button
              class="material-icons text-3xl text-gray-300 hover:text-gray-100"
              @click="close"
            >
              close
            </button>
          </div>

          <!-- Form -->
          <form class="py-4" @submit.prevent>
            <!-- Name -->
            <div class="my-3">
              <label for="user-name" class="block">User Name</label>
              <p v-if="isSubmitted && !isNameValid" class="error-msg">Name is required.</p>
              <input
                id="user-name"
                v-model="formData.name"
                type="text"
                placeholder="name"
                class="form-textInput"
              />
            </div>
            <!-- Email -->
            <div class="my-3">
              <label for="user-email" class="block">User Email</label>
              <p v-if="isSubmitted && !isEmailValid" class="error-msg">Valid email is required.</p>
              <input
                id="user-email"
                v-model="formData.email"
                type="email"
                placeholder="email"
                class="form-textInput"
              />
            </div>
            <!-- Password -->
            <div class="my-3">
              <label for="user-pass" class="block">Password</label>
              <p v-if="isSubmitted && !isPasswordValid" class="error-msg">
                Password is required (min 2 characters).
              </p>
              <input
                id="user-pass"
                v-model="formData.password"
                type="password"
                placeholder="password"
                class="form-textInput"
              />
            </div>
            <!-- Password repeat -->
            <div class="my-3">
              <label for="user-passVerify" class="block">Verify Password</label>
              <p v-if="isSubmitted && !doPasswordsMatch" class="error-msg">
                Passwords must match and be valid.
              </p>
              <input
                id="user-passVerify"
                v-model="passwordVerify"
                type="password"
                placeholder="repeat password"
                class="form-textInput"
              />
            </div>
            <!-- Buttons -->
            <div class="mt-10">
              <button type="submit" class="mr-4 button-primary" @click="handleSubmit">Save</button>
              <button v-if="props.user" class="mr-4 button-danger" @click="deleteUser">
                Delete
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, computed, type PropType } from 'vue'
import { type User } from '@/types/UserModal'
/*  store */
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
/* props */
const props = defineProps({
  showModal: Boolean,
  user: {
    type: Object as PropType<User | null>,
    default: null
  }
})

/*
  Watchers - Reset formData when modal is opened or user prop changes
*/
watch(
  () => props.showModal,
  (newVal) => {
    if (newVal) {
      resetFormData(props.user)
    }
  }
)
watch(
  () => props.user,
  (newUser) => {
    resetFormData(newUser)
  },
  { deep: true }
)

/*
  Modal handlers
*/
const emit = defineEmits(['closeModal'])

/* Close Modal */
function close() {
  emit('closeModal')
}

/*
  Form data handlers
*/
const defaultUser: User = { id: -1, name: '', email: '', password: '' }
const formData = ref<User>({ ...defaultUser })

/* Reset Form data */
function resetFormData(newUser: User | null = null) {
  formData.value = newUser ? { ...newUser } : { ...defaultUser }
  passwordVerify.value = newUser?.password || ''
}

/*
  Form Validation
*/
const isSubmitted = ref(false)
const passwordVerify = ref<string>('')
const isNameValid = computed(() => formData.value.name.trim().length > 0)
const isEmailValid = computed(
  () => formData.value.email.trim().length > 0 && /^\S+@\S+\.\S+$/.test(formData.value.email)
)
const isPasswordValid = computed(
  () => formData.value.password.length && formData.value.password.length >= 2
)
const isPasswordVerifyValid = computed(
  () => passwordVerify.value?.length && passwordVerify.value.length >= 2
)
const doPasswordsMatch = computed(() => formData.value.password === passwordVerify.value)

/*
  Submit Form
*/
function handleSubmit() {
  isSubmitted.value = true

  /* Validate Form */
  if (
    isNameValid.value &&
    isEmailValid.value &&
    isPasswordValid.value &&
    isPasswordVerifyValid.value &&
    doPasswordsMatch.value
  ) {
    /* Process form submit */
    if (formData.value.id !== -1) {
      // Update User
      userStore.updateUser(formData.value)
    } else {
      // Add New User
      userStore.addUser(formData.value)
    }

    /* Reset form data after submit */
    isSubmitted.value = false

    /* Close modal */
    close()
  }
}

/* 
  Delete user 
*/
function deleteUser() {
  if (props.user?.id) {
    userStore.deleteUser(props.user?.id)
  }
  close()
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #424242;
    padding: 24px 20px;
  }
}

/*
  Modal Animations
*/
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.1s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
</style>
