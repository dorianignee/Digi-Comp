<script lang="ts">
  let { tBox = $bindable(), fBox = $bindable(), cBox = $bindable() } = $props();
</script>

<td class="logic-cell">
  <input type="checkbox" bind:checked={tBox} />
</td>
<td class="logic-cell mid">
  <input type="checkbox" bind:checked={fBox} />
</td>
<td class="logic-cell">
  <input type="checkbox" bind:checked={cBox} />
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