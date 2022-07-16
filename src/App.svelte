<script>
	import { url } from "./util.js";
	import Preview from "./Preview.svelte";

	let pics;
	let index = 0;
	let pic;
	let preview;
	let zoom = 90;

	pics = ["cit2.png", "cit3.png", "cities.png", "sea.jpg", "wallpaper.jpg"];

	$: {
		if (pics) {
			index = index % pics.length;
			pic = pics.at(index);

			preview = [];
			for (let i = index - 2; i <= index + 2; i++) preview.push(pics.at(i % pics.length));
			preview.length = Math.min(pics.length, 5);
		}
	}

	async function move(olddir, newdir) {
		let filename = pics.splice(index, 1);
		pics = pics;
		message("move " + filename + " from " + olddir + "/ to " + newdir + "/", 3);
	}
	function handleKd(e) {
		switch (e.key) {
			case "ArrowLeft":
				return index--;
			case "ArrowRight":
				return index++;
			case "ArrowUp":
				return move("pics", "delete");
			case "ArrowDown":
				return move("pics", "keep");
			case "+":
				return zoom++;
			case "-":
				return zoom--;
		}
	}
	function message(text, duration) {
		let div = document.createElement("div");
		div.innerText = text;
		div.style.position = "fixed";
		div.style.left = "200px";
		div.style.top = "200px";
		div.style.padding = "10px";
		div.style.background = "white"
		div.style.textAlign = "center";
		div.style.animation = `fade-out ${duration}s`;
		document.body.appendChild(div);
		setTimeout(() => div.remove(), duration * 1000);
	}
</script>

<svelte:window on:keydown={handleKd} />
{#if pic}
	<div class="flex h-full items-center justify-around">
		<div class="flex flex-col items-center justify-center px-10">
			<Preview images={preview} />
			<div class="text-center text-2xl m-3">{pic}</div>
			<div>
				<button class="buttonfx textcontainer w-14 h-14" on:click={() => zoom++}>+</button>
				<button class="buttonfx textcontainer w-14 h-14" on:click={() => zoom--}>-</button>
			</div>
		</div>
		<div class="grid">
			<button class="buttonfx textcontainer col-span-3" on:click={() => move("pics", "delete")}>Trash</button>

			<button on:click={() => index--} class="buttonfx textcontainer col-span-1">Left</button>
			<img style={`height:${zoom * 0.8}vh;`} class="object-cover w-full col-span-1" src={url("get", { filename: pic })} />
			<!-- TODO MAKE IMAGE UPDATE -->
			<button class="buttonfx textcontainer col-span-1" on:click={() => index++}>Right</button>

			<button class="buttonfx textcontainer col-span-3" on:click={() => move("pics", "keep")}>Keep</button>
		</div>
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
