<template>
    <div data-scroll="true" class="notification margin-t-10 margin-b-10 scroll" 
        style="overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
            <div class="notification__item-icon">
                <i class="flaticon-download"></i>
            </div>
            <div class="notification__item-details">
                <div class="notification__item-title kt-font-bold" v-b-modal.modal-center> Download collected data </div>
                <b-modal id="modal-center" centered hide-footer hide-header>
                    <div class="text-center mt-10 mb-10">
                        <h3 class="my-4">We are preparing your data. You will be notified when your data is ready.</h3>
                        <b-button class="download_btn mt-10" @click="hideDownloadModal"> OK </b-button>
                    </div>
                </b-modal>
            </div>
        </a>
    </div>
</template>
<style>
    .notification__item-title:focus{
        outline: none;
    }
</style>
<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            hideDownloadModal() {
                this.$root.$emit('bv::hide::modal', 'modal-center', '#btnShow')
            },
        }
    }
</script>