<script lang="ts">
  import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing'
  import type { FlipFlopType } from '$lib/ts/digiComp';
  import type { MouseEventHandler } from 'svelte/elements';

  let { value, onclick }: {value: FlipFlopType, onclick: MouseEventHandler<HTMLButtonElement> | null | undefined} = $props();
	let zeroLeft = $state('0');
	let oneLeft = $state('-100%');
</script>

<div 
	class="flip-flop flex-row" 
>
	{#if value === 0}
    <button 
      transition:fly={{ 
				x: -20, 
				duration: 200, 
				opacity: 100, 
				easing: linear 
				
			}}
      {onclick}
			style:left={zeroLeft}
			onintroend={() => zeroLeft = '0'}
			onoutrostart={() => zeroLeft = '-100%'}
    >0</button>
	{:else}
		<button 
      transition:fly={{ 
				x: 20, 
				duration: 200, 
				opacity: 100, 
				easing: linear 
			}}
      {onclick}
			style:left={oneLeft}
			onintroend={() => oneLeft = '0'}
			onoutrostart={() => oneLeft = '-100%'}
    >1</button>
	{/if}
</div>

<style>
  .flip-flop {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid black;
    background-color: white;
    box-sizing: border-box;
		overflow: hidden;
  }

	.flex-row {
		display: flex;
		flex-direction: row;
	}

  button {
    position: relative;
    height: 1.5rem;
    width: 1.5rem;
    text-align: center;
    font-size: 1.2rem;
		color: black;
    border: none;
    background: none;
  }
</style>