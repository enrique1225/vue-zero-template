<template>
  <div>
    <div
      class="d-flex flex-column pt-12 pb-12 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h4 class="d-flex flex-center rounded-top">
        <span
          class="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2"
        >
          0 New notifications 
        </span>
      </h4>
    </div>
      <div class="row m-4">
        <div class="text-left col-md-8"></div>
        <div class="text-right col-md-4">
          <a href="javascript:;" class="text-right">Settings</a>
        </div>
      </div><hr>
      <div data-scroll="true" data-height="300" data-mobile-height="200" class="notification margin-t-10 margin-b-10 scroll" 
        style="height: 300px; overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
          <div class="notification__item-icon">
            <i class="fa-info-circle fas font-info"></i>
          </div>
          <div class="notification__item-details">
            <div class="notification__item-title"> Your data is prepared, click here to download. </div>
            <div class="notification__item-time"> 10 days ago
            </div>
          </div>
        </a>
      </div><hr class="ng-star-inserted">
      <div class="m-4 ng-star-inserted">
        <div class="text-center">
          <a routerlink="notifications" ng-reflect-router-link="notifications" href="/app/notifications">See all notifications</a>
        </div>
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
  // .notification .notification__item:after {
  //   border: 0;
  //   content: ">";
  //   font-size: .8rem;
  //   line-height: 0;
  //   color: #74788d;
  // }
  .notification__item-title:hover{
    color: #5867dd;
  }
  .notification__item-icon .font-info{
    color: #5578eb;
    font-size: 1.4rem;
  }
</style>

<script>
export default {
  name: "KTDropdownNotification",
  data() {
    return {

    };
  },
  methods: {
    
  },
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    }
  }
};
</script>
