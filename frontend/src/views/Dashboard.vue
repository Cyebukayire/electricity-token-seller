<template>
    <div>
        <h1>{{title}}</h1>
        <h2>Congratulations! You've bought a token</h2>
        <div class="info">
            <p>Token: {{token}}</p>
            <p>Days remaining: {{days}}</p>
        </div>
        </div>
</template>

<script>
export default {
    name: 'Dashboard',
    props: {
        title: String,
        token: String,
        days: Number
    }
}
</script>

<style scoped>
.info {
    position: absolute;
    top: 30%;
    left: 30%;

}
p {
    font-size: 16px;

}
</style>