<template>
    <div class="login_form">
    <!--begin::Content header-->
        <div
        class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
        >
    </div>
    <!--end::Content header-->

    <!--begin::Signup-->
    <div class="login-form login-signin">
        <div class="text-center mb-10 mb-lg-20">
            <h3 class="font-size-h1"> Forgot password? </h3>
        </div>
        <div class="text-center">
            <p>A password reset link will be sent to your email to reset your password. 
                If you don't get an email within a few minutes, please re-try.</p>
        </div>

    <!--begin::Form-->
        <b-form class="form" @submit.stop.prevent="onSubmit">
            <b-form-group
                id="example-input-group-1"
                label=""
                label-for="example-input-1"
            >
            <b-form-input
                class="form-control form-control-solid h-auto py-5 px-6"
                id="example-input-1"
                type="email"
                name="example-input-1"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
                aria-describedby="input-1-live-feedback"
                placeholder="Email address *"
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-live-feedback" v-if="!$v.form.email.required">
                The field is required.
            </b-form-invalid-feedback>
                <p class="error" v-if="!$v.form.email.email">
                    Invalid email address.
                </p>
            </b-form-group>

            <!--begin::Action-->
            <div class="form-group register_btns">
                <button
                    v-on:click="$router.push('login')"
                    class="btn btn-white font-weight-bold px-12 py-4 my-3 font-size-3 mx-5 left"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg>
                    Back
                </button>
                <button
                    type="submit"
                    ref="kt_login_signup_submit"
                    class="btn font-weight-bold px-12 py-4 my-3 font-size-3 mx-5 right"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    Submit
                </button>
            </div>
        <!--end::Action-->
        </b-form>
      <!--end::Form-->
    </div>
    <!--end::Signup-->
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
.error{
  color: red;
  font-size: 12px;
}
</style>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/core/services/store/auth.module";
import { LOGOUT } from "@/core/services/store/auth.module";

import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "register",
  data() {
    return {
      // Remove this dummy login info
      form: {
        email: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        email: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const email = this.$v.form.email.$model;

      // clear existing errors
      this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = this.$refs["kt_login_signup_submit"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      // dummy delay
      setTimeout(() => {
        // send register request
        this.$store
          .dispatch(REGISTER, {
            email: email,
          })
          .then(() => this.$router.push({ name: "dashboard" }));

        submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
      }, 2000);
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
