<template>
    <div data-scroll="true"  class="notification margin-t-10 margin-b-10 scroll" 
        style="overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
            <div class="notification__item-icon">
                <i class="flaticon-cogwheel"></i>
            </div>
            <div class="notification__item-details">
                <div class="notification__item-title kt-font-bold" @click="$bvModal.show('modal-scoped05')">
                    My settings
                </div>

                <b-modal id="modal-scoped05" size="lg" @show="resetModal" @hidden="resetModal" @ok="handleOk" v-b-modal.modal-footer-sm>
                    <template v-slot:modal-header="{ close }">
                        <h5> My settings </h5>
                        <button type="button" class="close" aria-label="Close" @click="close()">
                            <p aria-hidden="true">×</p>
                        </button>
                    </template>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Profile" active>
                            <template v-slot:default="{ hide }">
                                <form ref="form" @submit.stop.prevent="handleSubmit">
                                    <b-form-group
                                        :state="nameState"
                                        label="Name *"
                                        label-for="name-input"
                                        invalid-feedback="The field is required."
                                        >
                                        <b-form-input
                                            id="name-input"
                                            v-model="name"
                                            :state="nameState"
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

                                    <b-form-group
                                    :state="emailState"
                                    label="Email address *"
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
                                    :state="usernameState"
                                    label="Username *"
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

                                    <p> Can not change username of admin.</p>
                                </form>
                            </template>
                        </b-tab>
                        <b-tab title="Two Factor Login">
                            <div v-if="google_authenticate">
                                <h4> Google Authenticator </h4>
                                <div>
                                    <p> Scan this QR code with your mobile app </p>
                                    <div class="text-center">
                                        <img src="https://chart.googleapis.com/chart?cht=qr&amp;chs=300x300&amp;chl=otpauth%3A%2F%2Ftotp%2Fadmin%40defaulttenant.com%3Fsecret%3DGIYDCMBSMZRDGMLD%26issuer%3DIntegrum.Edge">
                                    </div>
                                    <small style="display:block"> 
                                        Not sure what this screen means? You may need to check this : 
                                        <a href="https://support.google.com/accounts/answer/1066447" target="_blank" rel="noopener noreferrer">
                                        Google Authenticator</a>
                                    </small>
                                    <button type="button" class="btn btn-danger mt-3" @click="disable_authenticate">Disable</button>
                                </div>
                            </div>
                            <div v-else>
                                <h4> Google Authenticator </h4>
                                <button type="button" class="btn btn-success" @click="enable_authenticate">Enable</button>
                            </div>
                        </b-tab>
                    </b-tabs>
                    
                </b-modal>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'admin',
            surname: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            nameState: null,
            surnameState: null,
            emailState: null,
            usernameState: null,
            submittedNames: [],
            google_authenticate: false
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            this.surnameState = valid
            this.emailState = valid
            this.usernameState = valid
            return valid
        },
        resetModal() {
            this.name= '',
            this.nameState = null,
            this.surname= '',
            this.surnameState = null,
            this.email= '',
            this.emailState = null,
            this.username= '',
            this.usernameState = null
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
            this.submittedNames.push(this.name,this.surname,this.email,this.username)
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },
        disable_authenticate(){
            this.google_authenticate= false;
        },
        enable_authenticate(){
            this.google_authenticate= true;
        }
    },
};
</script>
