<script lang="ts">
  import type { LogicRodType } from '$lib/ts/digiComp';
  import LogicCell from './LogicCell.svelte';
  let { isTriggering, columnSettings, index }: {isTriggering: boolean, columnSettings: LogicRodType, index: number} = $props();
</script>

<div>
  <span class="rod-label">{index}</span>
  <button 
    aria-label="Clear rod" 
    onclick={() => columnSettings = columnSettings.map(() => ({ f: false, t: false, c: false }))}
    style="width: 100%; margin-bottom: 0.5rem;"
  >
    <span class="tabler--trash"></span>
  </button>

  <table>
    <thead>
      <tr>
        <th class="logic-header">T</th>
        <th class="logic-header mid">F</th>
        <th class="logic-header">C</th>
      </tr>
    </thead>
    <tbody>
      {#each columnSettings as _, index}
      <tr>
        <LogicCell bind:cell = {columnSettings[index]} />
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  span {
    margin-top: 0.5rem;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
  }

  tr {
    height: 1.5rem;
  }

  .rod-label {
    display: block;
    text-align: center;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .mid {
    border-left: 1px solid black;
    border-right: 2px solid black;
  }
</style>