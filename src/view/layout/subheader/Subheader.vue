<template>
  <div
    class="subheader py-2 py-lg-4"
    v-bind:class="subheaderClasses"
    id="kt_subheader"
  >
    <div
      class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-flex align-items-center flex-wrap mr-1">
        <h5 class="text-dark font-weight-bold my-2 mr-5">
          {{ title }}
        </h5>
        <ul
          class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2"
        >
          <li class="breadcrumb-item">
            <router-link :to="'/'" class="subheader-breadcrumbs-home">
            </router-link>
          </li>

          <template v-for="(breadcrumb, i) in breadcrumbs">
            <li class="breadcrumb-item" :key="`${i}-${breadcrumb.id}`" >
              <router-link
                v-if="breadcrumb.route"
                :key="i"
                :to="breadcrumb.route"
                class="text-muted"
              >
                {{ breadcrumb.title }}
              </router-link>
              <span class="text-muted" :key="i" v-if="!breadcrumb.route">
                {{ breadcrumb.subtitle }}
              </span>
            </li>
          </template>
        </ul>
      </div>
      <div class="d-flex align-items-center"  v-for="item in breadcrumbs" :key="item.id"> 
        <div v-if="item.title == 'Dashboard'">
          <button type="button" class="btn btn-brand btn-icon btn-filter  ng-star-inserted" v-b-modal.modal-filter>
            <i class="fa fa-filter" style="color:white;"></i>
          </button>

          <b-modal
            id="modal-filter"
            ref="modal"
            title="Dashboard Filters"
            @show="resetDashboardModal"
            @hidden="resetDashboardModal"
            @ok="handleDashboardOk">
            <form ref="form" @submit.stop.prevent="handleDashboardSubmit">
              <b-form-group
                :state="dashboard_nameState"
                label="Name"
                label-for="dashboard_name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="dashboard_name-input"
                  v-model="dashboard_name"
                  :state="dashboard_nameState"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
          </b-modal>

          <p class="switch switch-default switch-sm">
            <label>
              <input type="checkbox" checked="checked" name="" />
              <span></span>
            </label>
          </p>

          <strong class="p-1"> Edit mode </strong>
        </div>

        <div v-if="item.title == 'Ideas'">
          <button class="btn btn-outline-success" v-on:click="download_ideas">
            <i class="fa fa-file-excel"></i> Export to excel
          </button>
          <button class="btn btn-primary blue" style="margin-left: 10px!important" v-b-modal="'modal-ideas'">
            <i class="fa fa-plus"></i> Create new idea
          </button>

          <b-modal id="modal-ideas" ref="modal" size="lg"  @show="resetIdeasModal" @hidden="resetIdeasModal" @ok="handleIdeasOk">
              <template v-slot:modal-header="{ close }">
                  <h5> Create new idea </h5>
                  <button type="button" class="close" aria-label="Close" @click="close()">
                      <p aria-hidden="true">×</p>
                  </button>
              </template>  
              <template v-slot:default="{ hide }">
                  <form ref="form" @submit.stop.prevent="handleIdeasSubmit">
                      <b-form-group
                          :state="descriptionState"
                          label="Description"
                          label-for="description-input"
                          invalid-feedback="The field is required."
                          >
                          <b-form-input
                              id="description-input"
                              v-model="description"
                              :state="descriptionState"
                              required
                          ></b-form-input>
                      </b-form-group>

                      <b-form-group
                      :state="keywordsState"
                      label="Keywords"
                      label-for="keywords-input"
                      invalid-feedback="The field is required."
                      >
                          <b-form-input
                              id="keywords-input"
                              v-model="keywords"
                              :state="keywordsState"
                              required
                          ></b-form-input>
                      </b-form-group>

                      <b-form-group
                      :state="goalsState"
                      label="Goals"
                      label-for="goals-input"
                      invalid-feedback="The field is required."
                      >
                          <b-form-input
                              id="goals-input"
                              v-model="goals"
                              :state="goalsState"
                              required
                          ></b-form-input>
                      </b-form-group>

                      <b-form-group
                      :state="referenceState"
                      label="Reference"
                      label-for="reference-input"
                      invalid-feedback="The field is required."
                      >
                          <b-form-input
                              id="reference-input"
                              v-model="reference"
                              :state="referenceState"
                              required
                          ></b-form-input>
                      </b-form-group>

                      <b-form-group
                      :state="priorityState"
                      label="Priority"
                      label-for="priority-input"
                      invalid-feedback="The field is required."
                      >
                          <b-form-input
                              id="priority-input"
                              v-model="priority"
                              :state="priorityState"
                              required
                          ></b-form-input>
                      </b-form-group>
                  </form>
              </template>
          </b-modal>
        </div>

        <div v-if="item.title == 'Roles'">
          <button class="btn btn-primary blue"  v-b-modal="'modal-role'">
            <i class="fa fa-plus"></i> Create new role
          </button>

          <b-modal id="modal-role" ref="modal" size="lg" @show="resetRolesModal" @hidden="resetRolesModal"  @ok="handleRoleOk">
              <template v-slot:modal-header="{ close }">
                  <h5> Create new role </h5>
                  <button type="button" class="close" aria-label="Close" @click="close()">
                      <p aria-hidden="true">×</p>
                  </button>
              </template>  
              <template v-slot:default="{ hide }">
                  <b-tabs>
                    <b-tab title="Role name" active>
                      <form ref="form" @submit.stop.prevent="handleRoleSubmit" class="mt-10 mx-2">
                        <b-form-group
                          :state="role_nameState"
                          label="Role name *"
                          label-for="role_name-input"
                        >
                          <b-form-input
                            id="role_name-input"
                            v-model="role_name"
                            :state="role_nameState"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-checkbox
                          id="role-checkbox"
                          v-model="role_check"
                          value="checked"
                          unchecked-value="not_checked"
                          size="lg"
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
              </template>
          </b-modal>
        </div>

        <div v-if="item.title == 'Users'">
          <b-dropdown text="Excel operations"  variant="success">
            <b-dropdown-item @click="download_users"> <i class="fa fa-download" style="margin-right: 10px"></i> Export to excel </b-dropdown-item>
            <b-dropdown-item href="#"> <i class="fa fa-plus" style="margin-right: 10px"></i> Import from excel </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/assets/sampleFiles/ImportUsersSampleFile.xlsx"> click here </router-link> 
              to download <br> sample import file. </b-dropdown-item>
          </b-dropdown>
          <button class="btn btn-primary blue" style="margin-left: 10px!important" v-b-modal="'modal-users'">
            <i class="fa fa-plus"></i> Create new user
          </button>

          <b-modal id="modal-users" ref="modal" size="lg" @show="resetUsersModal" @hidden="resetUsersModal"  @ok="handleUsersOk">
              <template v-slot:modal-header="{ close }">
                  <h5> Create new user </h5>
                  <button type="button" class="close" aria-label="Close" @click="close()">
                      <p aria-hidden="true">×</p>
                  </button>
              </template>  
              <template v-slot:default="{ hide }">
                <b-tabs content-class="mt-3 pt-3">
                  <b-tab title="User information" active>
                    <form ref="form" @submit.stop.prevent="handleUsersSubmit">
                      <div class="d-flex align-items-center mt-5 pl-10">
                        <div class="mr-5">
                            <img :src="user_image" />
                            <i class="symbol-badge bg-success"></i>
                        </div>
                        <div class="d-flex flex-column" style="width:100%">
                          <b-form-group
                              :state="account_nameState"
                              label="Name *"
                              label-for="account_name-input"
                              invalid-feedback="The field is required."
                              >
                              <b-form-input
                                  id="account_name-input"
                                  v-model="account_name"
                                  :state="account_nameState"
                                  required
                              ></b-form-input>
                          </b-form-group>

                          <b-form-group
                          :state="surnameState"
                          label="Surname *"
                          label-for="surname-input"
                          invalid-feedback="The field is required."
                          >
                              <b-form-input
                                  id="surname-input"
                                  v-model="surname"
                                  :state="surnameState"
                                  required
                              ></b-form-input>
                          </b-form-group>
                        </div>
                      </div>

                        <b-form-group
                        :state="emailState"
                        label="Email"
                        label-for="email-input"
                        invalid-feedback="The field is required."
                        >
                            <b-form-input
                                id="email-input"
                                v-model="email"
                                :state="emailState"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                        :state="phonenumberState"
                        label="Phone number"
                        label-for="phonenumber-input"
                        >
                            <b-form-input
                                id="phonenumber-input"
                                v-model="phonenumber"
                                :state="phonenumberState"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                        :state="usernameState"
                        label="User name *"
                        label-for="username-input"
                        invalid-feedback="The field is required."
                        >
                            <b-form-input
                                id="username-input"
                                v-model="username"
                                :state="usernameState"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                        :state="passwordState"
                        label="Password"
                        label-for="password-input"
                        >
                            <b-form-input
                                id="password-input"
                                v-model="password"
                                :state="passwordState"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                        :state="repasswordState"
                        label="Password (repeat)"
                        label-for="repassword-input"
                        >
                            <b-form-input
                                id="repassword-input"
                                v-model="repassword"
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
                  </b-tab>
                  <b-tab title="Roles">
                    <b-form-checkbox
                      v-model="admin_role_check"
                      value="true"
                      unchecked-value="false"
                      size="lg"
                      class="mt-3"
                    >
                      Admin
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-model="user_role_check"
                      value="true"
                      unchecked-value="false"
                      size="lg"
                      class="mt-3"
                    >
                      User
                    </b-form-checkbox>
                  </b-tab>
                  <b-tab title="Organization Units">
                    <b-form-group>
                      <b-input-group size="sm">
                        <b-form-input
                          v-model="filter"
                          type="search"
                          id="filterInput"
                          placeholder="Search..."
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>
                  </b-tab>
                </b-tabs>
              </template>
          </b-modal>
        </div>

        <div v-if="item.title == 'Settings'">
          <button class="btn btn-primary blue">
            <i class="la la-floppy-o"></i> Save all
          </button>
        </div>      
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .custom-v-dropdown {
    &.dropdown-toggle {
      padding: 0;
      &:hover {
        text-decoration: none;
      }

      &.dropdown-toggle-no-caret {
        &:after {
          content: none;
        }
      }
    }

    &.dropdown-menu {
      margin: 0;
      padding: 0;
      outline: none;
      .b-dropdown-text {
        padding: 0;
      }
    }
  }
  .btn-filter{
      background-color: #5d78ff;
      border-color: #5d78ff;
      color: #fff;
      height: 32px!important;
      width: 32px!important;
      padding-top: 0;
      padding-bottom: 0;
      margin-top: .25rem;
      margin-bottom: .25rem;
  }
  .btn-filter:hover{
    background-color: #2e4ad8!important;
    color: #fff!important;
  }
  .btn i{
    font-size: 14px;
  }
  .switch{
    display: inline-flex!important;
  }
  .switch label span{
    margin: -7px 0 -7px 14px!important;
    width: 60px!important;
  }
  .switch input:checked ~ span:before {
    background-color: #2196F3!important;
    width: 55px!important;
  }
  .switch.switch-sm input:empty ~ span:before{
    width: 55px!important;
  }
  .switch input:checked ~ span:after{
    background-color: #ffffff!important;
    margin-left: 30px!important;
  }
