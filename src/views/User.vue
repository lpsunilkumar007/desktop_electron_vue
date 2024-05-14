<template>
  <div class="relative pt-2 w-full px-4 max-w-full flex-grow flex-1 text-right">
    <button
      @click="showModal = true"
      class="bg-sonic-primary text-white mr-2 px-4 py-2 rounded-lg hover:btn-hover transition duration-300"
    >
      <font-awesome-icon icon="plus" />
      User
    </button>
  </div>
  <div class="mt-1 ml-10 flex">
    <label for="perPage" class="mr-2">Items Per Page:</label>
    <select v-model="perPage" @change="perPageChanged">
      <option v-for="option in perPageOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <div class="mt-1">
      <label for="search" class="mr-2">Search:</label>
      <input type="text" v-model="searchQuery" @input="search" />
    </div>
  </div>
  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table
      class="w-full border-collapse bg-white text-left text-sm text-gray-500"
    >
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-4 font-medium text-gray-900"
            @click="sort('name')"
          >
            Name
            <span v-if="sortBy === 'name'">
              <font-awesome-icon :icon="sortDesc ? 'sort-down' : 'sort-up'" />
            </span>
          </th>
          <th
            scope="col"
            class="px-6 py-4 font-medium text-gray-900"
            @click="sort('state')"
          >
            State
            <span v-if="sortBy === 'state'">
              <font-awesome-icon :icon="sortDesc ? 'sort-down' : 'sort-up'" />
            </span>
          </th>
          <th
            scope="col"
            class="px-6 py-4 font-medium text-gray-900"
            @click="sort('role')"
          >
            Role
            <span v-if="sortBy === 'role'">
              <font-awesome-icon :icon="sortDesc ? 'sort-down' : 'sort-up'" />
            </span>
          </th>

          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr
          v-for="(item, index) in pagedItems"
          :key="index"
          class="hover:bg-gray-50"
        >
          <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div class="text-sm">
              <div class="font-medium text-gray-700">{{ item.name }}</div>
              <div class="text-gray-400">{{ item.email }}</div>
            </div>
          </th>
          <td class="px-6 py-4">

            <span
                v-bind:class="
                  item.state === 'Active'
                    ? 'inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'
                    : 'inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600'"
              >
              <span
                v-bind:class="
                  item.state === 'Active'
                    ? 'h-1.5 w-1.5 rounded-full bg-green-600'
                    : 'h-1.5 w-1.5 rounded-full bg-red-600'
                "
              ></span>

              {{ item.state }}
            </span>
          </td>
          <td class="px-6 py-4">{{ item.role }}</td>

          <td class="px-6 py-4">
            <div class="flex gap-4">
              <a @click="deleteUserConfirmation(item.name)">
                <font-awesome-icon icon="trash" />
              </a>
              <a @click="editUser(item.name)">
                <font-awesome-icon icon="pen" />
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 mr-2 rounded-md bg-gray-200 hover:bg-gray-300"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 ml-2 rounded-md bg-gray-200 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
  <div>
    <div
      v-if="showModal"
      class="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div
          class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
        >
          <div class="mt-2">
            <input
              id="name"
              v-model="name"
              class="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Name"
            />
            <p
              v-if="submitted && !name"
              class="float-left mb-1 text-red-500 text-sm mt-1"
            >
              Please enter name.
            </p>
          </div>
          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              class="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Email"
            />
            <p
              v-if="submitted && !email"
              class="float-left mb-1 text-red-500 text-sm mt-1"
            >
              Please enter email.
            </p>
          </div>

          <input
            id="state"
            v-model="state"
            class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="State"
          />
          <div class="mt-2">
            <input
              id="role"
              v-model="role"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Role"
            />
          </div>
          <div class="flex items-center justify-start w-full">
            <button
              @click="saveUser"
              class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out bg-sonic-primary rounded text-white px-8 py-2 text-sm"
            >
              Submit
            </button>
            <button
              @click="closeModal"
              class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
          <button
            @click="closeModal"
            class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
          ></button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="deleteModal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Modal panel -->
      <div
        class="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- Modal content -->
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Delete Item
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete
                  <span class="font-bold">user</span>?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="deleteUser"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sonic-primary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </button>
          <button
            @click="deleteModal = false"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { useToast } from "vue-toast-notification";
