<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

interface Field {
  id: number;
  value: string;
  vowelCount: number;
  highlighted: boolean;
}

export default defineComponent({
  name: 'DynamicForm',
  setup() {
    const state = reactive({
      fields: [
        {
          id: 1,
          value: '',
          vowelCount: 0,
          highlighted: false,
        },
      ] as Field[],
      nextId: 2,
      searchQuery: '',
      isSearchQueryHighlighted: false,
    });

    const addField = () => {
      if (state.fields.length < 10) {
        state.fields.push({
          id: (state.nextId += 1),
          value: '',
          vowelCount: 0,
          highlighted: false,
        });
      }
    };

    const removeField = (index: number) => {
      if (state.fields.length > 1) {
        state.fields.splice(index, 1);
      }
    };

    const handleSearch = () => {
      let field = null;

      if (state.searchQuery) {
        // state.isSearchQueryHighlighted = false;
        state.fields.forEach((el) => {
          field = el;
          field.highlighted = el.value.includes(state.searchQuery);
          if (field.highlighted) {
            state.isSearchQueryHighlighted = true;
          }
        });
      } else if (!state.searchQuery) {
        state.isSearchQueryHighlighted = false;
        state.fields.forEach((el) => {
          field = el;
          field.highlighted = false;
        });
      }
    };

    const countVowels = (index: number) => {
      const { value } = state.fields[index];
      const vowelCount = (value.match(/[aeiou]/gi) || []).length;
      state.fields[index].vowelCount = vowelCount;
      handleSearch();
    };

    return {
      ...toRefs(state),
      addField,
      removeField,
      countVowels,
      handleSearch,
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