</style>

<script>
import { mapGetters } from "vuex";
import XLSX from 'xlsx';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
  name: "KTSubheader",
  props: {
    breadcrumbs: Array,
    title: String
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

    widthFluid() {
      return this.layoutConfig("subheader.width") === "fluid";
    },

    subheaderClasses() {
      const classes = [];
      const style = this.layoutConfig("subheader.style");
      if (style) {
        classes.push(style);

        if (style === "solid") {
          classes.push("bg-white");
        }

        if (this.layoutConfig("subheader.fixed")) {
          classes.push("border-top");
        }
      }
      return classes.join(" ");
    },

    user_image() {
      return process.env.BASE_URL + "media/users/default-profile-picture.png";
    }
  },
  data() {
    return {
      //... dashboard page
      dashboard_name: '',
      dashboard_nameState: null,
      submittedNames: [],

      //... ideas page
      description: '',
      descriptionState: null,
      keywords: '',
      keywordsState: null,
      goals: '',
      goalsState: null,
      reference: '',
      referenceState: null,
      priority: '',
      priorityState: null,
      submittedIdeas: [],

      //... roles page
      role_name: '',
      role_nameState: null,
      created_time: '',
      role_check: 'checked',
      submittedRole: [],
      editModal: {
        id: 'editModal',
        title: '',
        content: ''
      },

      //... users page
      username: '',
      usernameState: null,
      account_name: '',
      account_nameState: null,
      surname: '',
      surnameState: null,
      email: '',
      emailState: null,
      phonenumber: '',
      phonenumberState: null,
      password: '',
      passwordState: null,
      repassword: '',
      repasswordState: null,
      password_show: false,
      check_password: false,
      check_email: false,
      check_active: true,
      check_lockout: true,
      admin_role_check: false,
      user_role_check: true,
      filter: null,
      submittedUsers: [],
      export_ideas: [
        { description: "Most popular sports", keywords: "sports,football", goals: "worldcup", reference: "sports", priority: "1" },
        { description: "Most popular game", keywords: "game,DOTA", goals: "Esports", reference: "esports", priority: "1" }
      ],
      export_users: [
        { username: "admin", account_name: "admin", surname: "admin", roles: "Admin", email: "admin@gmail.com",confirm: "yes",active: "yes",created_time: "06/24/2020"},
        { username: "Benjamin", account_name: "ben", surname: "kunka", roles: "user", email: "benjamin@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "Mona", account_name: "chi", surname: "king", roles: "user", email: "Mona@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "Scott", account_name: "Scott", surname: "de", roles: "user", email: "Scott@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "Jori", account_name: "che", surname: "joriche", roles: "user", email: "Jori@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "robbie", account_name: "girl", surname: "robbie", roles: "user", email: "robbie@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "mich", account_name: "el", surname: "michel", roles: "user", email: "michel@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "lock", account_name: "hen", surname: "he", roles: "user", email: "lock@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "coie", account_name: "neir", surname: "se", roles: "user", email: "coie@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "super", account_name: "man", surname: "kunka", roles: "user", email: "super@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"},
        { username: "jaic", account_name: "qo", surname: "kunka", roles: "user", email: "jaic@gmail.com",confirm: "no",active: "no",created_time: "06/24/2020"}
      ],
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
    };
  },
  methods: {
    resetDashboardModal() {
      //... dashboard page
      this.dashboard_name = '',
      this.dashboard_nameState = null
    },
    resetIdeasModal(){
      //... ideas page
      this.description= '',
      this.descriptionState= null,
      this.keywords= '',
      this.keywordsState= null,
      this.goals= '',
      this.goalsState= null,
      this.reference= '',
      this.referenceState= null,
      this.priority= '',
      this.priorityState= null
    },
    resetRolesModal(){
      //.. roles page
      this.role_name= '',
      this.role_nameState= null,
      this.role_check= ''
    },
    resetUsersModal(){
      //... users page
      this.account_name= '',
      this.account_nameState= null,
      this.surname= '',
      this.surnameState= null,
      this.email= '',
      this.emailState= null,
      this.phonenumber= '',
      this.phonenumberState= null,
      this.username= '',
      this.usernameState= null,
      this.password= '',
      this.passwordState= null,
      this.repassword= '',
      this.repasswordState= null,
      this.random_password = null,
      this.check_password= true,
      this.check_email= true,
      this.check_active= true,
      this.check_lockout= true,
      this.admin_role_check= false,
      this.user_role_check= true,
      this.filter= ''
    },
    //... dashboard page
    handleDashboardOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleDashboardSubmit();
    },
    handleDashboardSubmit() {
      this.submittedNames.push(this.name)
      this.$nextTick(() => {
        this.$bvModal.hide('modal-filter')
      })
    },
    //... ideas page
    handleIdeasOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleIdeasSubmit();
    },
    handleIdeasSubmit(){
      this.submittedIdeas.push(this.description,this.keywords,this.goals,this.reference,this.priority),
      console.log("New idea includes" + this.description,this.keywords,this.goals,this.reference,this.priority)
      this.$nextTick(() => {
        this.$bvModal.hide('modal-ideas')
      })
    },
    //... roles page
    handleRoleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleRoleSubmit();
    },        
    handleRoleSubmit(){
      this.submittedRole.push(this.role_name),
      console.log("role name is " + this.role_name)
      this.$nextTick(() => {
        this.$bvModal.hide('modal-role')
      })
    },
    //... users page
    handleUsersOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleUsersSubmit();
    },        
    handleUsersSubmit(){
      this.submittedUsers.push(this.account_name,this.surname,this.email,this.phonenumber,this.username,this.password),
      console.log("name is " + this.account_name);
      console.log("surname is " + this.surname);
      console.log("email is " + this.email);
      console.log("phone number is " + this.phone_number);
      console.log("username is " + this.username);
      console.log("password is " + this.password);
      this.$nextTick(() => {
        this.$bvModal.hide('modal-users')
      })
    },
    download_ideas : function() {
      const data = XLSX.utils.json_to_sheet(this.export_ideas)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'data')
      XLSX.writeFile(wb,'ideas.xlsx')
    },
    download_users : function() {
      const data = XLSX.utils.json_to_sheet(this.export_users)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'data')
      XLSX.writeFile(wb,'users.xlsx')
    }
  },
  components: { Treeselect }
};
</script>
