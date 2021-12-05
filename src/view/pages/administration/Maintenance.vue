<template>
    <b-container fluid class="ideas_body">
        <b-tabs>
          <b-tab title="Caches" class="mb-10">
            <div class="row mt-10">
              <div class="col-xl-6">
                <p> You can clear caches in application on this page. </p>
              </div>
              <div class="col-xl-6 text-right">
                <button type="button" class="btn btn-primary blue pull-right"> 
                  <i class="fa fa-recycle ng-tns-c333-14"></i> Clear all </button>
              </div>
            </div>
            <div class="form-group mt-3">
                <table class="table table-bordered cache-table">
                  <tbody>
                    <tr v-for="item in caches" :key="item">
                      <td class="pb-3" v-bind:key="item.id"> {{item}} 
                        <button type="button" class="btn btn-primary blue pull-right"> Clear </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </b-tab>
          <b-tab title="Website Logs" class="mb-10">

          </b-tab>
        </b-tabs>
    </b-container>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

    export default {
        data() {
            return {
              caches:['AbpZeroTenantFeatures','AspNet.Identity.SecurityStamp','AbpTenantSettingsCache','AppUserFriendCache',
              'AbpZeroTenantCache','AbpUserSettingsCache','AbpZeroMultiTenantLocalizationDictionaryCache','AbpZeroDynamicParameterCache',
              'AbpZeroTenantByNameCache','AbpZeroLanguages','AbpZeroEditionFeatures','AbpZeroRolePermissions','AbpApplicationSettingsCache',
              'AppExternalLoginInfoProvidersCache','AbpZeroUserPermissions','AbpZeroEntityDynamicParameterCache',
              'token_validity_key','TempFileCacheName']
            }
        },

        mounted() {
            this.$store.dispatch(SET_BREADCRUMB, [{ title:"Maintenance" }]);
        },
        methods: {
        
        }
    }
</script>
<style>
.cache-table tr td{
  padding-top: 10px;
}
</style>