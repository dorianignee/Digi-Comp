<script lang="ts">
  import type { OrGateValueType } from "$lib/ts/digiComp";
  let { selection = $bindable() }: { selection: OrGateValueType } = $props();
</script>

<select bind:value={selection} style="width: 100%;">
  <option value="none" selected={selection === 'none'}>None</option>
  <option value="reset" selected={selection === 'reset'}>Reset |-O-----|</option>
  <option value="set" selected={selection === 'set'}>Set |-----O-|</option>
</select>