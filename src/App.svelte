<script>
	import { onMount } from "svelte";
	const SERVER = "http://127.0.0.1:3000";

	let pics;
	let index = 0;
	let pic;

	fetch(url("pics"))
		.then((res) => res.json())
		.then((json) => (pics = json))
		.catch((e) => console.log(e));

	$: {
		if (pics) {
			index = Math.max(0, Math.min(index, pics.length - 1));
			pic = pics[index];
		}
	}

	async function move(dir) {
		let pic = pics.splice(index, 1);
		pics = pics;
		await fetch(
			url("move", {
				olddir: "pics",
				newdir: dir,
				filename: pic,
			})
		);
	}
	function handleKd(e) {
		switch (e.key) {
			case "ArrowLeft":
				return index--;
			case "ArrowRight":
				return index++;
			case "ArrowUp":
				return move("delete");
			case "ArrowDown":
				return move("keep");
		}
	}
	function url(path, params = {}) {
		return SERVER + "/" + path + "?" + new URLSearchParams(params).toString();
	}
</script>

<svelte:window on:keydown={handleKd} />
{#if pic}
	<div class="inline-grid">
		<button class="buttonfx textcontainer col-span-3" on:click={() => move("delete")}>Trash</button>

		<button on:click={() => index--} class="buttonfx textcontainer col-span-1">Left</button>
		<img class="h-[800px] col-span-1" src={url("get", { filename: pic })} />
		<!-- TODO MAKE IMAGE UPDATE -->
		<button class="buttonfx textcontainer col-span-1" on:click={() => index++}>Right</button>

		<button class="buttonfx textcontainer col-span-3" on:click={() => move("keep")}>Keep</button>
	</div>
	<div>
		{pic}
	</div>
{:else}
	Searching for pictures...
{/if}

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.textcontainer {
		@apply border p-2 text-center /* rounded */;
	}
	.buttonfx {
		@apply mouse:hover:bg-white/20 touch:active:bg-white/20;
	}
	body {
		background-image: url("../bg.png");
	}
	* {
		border-color: black;
	}
</style>
