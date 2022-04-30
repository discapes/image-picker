
<!-- svelte-ignore a11y-missing-attribute -->
<script>
    import { url } from "./util.js";
    import { flip } from "svelte/animate";
    import { fade, scale } from "svelte/transition";
    export let images;
</script>

<div class="flex justify-center h-[300px]">
    {#each images as image, i (image)}
        <img 
            animate:flip 
            transition:fade
            class:current={i === 2} 
            class="self-center m-4 w-[100px]" 
            src={url("get", { filename: image })} />
    {/each}
</div>

<style>
    .current {
        width: 150px;
        box-sizing: content-box;
        border-width: 3px;
    }
</style>
