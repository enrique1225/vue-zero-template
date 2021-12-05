<template>
  <b-container fluid class="ideas_body">
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="12" sm="12" class="my-1">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Search..."
            ></b-form-input>
            <b-input-group-append>
              <button type="submit" class="btn btn-primary"><i class="flaticon-search-1"></i></button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
      class="table-bordered">
      <template v-slot:cell(actions)="row">
        <b-dropdown text="Actions" offset="50" variant="primary" class="m-2">
          <b-dropdown-item size="sm" @click="edit(row.item, row.index, $event.target)"> Edit </b-dropdown-item>
          <b-dropdown-item size="sm" v-b-modal.permission-modal> Permissions </b-dropdown-item>
          <b-dropdown-item size="sm"> Unlock </b-dropdown-item>
          <b-dropdown-item size="sm" v-b-modal.parameters-modal> Dynamic Parameters </b-dropdown-item>
          <b-dropdown-item size="sm"> Delete </b-dropdown-item>
        </b-dropdown>
      </template>

      <template v-slot:cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col >
        <b-form-group>
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
        ></b-pagination>
      </b-col>
    </b-row>

    <b-modal size="lg" :id="editModal.id" :title="editModal.title"  @ok="editOk">
      <form ref="form" @submit.stop.prevent="editSubmit">
        <div class="d-flex align-items-center mt-5 pl-10">
            <div class="mr-5">
                <img :src="user_image" />
                <i class="symbol-badge bg-success"></i>
            </div>
            <div class="d-flex flex-column" style="width:100%">
                <b-form-group
                  :state="account_nameState"
                  label="Name *"
                  label-for="account_name-input">
                  <b-form-input
                    id="account_name-input"
                    v-model="editModal.content.account_name"
                    :state="account_nameState"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  :state="surnameState"
                  label="Surname *"
                  label-for="surname-input">
                  <b-form-input
                    id="surname-input"
                    v-model="editModal.content.surname"
                    :state="surnameState"
                  ></b-form-input>
                </b-form-group>
            </div>
        </div>
        
        <b-form-group
          :state="emailState"
          label="Email address *"
          label-for="email-input"
          class="mt-10">
          <b-form-input
            id="email-input"
            v-model="editModal.content.email"
            :state="emailState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="phonenumberState"
          label="Phone number"
          label-for="phonenumber-input">
          <b-form-input
            id="phonenumber-input"
            v-model="editModal.content.phonenumber"
            :state="phonenumberState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="usernameState"
          label="User name *"
          label-for="username-input">
          <b-form-input
            id="username-input"
            v-model="editModal.content.username"
            :state="usernameState"
          ></b-form-input>          
        </b-form-group>
        <b-form-group
          :state="passwordState"
          label="Password"
          label-for="password-input">
          <b-form-input
            id="password-input"
            v-model="editModal.content.password"
            :state="passwordState"
          ></b-form-input>          
        </b-form-group>
        <b-form-group
          :state="repasswordState"
          label="Password(repeat)"
          label-for="repassword-input">
          <b-form-input
            id="repassword-input"
            v-model="editModal.content.repassword"
            :state="repasswordState"
          ></b-form-input>          
        </b-form-group>
        <b-form-checkbox
          v-model="check_password"
          value="true"
          unchecked-value="false"
          size="lg"
          class="mt-3"
        >
          Should change password on next login.
        </b-form-checkbox>
        <b-form-checkbox
          v-model="check_email"
          value="true"
          unchecked-value="false"
          size="lg"
          class="mt-3"
        >
          Send activation email.
        </b-form-checkbox>
        <b-form-checkbox
          v-model="check_active"
          value="true"
          unchecked-value="false"
          size="lg"
          class="mt-3"
        >
          Active
        </b-form-checkbox>
        <b-form-checkbox
          v-model="check_lockout"
          value="true"
          unchecked-value="false"
          size="lg"
          class="mt-3"
        >
          Lockout enabled
        </b-form-checkbox>
      </form>
    </b-modal>

    <!-- permission modal -->
    <b-modal
      size="lg" id="permission-modal" title="Permissions" ok-only>
      <treeselect
        :multiple="true"
        :options="options"
        placeholder="Search..."
        v-model="value"
      />
    </b-modal>

    <!-- dynamic parameters modal -->
    <b-modal
      size="lg" id="parameters-modal" title="Entity Full Name: Integrum.Edge.Authorization.Users.User">
      <template v-slot:default="{ hide }">
        <b-table
            show-empty
            small
            stacked="md"
            :fields="parameter_fields"
            :current-page="currentPage"
            :per-page="perPage"
            class="table-bordered"
            >
            
            <template v-slot:cell(name)="row">
                {{ row.value.first }} {{ row.value.last }}
            </template>

            <template v-slot:row-details="row">
                <b-card>
                    <ul>
                        <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                    </ul>
                </b-card>
            </template>

            <template v-slot:cell(actions)="row">
                
            </template>
        </b-table>
    </template> 
    </b-modal>
  </b-container>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Treeselect },
  data() {
    return {
      items: [
        { 
          username: "admin", 
          account_name: "admin", 
          surname: "admin", 
          roles: "Admin", 
          email: "admin@gmail.com",
          confirm: "yes",
          active: "yes",
          created_time: "06/24/2020"
        },
        { 
          username: "Benjamin", 
          account_name: "ben", 
          surname: "kunka", 
          roles: "user", 
          email: "benjamin@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "Mona", 
          account_name: "chi", 
          surname: "king", 
          roles: "user", 
          email: "Mona@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "Scott", 
          account_name: "Scott", 
          surname: "de", 
          roles: "user", 
          email: "Scott@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "Jori", 
          account_name: "che", 
          surname: "joriche", 
          roles: "user", 
          email: "Jori@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "robbie", 
          account_name: "girl", 
          surname: "robbie", 
          roles: "user", 
          email: "robbie@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "mich", 
          account_name: "el", 
          surname: "michel", 
          roles: "user", 
          email: "michel@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "lock", 
          account_name: "hen", 
          surname: "he", 
          roles: "user", 
          email: "lock@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "coie", 
          account_name: "neir", 
          surname: "se", 
          roles: "user", 
          email: "coie@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "super", 
          account_name: "man", 
          surname: "kunka", 
          roles: "user", 
          email: "super@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        },
        { 
          username: "jaic", 
          account_name: "qo", 
          surname: "kunka", 
          roles: "user", 
          email: "jaic@gmail.com",
          confirm: "no",
          active: "no",
          created_time: "06/24/2020"
        }
      ],
      fields: [
        { key: 'actions', label: 'Actions' },
        { key: 'username', label: 'User name', sortable: true, sortDirection: 'desc' },
        { key: 'account_name', label: 'Name', sortable: true, sortDirection: 'desc' },
        { key: 'surname', label: 'Surname', sortable: true, sortDirection: 'desc' },
        { key: 'roles', label: 'Roles', sortable: true, sortDirection: 'desc' },
        { key: 'email', label: 'Email address', sortable: true, sortDirection: 'desc' },
        { key: 'confirm', label: 'Email confirm', sortable: true, sortDirection: 'desc' },
        { key: 'active', label: 'Active', sortable: true, sortDirection: 'desc' },
        { key: 'created_time', label: 'Creation time', sortable: true, sortDirection: 'desc' },   
      ],
      parameter_fields: [
        { key: 'parameter_name', label: 'Parameter Name', sortDirection: 'desc' },
        { key: 'parameter_value', label: 'Values', sortDirection: 'desc' },
        { key: 'actions', label: 'Actions'}
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100, 250, 500],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      editModal: {
        id: 'editModal',
        title: '',
        content: ''
      },
      username: '',
      usernameState: null,
      account_name: '',
      account_nameState: null,
      surname: '',
      surnameState: null,
      roles: '',
      rolesState: null,
      email: '',
      emailState: null,
      phonenumber: '',
      phonenumberState: null,
      confirm: '',
      active: '',
      created_time: '',
      password: '',
      passwordState: null,
      repassword: '',
      repasswordState: null,
      check_password: false,
      check_email: false,
      check_active: true,
      check_lockout: true,
      editIdeas: [],
      value: [],
      options: [ 
      {
        id: 'pages',
        label: 'Pages',
        isDefaultExpanded: "true",
        children: [
          {
            id: 'administration',
            label: 'Administration',
            children: [
              {
                id: 'auditLogs',
                label: 'Audit logs'
              },
              {
                id: 'dynamicParameters',
                label: 'Dynamic Parameters',
                children: [
                  {
                    id: 'creatingDynamicParameters',
                    label: 'Creating Dynamic Parameters'
                  },
                  {
                    id: 'deletingDynamicParameters',
                    label: 'Deleting Dynamic Parameters'
                  },
                  {
                    id: 'DynamicParameterValue',
                    label: 'Dynamic Parameter Value',
                    children: [
                      {
                        id: 'creatingDynamicParameterValue',
                        label: 'Creating Dynamic Parameter Value'
                      },
                      {
                        id: 'deletingDynamicParameterValue',
                        label: 'Deleting Dynamic Parameter Value'
                      },
                      {
                        id: 'editingDynamicParameterValue',
                        label: 'Editing Dynamic Parameter Value'
                      }
                    ]
                  },
                  {
                    id: 'editingDynamicParameters',
                    label: 'Editing Dynamic Parameters'
                  },
                  {
                    id: 'entityDynamicParameterValue',
                    label: 'Entity Dynamic Parameter Value',
                    children: [
                      {
                        id: 'creatingEntityDynamicParameterValue',
                        label: 'Creating Entity Dynamic Parameter Value'
                      },
                      {
                        id: 'deletingEntityDynamicParameterValue',
                        label: 'Deleting Entity Dynamic Parameter Value'
                      },
                      {
                        id: 'editingEntityDynamicParameterValue',
                        label: 'Editing Entity Dynamic Parameter Value'
                      }
                    ]
                  },
                  {
                    id: 'entityDynamicParameters',
                    label: 'Entity Dynamic Parameters',
                    children: [
                      {
                        id: 'creatingEntityDynamicParameters',
                        label: 'Creating Entity Dynamic Parameters'
                      },
                      {
                        id: 'deletingEntityDynamicParameters',
                        label: 'Deleting Entity Dynamic Parameters'
                      },
                      {
                        id: 'editingEntityDynamicParameters',
                        label: 'Editing Entity Dynamic Parameters'
                      }
                    ]
                  },
                ]
              },
              {
                id: 'hangfireDashboard',
                label: 'Hangfire dashboard'
              },
              {
                id: 'languages',
                label: 'Languages',
                children: [
                  {
                    id: 'changingTexts',
                    label: 'Changing texts'
                  },
                  {
                    id: 'creatingNewLanguage',
                    label: 'Creating new language'
                  },
                  {
                    id: 'deletingLanguage',
                    label: 'Deleting language'
                  },
                  {
                    id: 'edittingLanguage',
                    label: 'Editing language'
                  },
                ]
              },
              {
                id: 'maintenance',
                label: 'Maintenance'
              },
              {
                id: 'organizationUnits',
                label: 'Organization Units',
                children: [
                  {
                    id: 'managingMembers',
                    label: 'Managing members'
                  },
                  {
                    id: 'managingOrganizationTree',
                    label: 'Managing organization tree'
                  },
                  {
                    id: 'managingRoles',
                    label: 'Managing roles'
                  }
                ]
              },
              {
                id: 'roles',
                label: 'Roles',
                children: [
                  {
                    id: 'creatingNewRole',
                    label: 'Creating new role'
                  },
                  {
                    id: 'deletingRole',
                    label: 'Deleting role'
                  },
                  {
                    id: 'editingRole',
                    label: 'Editing role'
                  },
                ]
              },
              {
                id: 'settings',
                label: 'Settings',
              },
              {
                id: 'subscription',
                label: 'Subscription',
              },
              
              {
                id: 'users',
                label: 'Users',
                children: [
                  {
                    id: 'changingPermissions',
                    label: 'Changing permissions',
                  },
                  {
                    id: 'creatingNewUser',
                    label: 'Creating new user',
                  },
                  {
                    id: 'deletingUser',
                    label: 'Deleting user',
                  },
                  {
                    id: 'editingUser',
                    label: 'Editing user',
                  },
                  {
                    id: 'loginForUsers',
                    label: 'Login for users',
                  },
                  {
                    id: 'unlock',
                    label: 'Unlock',
                  }
                ]
              },
              {
                id: 'visualSettings',
                label: 'Visual Settings'
              },
              {
                id: 'webhooks',
                label: 'Webhooks',
                children: [
                  {
                    id: 'activateWebhook',
                    label: 'Activate/Deactivate webhook'
                  },
                  {
                    id: 'creatingNewWebhook',
                    label: 'Creating new webhook'
                  },
                  {
                    id: 'editingWebhook',
                    label: 'Editing webhook'
                  },
                  {
                    id: 'listingWebhookSendAttemptHistory',
                    label: 'Listing Webhook Send Attempt History'
                  },
                  {
                    id: 'resendingaWebhook',
                    label: 'Resending a webhook'
                  },
                  {
                    id: 'seeWebhookDetailPage',
                    label: 'See webhook detail page'
                  },
                ]
              },
            ]             
          },
          {
            id: 'dashboard',
            label: 'Doshboard',
          },
          {
            id: 'demo',
            label: 'Demo UI Components',
          }, 
          {
            id: 'ideas',
            label: 'Ideas',
            children: [
              {
                id: 'createNewIdea',
                label: 'Create new idea'
              },
              {
                id: 'deleteIdea',
                label: 'Delete idea'
              },
              {
                id: 'editIdea',
                label: 'Edit idea'
              },
            ]
          }
        ]
      }
    ]
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    user_image() {
      return process.env.BASE_URL + "media/users/default-profile-picture.png";
    }
  },
  mounted() {
    this.totalRows = this.items.length;
    this.$store.dispatch(SET_BREADCRUMB, [{ title:"Users", subtitle: "Manage users and permissions." }]);
  },
  methods: {
    edit(item, index, button) {
      this.editModal.title = "Edit user"
      this.editModal.content = JSON.parse(JSON.stringify(item, null, 2))
      this.$root.$emit('bv::show::modal', this.editModal.id, button)
    },
    editOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.editSubmit()
    },
    editSubmit() {
      var editRow = {
        username: this.editModal.content.username,
        account_name: this.editModal.content.account_name,
        surname: this.editModal.content.surname,
        email: this.editModal.content.email,
        phonenumber: this.editModal.content.phonenumber,
        password: this.editModal.content.password,
        repassword: this.editModal.content.repassword
      }
      this.editModal.content.push(editRow);
      
      this.$nextTick(() => {
        this.$bvModal.hide('editModal')
      })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>