<script lang="ts">
  import type { LogicCellType } from "$lib/ts/digiComp";

  let { cell = $bindable() }: {cell: LogicCellType} = $props();
</script>

<td class="logic-cell">
  <input type="checkbox" bind:checked={cell.t} />
</td>
<td class="logic-cell mid">
  <input type="checkbox" bind:checked={cell.f} />
</td>
<td class="logic-cell">
  <input type="checkbox" bind:checked={cell.c} />
</td>

<style>
  td.logic-cell {
    border-top: 1px solid black;
  }

  .mid {
    border-left: 1px solid black;
    border-right: 2px solid black;
  }
</style>