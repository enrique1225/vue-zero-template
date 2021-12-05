<template>
    <div data-scroll="true"  class="notification margin-t-10 margin-b-10 scroll" 
        style="overflow: hidden;">
        <a class="notification__item user-notification-item-clickable ng-star-inserted">
            <div class="notification__item-icon">
                <i class="flaticon-list"></i>
            </div>
            <div class="notification__item-details">
                <div class="notification__item-title kt-font-bold" @click="$bvModal.show('modal-scoped03')">
                    Login attempts
                </div>

                <b-modal id="modal-scoped03" hide-footer size="lg">
                    <template v-slot:modal-header="{ close }">
                        <h5> Login attempts </h5>
                        <button type="button" class="close" aria-label="Close" @click="close()">
                            <p aria-hidden="true">×</p>
                        </button>
                    </template>  
                    <template v-slot:default="{ hide }">
                        <div class="green_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 18 hours ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="green_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 18 hours ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="red_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 1 day ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="red_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 1 day ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="red_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 1 day ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="green_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 1 day ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="green_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 3 days ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="green_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 221.218.86.70 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 3 days ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="green_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 5 days ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
                        <div class="green_attempts">
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> IP address </label>
                                <div class="col-sm-9">
                                    <p> 50.7.159.34 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Browser </label>
                                <div class="col-sm-9">
                                    <p> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                                     Chrome/83.0.4103.116 Safari/537.36 </p>
                                </div>
                            </div>
                            <div class="row attempt">
                                <label class="col-sm-3 text-right"> Time </label>
                                <div class="col-sm-9">
                                    <p> 5 days ago (2020-07-14 05:42:42) </p>
                                </div>
                            </div>
                        </div>
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

        };
    },
    methods: {

    },
};
</script>
