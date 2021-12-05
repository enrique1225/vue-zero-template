<template>
    <div data-scroll="true"  class="notification margin-t-10 margin-b-10 scroll" 
        style="overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
            <div class="notification__item-icon">
                <i class="flaticon-more-v6"></i>
            </div>
            <div class="notification__item-details">
                <div class="notification__item-title kt-font-bold" @click="$bvModal.show('modal-scoped02')">
                    Change password
                </div>

                <b-modal size="lg" id="modal-scoped02" @show="resetModal" @hidden="resetModal" @ok="handleOk" v-b-modal.modal-footer-sm>
                    <template v-slot:modal-header="{ close }">
                        <h5> Change password </h5>
                        <button type="button" class="close" aria-label="Close" @click="close()">
                            <p aria-hidden="true">×</p>
                        </button>
                    </template>  
                    <template v-slot:default="{ hide }">
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-group
                                :state="current_passwordState"
                                label="Current password"
                                label-for="current_password-input"
                                invalid-feedback="The field is required."
                                >
                                <b-form-input
                                    id="current_password-input"
                                    v-model="current_password"
                                    :state="current_passwordState"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                            :state="passwordState"
                            label="New Password"
                            label-for="password-input"
                            invalid-feedback="The field is required."
                            >
                                <b-form-input
                                    id="password-input"
                                    v-model="password"
                                    :state="passwordState"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                            :state="repasswordState"
                            label="New Password (repeat)"
                            label-for="repassword-input"
                            invalid-feedback="The field is required."
                            >
                                <b-form-input
                                    id="repassword-input"
                                    v-model="repassword"
                                    :state="repasswordState"
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
            current_password: '',
            password: '',
            repassword: '',
            current_passwordState: null,
            passwordState: null,
            repasswordState: null,
            submittedNames: []
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.current_passwordState = valid
            this.passwordState = valid
            this.repasswordState = valid
            return valid
        },
        resetModal() {
            this.current_password= '',
            this.passwordState = null,
            this.repassword= '',
            this.repasswordState = null,
            this.password= '',
            this.passwordState = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            this.submittedNames.push(this.current_password,this.password,this.repassword)
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        }
    },
};
</script>
