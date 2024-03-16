<template>
    <div class="container">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png" class='image' />
        <cdx-field>
            <cdx-search-input v-model="params.gsrsearch" @keyup.enter="searchWiki" placeholder="Enter your article of interest" />
        </cdx-field>
        <div class="sub-container">
            <span> Maximum number of articles to be retrieved: </span>
            <cdx-combobox v-model:selected="params.gsrlimit" :menu-items="menuItems" placeholder="Select number of articles" class="query-box" @change="fetchDataFromWikipedia">
            </cdx-combobox>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </div>
    <div class="main">
        <div v-if="data">
            <div class="accordion-container">
                <cdx-accordion v-for="d in data" :key="d.id">
                    <template #title>
                        <span class="title-data">{{ d.title }}</span>
                        <a class="link-button" :href="`https://en.m.wikipedia.org/wiki/${encodeURIComponent(d.title)}`" target="_blank">Link</a>
                    </template>
                    <div class="info">
                        {{ d.extract }}
                    </div>
                </cdx-accordion>
            </div>
        </div>
        <div v-else-if="loading" class="loader">
            <PulseLoader color="#5DADE2" size="15px" :loading="true" />
        </div>
        <div class="arrow" v-if="data" @click="scrollToTop">
            <span class='arrow-icon'>&#8593;</span>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted, onUnmounted } from 'vue';
import { CdxSearchInput, CdxField, CdxAccordion, CdxCombobox } from '@wikimedia/codex';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const visible = ref(false);

const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1300) {
        visible.value = true;
    } else if (scrolled <= 1300) {
        visible.value = false;
    }
};

onMounted(() => {
    window.addEventListener('scroll', toggleVisible);
});

onUnmounted(() => {
    window.removeEventListener('scroll', toggleVisible);
});

const url = "https://en.wikipedia.org/w/api.php";
const data = ref();
const loading = ref(false);

const params = reactive({
    origin: "*",
    format: "json",
    action: "query",
    prop: "extracts",
    exchars: 1000,
    exintro: true,
    explaintext: true,
    generator: "search",
    gsrsearch: "",
    gsrlimit: 20
});

const menuItems = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 }
];

async function fetchDataFromWikipedia() {
    loading.value = true;

    try {
        const response = await axios.get(url, { params });
        console.log('response')
        console.log(response.data.query.pages)
        data.value = Object.values(response.data.query.pages);
    } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
        throw error;
    } finally {
        loading.value = false;
    }
}

function searchWiki() {
    console.log('Search initiated with query:', params.gsrsearch);
    fetchDataFromWikipedia()
        .catch(error => {
            console.error('Error searching Wikipedia:', error);
        });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

watch(() => params.gsrlimit, () => {
    loading.value = true;
    fetchDataFromWikipedia();
});

</script>

<style scoped>
@import '/src/assets/css/Search.css';
</style>
