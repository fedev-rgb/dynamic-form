<script>
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useFieldStore } from '../store/useFieldStore.ts';

export default defineComponent({
  name: 'DynamicForm',
  setup() {
    const fieldStore = useFieldStore();

    const {
      fields, searchQuery, isSearchQueryHighlighted,
    } = storeToRefs(fieldStore);
    const {
      addField, removeField, handleSearch, countVowels,
    } = fieldStore;

    return {
      fields,
      searchQuery,
      isSearchQueryHighlighted,
      addField,
      removeField,
      handleSearch,
      countVowels,
    };
  },
});
</script>

<template>
  <div class="container">
    <van-cell-group inset>
      <van-search
        v-model="searchQuery"
        id="search"
        type="text"
        placeholder="Search..."
        @input="handleSearch"
        :class="{ highlighted: isSearchQueryHighlighted }"
      />
    </van-cell-group>
    <div v-for="(field, index) in fields" :key="field.id" class="field__container">
      <van-cell-group inset>
        <transition-group name="van-slide-right">
          <van-field
            v-model="field.value"
            :id="'field-' + field.id"
            type="text"
            @input="countVowels(index)"
            :class="{ highlighted: field.highlighted }"
            placeholder="Type your text..."
            border
          >
            <template #button>
              <div class="d-flex">
                <span>Vowels: {{ field.vowelCount }}</span>
                <van-button
                  data-test="remove-field-button"
                  class="button__remove"
                  icon="cross"
                  size="mini"
                  type="danger"
                  round
                  plain
                  @click="removeField(index)"
                  v-if="fields.length > 1"
                ></van-button>
              </div>
            </template>
          </van-field>
        </transition-group>
      </van-cell-group>
    </div>
    <van-button
      data-test="add-field-button"
      class="mt-1"
      icon="plus"
      type="success"
      size="small"
      round
      @click="addField"
      :disabled="fields.length >= 10"
      >Add Field</van-button
    >
  </div>
</template>
