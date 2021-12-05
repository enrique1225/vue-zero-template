<template>
    <div data-scroll="true"  class="notification margin-t-10 margin-b-10 scroll" 
        style="overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
            <div class="notification__item-icon">
                <i class="flaticon-users"></i>
            </div>
            <div class="notification__item-details">
                <div class="notification__item-title kt-font-bold" @click="$bvModal.show('modal-scoped01')">
                    Manage authority delegations 
                </div>
                <b-modal id="modal-scoped01" size="lg">
                    <template v-slot:modal-header="{ close }">
                        <h5> User Delegations </h5>
                        <button class="btn btn-primary pull-right" v-b-modal.modal-authority-multi-1>
                            <i class="fa fa-plus"></i> Delegate New User
                        </button>
                    </template>  
                    <template v-slot:default="{ hide }">
                        <b-table
                            show-empty
                            small
                            stacked="md"
                            :items="delegate_users"
                            :fields="fields"
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
                <b-modal id="modal-authority-multi-1" title="Second Modal" @show="resetModal" @hidden="resetModal" @ok="handleDelegateOk">
                    <template v-slot:modal-header="{ close }">
                        <h5>Delegate New User </h5>
                        <button type="button" class="close" aria-label="Close" @click="close()">
                            <p aria-hidden="true">×</p>
                        </button>
                    </template>  
                    <template v-slot:default="{ hide }">
                        <form ref="form" @submit.stop.prevent="handleDelegateSubmit">
                            <b-form-group
                                :state="usernameState"
                                label="User name"
                                label-for="username-input"
                                invalid-feedback="The field is required"
                            >
                                <div class="input-group">
                                    <b-form-input
                                        id="username-input"
                                        v-model="username"
                                        :state="usernameState"
                                        readonly="readonly"
                                        disabled="disabled"
                                        required                                        
                                    ></b-form-input>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary" v-b-modal.modal-authority-multi-2>Search</button>
                                    </div>
                                </div>
                            </b-form-group>

                            <label class="mt-3" for="datepicker-dateformat2"> Start time </label>
                            <b-form-datepicker
                                id="datepicker-dateformat2"
                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                locale="en"
                                ></b-form-datepicker>

                            <label class="mt-3" for="datepicker-dateformat3"> End time </label>
                            <b-form-datepicker
                                id="datepicker-dateformat3"
                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                locale="en"
                                ></b-form-datepicker>
                        </form>
                    </template> 
                </b-modal>
                <b-modal size="lg" id="modal-authority-multi-2" title="Third Modal">
                    <template v-slot:modal-header="{ close }">
                        <h5> Select a user </h5>
                    </template> 
                    <template v-slot:default="{ hide }">
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <div class="input-group mb-5">
                                <b-form-input
                                    id="search"
                                    placeholder="Search..."
                                    v-model="search"
                                ></b-form-input>
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn btn-primary">
                                        <i class="flaticon-search-1" aria-label="Search"></i>
                                    </button>
                                </div>
                            </div>
                            <b-table
                                show-empty
                                small
                                stacked="md"
                                :items="search_users"
                                :fields="search_fields"
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
                        </form>
                    </template> 
                </b-modal>
            </div>
        </a>
    </div>
</template>

<style lang="scss">
    .input-group-append {
        display: flex;
        margin-left: -1px;
    }
    .table-bordered tbody td{
        padding-top: 20px;
    }
</style>
    
<script>
export default {
    data() {
        return {
            username: '',
            usernameState: null,
            search: '',
            submittedNames: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 25, 50, 100, 250, 500],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            delegate_users: [
                { 
                    username: "benjamin", 
                    startTime: "07/01/2020",
                    endTime: "12/31/2020"
                }
            ],
            fields: [
                { key: 'username', label: 'User name', sortable: true, sortDirection: 'desc' },
                { key: 'startTime', label: 'Start Time', sortable: false, sortDirection: 'desc' },
                { key: 'endTime', label: 'End Time', sortable: false, sortDirection: 'desc' }     
            ],
            search_users: [],
            search_fields: [
                { key: 'select', label: "Select" },
                { key: "search_name", label: "Name" }
            ]
        };
    },
    methods: {
        // checkFormValidity() {
        //     const valid = this.$refs.form.checkValidity()
        //     this.usernameState = valid
        //     return valid
        // },
        resetModal() {
            this.username= '',
            this.usernameState = null
        },
        handleDelegateOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.handleDelegateSubmit()
        },
        handleDelegateSubmit() {
            // if (!this.checkFormValidity()) {
            //     return
            // }
            this.submittedNames.push(this.username)
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-authority-multi-1')
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
