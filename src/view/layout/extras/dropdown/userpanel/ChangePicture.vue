<template>
    <div data-scroll="true"  class="notification margin-t-10 margin-b-10 scroll" 
        style="overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
            <div class="notification__item-icon">
                <i class="flaticon-profile-1"></i>
            </div>
            <div class="notification__item-details">
                <div class="notification__item-title kt-font-bold" @click="$bvModal.show('modal-scoped04')">
                    Change profile picture
                </div>

                <b-modal id="modal-scoped04" size="lg" @show="resetModal" @hidden="resetModal" @ok="handleOk" v-b-modal.modal-footer-sm>
                    <template v-slot:modal-header="{ close }">
                        <h5> Change profile picture </h5>
                        <button type="button" class="close" aria-label="Close" @click="close()">
                            <p aria-hidden="true">×</p>
                        </button>
                    </template>  
                    <template v-slot:default="{ hide }">
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-checkbox size="lg" v-model="profile_picture">
                                Use Gravatar profile picture
                            </b-form-checkbox>

                            <div class="left_div mt-10" v-if="profile_picture == false">
                                <b-form-file v-model="file" plain style="width: 250px" @change="previewImage"></b-form-file>
                                <span> You can select a JPG/JPEG/PNG file with a maximum 5MB size. </span>
                            </div>

                            <div class="left_div mt-10" v-else>
                                <b-form-file v-model="file" plain style="width: 250px" disabled></b-form-file>
                            </div>

                            <div class="image-preview" v-if="imageData.length > 0">
                                <img class="preview" :src="imageData">
                            </div>
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
            submittedNames: [],
            file: null,
            profile_picture: false,
            imageData: ""
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
        },
        //... preview image when file is uploaded
        previewImage: function(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    },
};
</script>
