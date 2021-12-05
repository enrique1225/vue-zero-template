<template>
    <div data-scroll="true"  class="notification margin-t-10 margin-b-10 scroll" 
        style="overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
            <div class="notification__item-icon">
                <i class="flaticon-user-settings"></i>
            </div>
            <div class="notification__item-details">
                <div class="notification__item-title kt-font-bold" @click="$bvModal.show('modal-scoped')">
                    Manage linked accounts
                </div>
                <b-modal id="modal-scoped" size="lg">
                    <template v-slot:modal-header="{ close }">
                        <h5> Linked accounts </h5>
                        <button class="btn btn-primary pull-right" v-b-modal.modal-multi-1>
                            <i class="fa fa-plus"></i>Link new account
                        </button>
                    </template>  
                    <template v-slot:default="{ hide }">
                        <b-table
                            show-empty
                            small
                            stacked="md"
                            :accounts="accounts"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            class="table-bordered"
                            >
                            <template v-slot:cell(actions)="row">
                                
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
                    </template> 
                    <template v-slot:modal-footer="{ hide }">
                        <b-button size="md" variant="outline-secondary" @click="hide()">
                            Close
                        </b-button>
                    </template>                     
                </b-modal>

                <b-modal id="modal-multi-1" title="Second Modal" @show="resetModal" @hidden="resetModal" @ok="handleOk" v-b-modal.modal-footer-sm>
                    <template v-slot:modal-header="{ close }">
                        <h5> Linked new account </h5>
                        <button type="button" class="close" aria-label="Close" @click="close()">
                            <p aria-hidden="true">×</p>
                        </button>
                    </template>  
                    <template v-slot:default="{ hide }">
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-group
                                :state="tenancy_nameState"
                                label="Tenancy name"
                                label-for="tenancy_name-input"
                                >
                                <b-form-input
                                    id="tenancy_name-input"
                                    v-model="tenancy_name"
                                    :state="tenancy_nameState"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                            :state="usernameState"
                            label="User name *"
                            label-for="username-input"
                            invalid-feedback="The field is required"
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
                            label="Password *"
                            label-for="password-input"
                            invalid-feedback="The field is required"
                            >
                                <b-form-input
                                    id="password-input"
                                    v-model="password"
                                    :state="passwordState"
                                    required
                                ></b-form-input>
                            </b-form-group>
                        </form>
                    </template>
                </b-modal>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tenancy_name: '',
            username: '',
            password: '',
            tenancy_nameState: null,
            usernameState: null,
            passwordState: null,
            submittedNames: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 25, 50, 100, 250, 500],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            accounts: [
                { 
                    username: "benjamin", 
                    delete: "",
                }
            ],
            fields: [
                { key: 'actions', label: 'Actions' },
                { key: 'username', label: 'User name', sortable: true, sortDirection: 'desc' },
                { key: 'delete', label: 'Delete', sortable: false, sortDirection: 'desc' }     
            ],
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.usernameState = valid
            this.passwordState = valid
            return valid
        },
        resetModal() {
            this.tenancy_name= '',
            this.tenancy_nameState = null,
            this.username= '',
            this.usernameState = null,
            this.password= '',
            this.passwordState = null
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.handleSubmit()
        },
        handleSubmit() {if (!this.checkFormValidity()) {
                return
            }
            this.submittedNames.push(this.tenancy_name,this.username,this.password)
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
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
};
</script>
