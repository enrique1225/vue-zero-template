<template>
    <b-container fluid class="ideas_body">
        <b-tabs>
            <b-tab title="Appearance" class="mb-10" active>
                <b-row class="mt-10">
                    <b-col md="6">
                        <h5 class="pl-3 pb-2"> Application Logo </h5>
                        <form method="" action="">
                            <div class="form-group">
                                <input type="file" required="" class="col-lg-12">
                                <span class="form-text col-lg-12 pt-2"> Select a JPG/JPEG/PNG/GIF file with a maximum of 30KB 
                                size and 139x35 pixel resolution.</span>
                            </div>
                            <button type="button" class="btn btn-primary"> Upload </button>
                            <button type="button" class="btn btn-default ml-3"> Clear </button>
                        </form>
                    </b-col>
                    <b-col md="6">
                        <h5 class="pl-3 pb-2"> Custom CSS </h5>
                        <p class="pb-2 pl-3">
                            <router-link to="">
                                Download
                            </router-link>
                        </p>
                        <form method="" action="">
                            <div class="form-group">
                                <input type="file" required="" class="col-lg-12">
                                <span class="form-text col-lg-12"> Select a .css file with a maximum of 1MB size.</span>
                            </div>
                            <button type="button" class="btn btn-primary"> Upload </button>
                            <button type="button" class="btn btn-default ml-3"> Clear </button>
                        </form>
                    </b-col>
                </b-row>
            </b-tab>
            <b-tab title="User management">
                <div class="form-group mt-10">
                    <h5> Form-Based Registration </h5>
                    <b-form-checkbox size="lg" v-model="allow_users">
                        Allow users to register to the system.
                    </b-form-checkbox>
                    <p> If you disable this, users will only be added by admin using user management page. </p>
                </div>
                <div v-if="allow_users==true" class="pl-5">
                    <div class="form-group">
                        <b-form-checkbox size="lg" v-model="default_active">
                            New registered users are active by default.
                        </b-form-checkbox>
                        <p> If you disable this, new users will not be active (and can not login) until admin manually activates the account. </p>
                    </div>
                    <div class="form-group">
                        <b-form-checkbox size="lg" v-model="register_security_image">
                            Use security image question (captcha) on registration.
                        </b-form-checkbox>
                    </div>
                    <div class="form-group">
                        <b-form-checkbox size="lg" v-model="login_security_image">
                            Use security image question (captcha) on login.
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="form-group">
                    <h5> Cookie consent </h5>
                    <b-form-checkbox size="lg" v-model="cookie_consent">
                        Cookie consent enabled.
                    </b-form-checkbox>
                </div>
                <div class="form-group">
                    <h5> Session Timeout Control </h5>
                    <b-form-checkbox size="lg" v-model="session_timeout">
                        Session Time Out Control Enabled
                    </b-form-checkbox>
                    <div v-if="session_timeout==true" class="pl-5 pt-5">
                        <b-form-checkbox size="lg" v-model="lock_screen">
                            Show Lock Screen When Timed Out
                        </b-form-checkbox>
                        <label for="timeout"> Timeout Second. </label>
                        <b-form-input type="number" id="timeout" v-model="timeout"></b-form-input>
                        <label for="countdown" class="mt-10"> Countdown Modal Wait Time (Seconds) </label>
                        <b-form-input type="number" id="countdown" v-model="countdown"></b-form-input>
                    </div>
                </div>
                <div class="form-group">
                    <h5> Other Settings </h5>
                    <b-form-checkbox size="lg" v-model="email_confirm">
                        Email confirmation required for login.
                    </b-form-checkbox>
                </div>
                <div class="form-group">
                    <h5> Profile </h5>
                    <b-form-checkbox size="lg" v-model="profile_picture">
                        Allow users to use Gravatar profile picture
                    </b-form-checkbox>
                </div>
            </b-tab>
            <b-tab title="Security" class="mb-10">
                <div class="form-group mt-10">
                    <h5> Password complexity </h5>
                    <b-form-checkbox size="lg" v-model="default_setting">
                        Use default settings
                    </b-form-checkbox>
                    <b-form-checkbox size="lg" v-model="require_digit">
                        Require digit
                    </b-form-checkbox>
                    <b-form-checkbox size="lg" v-model="require_lowercase">
                        Require lowercase
                    </b-form-checkbox>
                    <b-form-checkbox size="lg" v-model="require_non_alphanumeric">
                        Require non-alphanumeric
                    </b-form-checkbox>
                    <b-form-checkbox size="lg" v-model="require_upppercase">
                        Require uppercase
                    </b-form-checkbox>
                    <label> Required length </label>
                    <b-form-input
                        v-model="require_length"
                        type="number"
                        v-if="default_setting==true"
                        disabled
                    ></b-form-input>
                    <b-form-input
                        v-model="require_length"
                        type="number"
                        v-if="default_setting==false"
                    ></b-form-input>
                </div>
                
                <div class="form-group mt-10">
                    <h5> User Lock Out </h5>
                    <b-form-checkbox size="lg" v-model="enable_lock">
                        Enable user accout locking on failed login attempts.
                    </b-form-checkbox>
                </div>
                <div class="form-group" v-if="enable_lock==true">
                    <label> Maximum number of failed login attempt count before lockig the account </label>
                    <b-form-input
                        v-model="maxlength_lock"
                        type="number"
                    ></b-form-input>
                </div>
                <div class="form-group" v-if="enable_lock==true">
                    <label> Account locking duration (as seconds) </label>
                    <b-form-input
                        v-model="lock_duration"
                        type="number"
                    ></b-form-input>
                </div>
                <div class="form-group">
                    <h5> Two Factor Login </h5>
                    <b-form-checkbox size="lg" v-model="enable_tow_factor" >
                        Enable two factor user login.
                    </b-form-checkbox>
                    <div v-if="enable_tow_factor==true">
                        <b-form-checkbox size="lg" v-model="enable_email_verification">
                            Enable email verification
                        </b-form-checkbox>
                        <b-form-checkbox size="lg" v-model="enable_sms_verification">
                            Enable SMS verification
                        </b-form-checkbox>
                        <b-form-checkbox size="lg" v-model="enable_google_authenticator">
                            Enable Google Authenticator
                        </b-form-checkbox>
                        <b-form-checkbox size="lg" v-model="allow_remember_browser">
                            Allow to remember browser. If you allow this, users can select to remember browser to skip 
                            second time two factor login for the same browser. 
                        </b-form-checkbox>
                    </div>

                </div>

                <div class="form-group mt-10">
                    <h5> Only one concurrent login per user </h5>
                    <b-form-checkbox size="lg" v-model="disable_concurrent_login">
                        Disable concurrent login for a user. If a user logins with a second device, the first session is automatically closed. 
                    </b-form-checkbox>
                </div>
            </b-tab>
            <b-tab title="Email(SMTP)" class="mb-10">
                <div class="form-group mt-10">
                    <label> Default from (sender) email address </label>
                    <b-form-input
                        v-model="default_sender_email"
                        type="email"
                    ></b-form-input>
                </div>
                <div class="form-group">
                    <label> Default from (sender) display name </label>
                    <b-form-input
                        v-model="default_sender_name"
                        type="text"
                    ></b-form-input>
                </div>
                <div class="form-group">
                    <label> SMTP host </label>
                    <b-form-input
                        v-model="smtp_host"
                        type="text"
                    ></b-form-input>
                </div>
                <div class="form-group">
                    <label> SMTP port </label>
                    <b-form-input
                        v-model="smtp_port"
                        type="number"
                    ></b-form-input>
                </div>
                <div class="form-group mt-10">
                    <b-form-checkbox size="lg" v-model="smtp_ssl">
                        Use SSL
                    </b-form-checkbox>
                    <b-form-checkbox size="lg" v-model="smtp_credentials">
                       Use default credentials
                    </b-form-checkbox>
                    <div v-if="smtp_credentials==false">
                        <div class="form-group">
                            <label> Domain name </label>
                            <b-form-input
                                v-model="smtp_domain_name"
                                type="text"
                            ></b-form-input>
                        </div>
                        <div class="form-group">
                            <label> User name </label>
                            <b-form-input
                                v-model="smtp_username"
                                type="text"
                            ></b-form-input>
                        </div>
                        <div class="form-group">
                            <label> Password </label>
                            <b-form-input
                                v-model="smtp_password"
                                type="text"
                            ></b-form-input>
                        </div>
                    </div>
                </div>
                <h5> Test Email Settings </h5>
                <div class="row">
                    <div class="col-md-4">                        
                        <b-form-input
                            v-model="test_email_setting"
                            type="email"
                        ></b-form-input>
                    </div>
                    <div class="col-md-8">
                        <button class="btn btn-primary blue">
                            Send Test Email
                        </button>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Invoice" class="mb-10">
                <div class="form-group mt-10">
                    <h5> Invoice information </h5>
                    <label> Legal Name </label>
                    <b-form-input
                        v-model="invoice_legal_name"
                        type="text"
                    ></b-form-input>
                </div>
                <div class="form-group">
                    <label> Address </label>
                    <b-form-textarea
                        v-model="invoice_address"
                        rows="5"
                        type="text"
                    ></b-form-textarea>
                </div>
                <div class="form-group">
                    <label> Tax/VatNo </label>
                    <b-form-input
                        v-model="invoice_tax"
                        type="text"
                    ></b-form-input>
                </div>
            </b-tab>
            <b-tab title="Other Settings" class="mb-10">
                <div class="form-group mt-10">
                    <h5> Is quick theme select enabled </h5>
                    <b-form-checkbox size="lg" v-model="enable_quich_theme">
                       Is quick theme select enabled
                    </b-form-checkbox>
                </div>
            </b-tab>
            <b-tab title="External Login Settings" class="mb-10">
            
            </b-tab>
        </b-tabs>
    </b-container>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

    export default {
        data() {
            return {
                //... user management settings
                allow_users: true,
                default_active: false,
                register_security_image: true,
                login_security_image: false,
                cookie_consent: false,
                session_timeout: false,
                lock_screen: false,
                timeout: 30,
                countdown: 30,
                email_confirm: false,
                profile_picture: false,
                //... security settings
                default_setting: true,
                require_digit: false,
                require_lowercase: false,
                require_non_alphanumeric: false,
                require_length: 3,
                enable_lock: true,
                maxlength_lock: 5,
                lock_duration: 300,
                enable_tow_factor: false,
                enable_email_verification: true,
                enable_sms_verification: true,
                enable_google_authenticator: false,
                allow_remember_browser: true,
                disable_concurrent_login: false,
                //... SMTP settings
                default_sender_email: "admin@mydomain.com",
                default_sender_name: "mydomain.com mailer",
                smtp_host: "127.0.0.1",
                smtp_port: 25,
                smtp_ssl: false,
                smtp_credentials: true,
                smtp_domain_name: "",
                smtp_username: "",
                smtp_password:"",
                test_email_setting: "admin@defaulttenant.com",
                //... invoice settings
                invoice_legal_name: "",
                invoice_address: "",
                invoice_tax: "",
                //... quick theme 
                enable_quich_theme: true
            }
        },

        mounted() {
            this.$store.dispatch(SET_BREADCRUMB, [{ title:"Settings", subtitle: "Show and change application settings." }]);
        },
        methods: {
        
        }
    }
</script>