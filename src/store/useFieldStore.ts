import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Field {
  id: number;
  value: string;
  vowelCount: number;
  highlighted: boolean;
}

export const useFieldStore = defineStore('form', () => {
  const fields = ref<Field[]>([
    {
      id: 1, value: '', vowelCount: 0, highlighted: false,
    },
    {
      id: 2, value: '', vowelCount: 0, highlighted: false,
    },
    {
      id: 3, value: '', vowelCount: 0, highlighted: false,
    },
  ]);

  let nextId = 4; // Starting from 4 as IDs 1, 2, and 3 are already used
  const searchQuery = ref('');
  const isSearchQueryHighlighted = ref(false);

  const addField = () => {
    if (fields.value.length < 10) {
      fields.value.push({
        id: nextId += 1,
        value: '',
        vowelCount: 0,
        highlighted: false,
      });
    }
  };

  const removeField = (index: number) => {
    if (fields.value.length > 1) {
      fields.value.splice(index, 1);
    }
  };

  const handleSearch = () => {
    if (searchQuery.value) {
      isSearchQueryHighlighted.value = false;
      fields.value.forEach((el) => {
        const field = el;
        field.highlighted = field.value.includes(searchQuery.value);
        if (field.highlighted) {
          isSearchQueryHighlighted.value = true;
        }
      });
    } else {
      isSearchQueryHighlighted.value = false;
      fields.value.forEach((el) => {
        const field = el;
        field.highlighted = false;
      });
    }
  };

  const countVowels = (index: number) => {
    const { value } = fields.value[index];
    const vowelCount = (value.match(/[aeiou]/gi) || []).length;
    fields.value[index].vowelCount = vowelCount;
    handleSearch();
  };

  return {
    fields,
    searchQuery,
    isSearchQueryHighlighted,
    addField,
    removeField,
    countVowels,
    handleSearch,
  };
});
