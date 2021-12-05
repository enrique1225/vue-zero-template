<template>
  <div class="topbar-item">
    <div
      class="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
      id="kt_quick_user_toggle"
    >
    <div class="ng-star-inserted" style="">
      <i class="flaticon-chat-2"></i>
    </div>
  </div>

  <div
    id="kt_quick_user"
    ref="kt_quick_user"
    class="offcanvas offcanvas-right p-10"
  >
    <!--begin::Header-->
    <div class="pb-5 text-right">
      <a
        href="#"
        class="btn btn-xs btn-icon btn-light btn-hover-primary"
        id="kt_quick_user_close"
      >
        <i class="ki ki-close icon-xs text-muted"></i>
      </a>
    </div>

    <perfect-scrollbar
      class="offcanvas-content pr-5 mr-n5 scroll"
      style="max-height: 90vh; position: relative;"
    >
      <input type="text" id="ChatUserSearchUserName" class="form-control input-sm" placeholder="Filter/Add user">
      <p class="mt-10"> You don't have any friends. Write a username to above nput box and click "Add Friend" button.</p>

      <h3 class="mt-15"> Blocked Users </h3>
      <p> You don't have any blocked users. In ofrder to friend select a friend, select a friend and select block from actions dropdown.</p>

    </perfect-scrollbar>
    <!--end::Content-->
  </div>
</div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  name: "KTQuickUser",
  data() {
    return {
      list: [
        {
          title: "Another purpose persuade",
          desc: "Due in 2 Days",
          alt: "+28%",
          svg: "media/svg/icons/Home/Library.svg",
          type: "warning"
        },
        {
          title: "Would be to people",
          desc: "Due in 2 Days",
          alt: "+50%",
          svg: "media/svg/icons/Communication/Write.svg",
          type: "success"
        },
        {
          title: "Purpose would be to persuade",
          desc: "Due in 2 Days",
          alt: "-27%",
          svg: "media/svg/icons/Communication/Group-chat.svg",
          type: "danger"
        },
        {
          title: "The best product",
          desc: "Due in 2 Days",
          alt: "+8%",
          svg: "media/svg/icons/General/Attachment2.svg",
          type: "info"
        }
      ]
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    }
  },
  computed: {
    picture() {
      return process.env.BASE_URL + "media/users/default-profile-picture.png";
    }
  }
};
</script>