interface User {
  name: string;
  email: string;
  state: string;
  role: string;
  [key: string]: string;
}
export default defineComponent({
  name: "DynamicTable",
  mounted() {
    const $toast = useToast();
  },
  data() {
    return {
      sortBy: "",
      sortDesc: false,
      name: "",
      showModal: false,
      ownerName: "",
      message: "",
      deleteModal: false,
      userName: "",
      submitted: false,
      state: "",
      role: "",
      email: "",
      props: {
        isActive: {
          type: Boolean as PropType<boolean>,
          required: true,
        },
      },
      items: [
        {
          name: "Steven Jobs",
          email: "jobs@sailboatui.com",
          state: "Active",
          role: "Product Designer",
        },
        {
          name: "Elon Musk",
          email: "elon@tesla.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Bill Gates",
          email: "bill@microsoft.com",
          state: "Inactive",
          role: "Co-founder",
        },
        {
          name: "Jeff Bezos",
          email: "jeff@amazon.com",
          state: "Active",
          role: "Founder",
        },
        {
          name: "Mark Zuckerberg",
          email: "mark@facebook.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Larry Page",
          email: "larry@google.com",
          state: "Active",
          role: "Co-founder",
        },
        {
          name: "Sergey Brin",
          email: "sergey@google.com",
          state: "Active",
          role: "Co-founder",
        },
        {
          name: "Tim Cook",
          email: "tim@apple.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Satya Nadella",
          email: "satya@microsoft.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Jack Dorsey",
          email: "jack@twitter.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Steven Jobs",
          email: "jobs@sailboatui.com",
          state: "Active",
          role: "Product Designer",
        },
        {
          name: "Elon Musk",
          email: "elon@tesla.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Bill Gates",
          email: "bill@microsoft.com",
          state: "Inactive",
          role: "Co-founder",
        },
        {
          name: "Jeff Bezos",
          email: "jeff@amazon.com",
          state: "Active",
          role: "Founder",
        },
        {
          name: "Mark Zuckerberg",
          email: "mark@facebook.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Larry Page",
          email: "larry@google.com",
          state: "Active",
          role: "Co-founder",
        },
        {
          name: "Sergey Brin",
          email: "sergey@google.com",
          state: "Active",
          role: "Co-founder",
        },
        {
          name: "Tim Cook",
          email: "tim@apple.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Satya Nadella",
          email: "satya@microsoft.com",
          state: "Active",
          role: "CEO",
        },
        {
          name: "Jack Dorsey",
          email: "jack@twitter.com",
          state: "Active",
          role: "CEO",
        },
      ] as User[],
      currentPage: 1,
      perPage: 5,
      perPageOptions: [5, 10, 15],
      searchQuery: "",
    };
  },
  computed: {
    pagedItems(): User[] {
      if (this.searchQuery.trim()) {
        const normalizedQuery = this.searchQuery.trim().toLowerCase();
        this.items = this.items.filter((item) => {
          return Object.values(item).some((value) =>
            value.toLowerCase().includes(normalizedQuery)
          );
        });
        console.log(this.items);
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = Math.min(startIndex + this.perPage, this.items.length);
        return this.items.slice(startIndex, endIndex);
      }
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = Math.min(startIndex + this.perPage, this.items.length);
      return this.items.slice(startIndex, endIndex);
    },

    totalPages(): number {
      return Math.ceil(this.items.length / this.perPage);
    },
  },
  methods: {
    sort(column: string) {
      console.log("Sorting by column:", column);
      if (this.sortBy === column) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortBy = column;
        this.sortDesc = false;
      }

      this.items.sort((a, b) => {
        const fieldA = (a[column] || "").toUpperCase();
        const fieldB = (b[column] || "").toUpperCase();
        let comparison = 0;
        if (fieldA > fieldB) {
          comparison = 1;
        } else if (fieldA < fieldB) {
          comparison = -1;
        }
        return this.sortDesc ? comparison * -1 : comparison;
      });
    },

    closeModal() {
      this.showModal = false;
    },
    saveUser() {
      if (!this.email || !this.role) {
        this.submitted = true;
        return;
      }
      var isEmailExit = this.IsDuplicateEmail(this.email);
      if (isEmailExit) {
        this.$toast.warning("User email alrady exist.");
        return;
      }
      const newItem = {
        name: this.name,
        email: this.email,
        state: this.state,
        role: this.role,
      };
      this.items.push(newItem);
      this.email = "";
      this.role = "";
      this.message = "";
      this.showModal = false;
      this.submitted = false;
      this.$toast.success("User saved successfully.");
    },

    deleteUserConfirmation(name: any) {
      this.deleteModal = true;
      this.userName = name;
    },
    deleteUser() {
      this.items = this.items.filter((obj) => {
        return obj.name !== this.userName;
      });
      this.userName = "";
      this.deleteModal = false;
      this.$toast.warning("User deleted successfully.");
    },
    editUser(name: any) {
      console.log(name);
      const userInfo = this.items.find((item) => item.name === name);
      this.email = userInfo?.email ?? "";
      this.role = userInfo?.role ?? "";
      this.name = userInfo?.name ?? "";
      this.state = userInfo?.state ?? "";
      this.showModal = true;
    },

    IsDuplicateEmail(email: string) {
      const userEmail = this.items.find((item) => item.email === email);
      if (userEmail) {
        return userEmail;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    perPageChanged() {
      this.currentPage = 1;
    },
    search() {
      this.currentPage = 1;
    },
  },
});
</script>
