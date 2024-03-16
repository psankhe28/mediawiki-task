<script setup>
import router from '@/router/router';

function home()
{
    router.push("/");
}
function about()
{
    router.push("/about");
}

</script>

<template>
    <div>
        <header class="header">
            <nav class="navbar">
                <a class="title" target="_blank" href="https://phabricator.wikimedia.org/T357337">WikiFind</a>
                <div class="nav-links-div">
                    <ul class="nav-links">
                        <li><a @click="home()">Home</a></li>
                        <li><a @click="about()">About</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<style scoped>
@import '/src/assets/css/Navbar.css';
</style>