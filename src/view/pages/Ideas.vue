<template>
  <b-container fluid class="ideas_body">
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="12" sm="12" class="my-1">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Search..."
            ></b-form-input>
            <b-input-group-append>
              <button type="submit" class="btn btn-primary"><i class="flaticon-search-1"></i></button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="ideas"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
      class="table-bordered"
    >
      <template v-slot:cell(actions)="row">
        <b-dropdown text="Actions" offset="50" variant="primary" class="m-2">
          <b-dropdown-item size="sm" @click="view(row.item, row.index, $event.target)">
            View
          </b-dropdown-item>
          <b-dropdown-item size="sm" @click="edit(row.item, row.index, $event.target)"> Edit </b-dropdown-item>
          <b-dropdown-item href="#"> Delete </b-dropdown-item>
        </b-dropdown>
      </template>

      <template v-slot:cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col >
        <b-form-group>
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal size="lg" :id="viewModal.id" :title="viewModal.title" ok-only @hide="resetViewModal">
      <pre>{{ viewModal.content }}</pre>
    </b-modal>
    <b-modal size="lg" :id="editModal.id" :title="editModal.title"  @ok="editOk">
      <form ref="form" @submit.stop.prevent="editSubmit">
        <b-form-group
          :state="descriptionState"
          label="Description"
          label-for="description-input"
        >
          <b-form-input
            id="description-input"
            v-model="editModal.content.description"
            :state="descriptionState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="keywordsState"
          label="Keywords"
          label-for="keywords-input"
        >
          <b-form-input
            id="keywords-input"
            v-model="editModal.content.keywords"
            :state="keywordsState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="goalsState"
          label="Goals"
          label-for="goals-input"
        >
          <b-form-input
            id="goals-input"
            v-model="editModal.content.goals"
            :state="goalsState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="referenceState"
          label="Reference"
          label-for="reference-input"
        >
          <b-form-input
            id="reference-input"
            v-model="editModal.content.reference"
            :state="referenceState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="priorityState"
          label="Priority"
          label-for="priority-input"
        >
          <b-form-input
            id="priority-input"
            v-model="editModal.content.priority"
            :state="priorityState"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

  export default {
    data() {
      return {
        ideas: [
          { 
            description: "Most popular sports", 
            keywords: "sports,football", 
            goals: "worldcup", 
            reference: "sports", 
            priority: "1" 
          },
          { 
            description: "Most popular game", 
            keywords: "game,DOTA", 
            goals: "Esports", 
            reference: "esports", 
            priority: "1" 
          }
        ],
        fields: [
          { key: 'actions', label: 'Actions' },
          { key: 'description', label: 'Description', sortable: true, sortDirection: 'desc' },
          { key: 'keywords', label: 'Keywords', sortable: true, sortDirection: 'desc' },
          { key: 'goals', label: 'Goals', sortable: true, sortDirection: 'desc' },
          { key: 'reference', label: 'Reference', sortable: true, sortDirection: 'desc' },
          { key: 'priority', label: 'Priority', sortable: true, sortDirection: 'desc' }       
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 25, 50, 100, 250, 500],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        viewModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        editModal: {
          id: 'editModal',
          title: '',
          content: ''
        },
        description: '',
        descriptionState: null,
        keywords: '',
        keywordsState: null,
        goals: '',
        goalsState: null,
        reference: '',
        referenceState: null,
        priority: '',
        priorityState: null,
        editIdeas: []
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      this.totalRows = this.ideas.length;
      this.$store.dispatch(SET_BREADCRUMB, [{ title:"Ideas", subtitle: "Ideas header info" }]);
    },
    methods: {
      view(item, index, button) {
        this.viewModal.title = "Details"
        this.viewModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.viewModal.id, button)
      },
      resetViewModal() {
        this.viewModal.content = ''
        this.viewModal.content = ''
      },
      edit(item, index, button) {
        this.editModal.title = "Edit Idea"
        this.editModal.content = JSON.parse(JSON.stringify(item, null, 2))
        this.$root.$emit('bv::show::modal', this.editModal.id, button)
      },
      // resetEditModal() {
      //   this.editModal.content = ''
      //   this.editModal.content = ''
      // },
      editOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.editSubmit()
      },
      editSubmit() {
        var editRow = {
          description: this.editModal.content.description,
          keywords: this.editModal.content.keywords,
          goals: this.editModal.content.goals,
          reference: this.editModal.content.reference,
          priority: this.editModal.content.priority
        }
        this.editModal.content.push(editRow);
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('editModal')
        })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>