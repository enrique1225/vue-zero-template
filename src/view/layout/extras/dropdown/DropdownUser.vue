<template>
  <div>
    <div
      class="d-flex flex-column pt-3 pb-9 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
        <div class="d-flex align-items-center mt-5 pl-10">
            <div class="mr-5">
                <img class="symbol-label" :src="user" />
                <i class="symbol-badge bg-success"></i>
            </div>
            <div class="d-flex flex-column">
                <strong class="user_card_name"> admin </strong>
            </div>
        </div>
    </div>
    <ManageLinkedAccounts></ManageLinkedAccounts>
    <ManageAuthorityDelegations></ManageAuthorityDelegations>
    <ChangePassword></ChangePassword>
    <LoginAttempts></LoginAttempts>
    <ChangePicture></ChangePicture>
    <MySettings></MySettings>
    <Download></Download>
    
    <div data-scroll="true" class="notification margin-t-10 margin-b-10 py-5 px-5 scroll" 
        style="overflow: hidden;">
        <button class="btn btn-light-primary kt-font-bold" @click="onLogout">
            Logout
        </button>
    </div>

  </div>
</template>

<style lang="scss">
    .notification .notification__item {
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 1.1rem 1.5rem;
        border-bottom: 1px solid #f7f8fa;
        -webkit-transition: background-color .3s ease;
        transition: background-color .3s ease;
    }
    .notification .notification__item .notification__item-icon {
        display: flex;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 2.5rem;
        flex: 0 0 2.5rem;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .notification__item-title:hover{
        color: #5867dd;        
    }
    .notification__item:hover{
        cursor: pointer;
    }
    .notification__item-icon i{
        color: #5578eb;
        font-size: 1.4rem;
    }
    .symbol-label{
        width: 60px;
    }
    .user_card_name{
        font-size: 1.3rem;
        font-weight: 500;
        color: #fff;
    }
    .notification .btn-light-primary{
        color: black;
    }
    .download_btn{
        border: 0;
        border-radius: 0.25em;
        background: initial;
        background-color: #3085d6!important;
        color: #fff!important;
        font-size: 1.0625em;
        padding: .625em 2em;
    }
</style>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import ManageLinkedAccounts from '@/view/layout/extras/dropdown/userpanel/ManageLinkedAccounts.vue';
import ManageAuthorityDelegations from '@/view/layout/extras/dropdown/userpanel/ManageAuthorityDelegations.vue';
import ChangePassword from '@/view/layout/extras/dropdown/userpanel/ChangePassword.vue';
import LoginAttempts from '@/view/layout/extras/dropdown/userpanel/LoginAttempts.vue';
import ChangePicture from '@/view/layout/extras/dropdown/userpanel/ChangePicture.vue';
import MySettings from '@/view/layout/extras/dropdown/userpanel/MySettings.vue';
import Download from '@/view/layout/extras/dropdown/userpanel/Download.vue';
export default {
    name: "KTDropdownNotification",
    data() {
        return {
        };
    },
    methods: {
        onLogout() {
            this.$store
            .dispatch(LOGOUT)
            .then(() => this.$router.push({ name: "login" }));
        },
    },
    components: {
        ManageLinkedAccounts,
        ManageAuthorityDelegations,
        ChangePassword,
        LoginAttempts,
        ChangePicture,
        MySettings,
        Download
    },
    computed: {
        backgroundImage() {
        return process.env.BASE_URL + "media/misc/bg-1.jpg";
        },
        user() {
        return process.env.BASE_URL + "media/users/default-profile-picture.png";
        }
    }
};
</script>
