<template>
  <b-container fluid class="ideas_body">
    <!-- User Interface controls -->
    <b-row class="mb-5">
      <b-col xl="6" sm="12" class="my-1">
        <b-button variant="outline-primary" style="width: 100%" v-b-modal.permission-modal> Select Permissions (0)</b-button>
      </b-col>
      <b-col xl="6">
        <button class="RefreshButton btn btn-primary"><i class="la la-refresh"></i> Refresh</button>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      class="table-bordered"
    >
      <template v-slot:cell(actions)="row">
        <b-dropdown text="Actions" offset="50" variant="primary" class="m-2">
          <b-dropdown-item size="sm" @click="edit(row.item, row.index, $event.target)"> Edit </b-dropdown-item>
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

    <b-modal size="lg" :id="editModal.id" :title="editModal.title"  @ok="editOk">
      <b-tabs>
        <b-tab title="Role name" active>
          <form ref="form" @submit.stop.prevent="editSubmit" class="mt-10 mx-2">
            <b-form-group
              :state="role_nameState"
              label="Role name *"
              label-for="role_name-input"
            >
              <b-form-input
                id="role_name-input"
                v-model="editModal.content.role_name"
                :state="role_nameState"
              ></b-form-input>
            </b-form-group>
            <b-form-checkbox
              id="role-checkbox"
              v-model="role_check"
              value="checked"
              unchecked-value="not_checked"
            >
              Default
            </b-form-checkbox>
            <p> Assign to new users by default.</p>
            <div class="alert alert-warning mt-10" style="color:black">
              <em> If you are changing your own permissions, you may need to refresh page (F5) to take effect of 
              permission changes on your own screen! </em>
            </div>
          </form>
        </b-tab>
        <b-tab title="permissions" class="mt-10 mx-2">
          <treeselect
            :multiple="true"
            :options="options"
            placeholder="Search..."
            v-model="value"
          />
        </b-tab>
      </b-tabs>
      
    </b-modal>
    
    <!-- permission modal -->
    <b-modal
      size="lg" id="permission-modal" title="Select Permissions"
    >
      <treeselect
        :multiple="true"
        :options="options"
        placeholder="Search..."
        v-model="value"
      />
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
            role_name: "Admin", 
            created_time: "06/24/2020"
          },
          { 
            role_name: "User", 
            created_time: "06/24/2020"
          }
        ],
        fields: [
          { key: 'actions', label: 'Actions' },
          { key: 'role_name', label: 'Role name', sortable: false, sortDirection: 'desc' },
          { key: 'created_time', label: 'Created time', sortable: false, sortDirection: 'desc' }   
        ],
        totalRows: 1,
        sortDesc: false,
        sortDirection: '',
        editModal: {
          id: 'editModal',
          title: '',
          content: ''
        },
        role_name: '',
        role_nameState: null,
        created_time: '',
        editIdeas: [],
        role_check: 'checked',
        //... permission tree select
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
      }
    },
    mounted() {
      this.totalRows = this.items.length;
      this.$store.dispatch(SET_BREADCRUMB, [{ title:"Roles", subtitle: "Use roles to group permissions." }]);
    },
    methods: {
      edit(item, index, button) {
        this.editModal.title = "Edit Idea"
        this.editModal.content = JSON.parse(JSON.stringify(item, null, 2))
        this.$root.$emit('bv::show::modal', this.editModal.id, button)
      },
      editOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.editSubmit()
      },
      editSubmit() {
        var role_name= this.editModal.content.role_name;
        this.editModal.content.push(role_name);
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('editModal')
        })
      }
    }
  }
</script>