<!--This group contains a resetting and a setting rod, as well as a dropdown menu for installing an OR gate-->

<script lang="ts">
  import type { LogicRodType, OrGateValueType } from '$lib/ts/digiComp';
  import LogicRod from './LogicRod.svelte';
  import OrGateSelection from './OrGateSelection.svelte';
  let { 
    resetIsTriggering, 
    setIsTriggering, 
    resetRodValue = $bindable(), 
    setRodValue = $bindable(), 
    orGateValue = $bindable(), 
    index 
  }:
  {
    resetIsTriggering: boolean, 
    setIsTriggering: boolean, 
    resetRodValue: LogicRodType, 
    setRodValue: LogicRodType, 
    orGateValue: OrGateValueType, 
    index: number
  } = $props();
</script>

<div class="flex-item">
  <OrGateSelection bind:selection={orGateValue} />
  <div class="flex-row gap-1">  
    <LogicRod isTriggering={resetIsTriggering} columnSettings={resetRodValue} index={2*index+1} />
    <LogicRod isTriggering={setIsTriggering} columnSettings={setRodValue} index={2*index+2} />
  </div>
</div>

