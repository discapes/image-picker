<script>
	let index = 0;
	let SERVER = "http://127.0.0.1:3000";
	function handleKd(e) {
		switch (e.key) {
			case "ArrowLeft":
				index--;
				break;
			case "ArrowRight":
				index++;
				break;
		}
	}
</script>

<svelte:window on:keydown={handleKd} />
<div class="inline-grid">
	<button class="buttonfx textcontainer col-span-3" on:click={() => index--}>trash</button>
	<button class="buttonfx textcontainer col-span-1" on:click={() => index--}>left</button>
	<img class="h-[800px] col-span-1" src={SERVER + "/" + index} />
	<button class="buttonfx textcontainer col-span-1" on:click={() => index++}>right</button>
</div>

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


	h1 {
		@apply uppercase text-6xl font-thin;
	}
	h2 {
		@apply uppercase text-3xl mb-3 font-thin;
	}
	p {
		font-size: 16px;
		padding: 10px 20px;
		line-height: 1.65;
	}
	ol,
	ul {
		margin: 16px 0;
		padding: 0 0 0 40px;
	}
	li {
		list-style: none outside disc;
	}
	img,
	svg,
	video,
	canvas,
	audio,
	iframe,
	embed,
	object {
		display: inline-block;
	}
	body {
		background-image: url("../bg.png");
	}
	* {
		border-color: black;
	}
</style>
