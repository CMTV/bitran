<script setup lang="ts">
import { Pane as UiPane } from '@app/store/ui';
import Pane from './Pane.vue';
import MenuStatic from './menu/MenuStatic.vue';
import Search from './menu/Search.vue';
import SearchResults from './menu/SearchResults.vue';
import { ref } from 'vue';
import { SearchItem, search } from '@app/script/search';
import { SearchState } from '@app/script/search';

const searchState = ref<SearchState>(SearchState.Empty);
const searchResults = ref<SearchItem[]>([]);

function searchQueryChange(query: string)
{
    if (!query)
    {
        searchState.value = SearchState.Empty;
        searchResults.value = [];
        searchResultsVisible.value = false;
        return;
    }

    searchResults.value = search(query);
    searchState.value = searchResults.value.length > 0 ? SearchState.ContentFound : SearchState.ContentNotFound;
    searchResultsVisible.value = true;
}

const searchResultsVisible = ref<boolean>(false);
</script>

<template>
    <Pane :pane="UiPane.Menu" class="mobile:w-[200px] max-mobile:flex-1 bg-neutral-200 dark:bg-neutral-800 flex flex-col text-[var(--textShade1)]">
        <Search :state="searchState" @change="searchQueryChange" @click="searchResultsVisible = searchResultsVisible || searchResults.length > 0" />
        <SearchResults :results="searchResults" @resultClick="searchResultsVisible = false" :class="{ 'hidden': !searchResultsVisible }" />
        <MenuStatic :class="{ 'hidden': searchResultsVisible }" />
    </Pane>
</template>