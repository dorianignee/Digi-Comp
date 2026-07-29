<script lang="ts">
  import LogicRodGroup from './LogicRodGroup.svelte';
  import FlipFlop from './FlipFlop.svelte';
  import type { DigiCompType, LogicRodGroupType, FlipFlopType } from '$lib/ts/digiComp';
  
  let digiComp: DigiCompType = $state(
    {
      height: 3,
      width: 3,
      flipFlops: [0, 0, 0],
      rodGroups: [
        {
          orGateValue: 'none',
          reset: [
            {
              f: false,
              t: false,
              c: true,
            },
            {
              f: true,
              t: false,
              c: false,
            },
            {
              f: false,
              t: false,
              c: false,
            }
          ],
          set: [
            {
              f: false,
              t: false,
              c: true,
            },
            {
              f: false,
              t: true,
              c: false,
            },
            {
              f: false,
              t: false,
              c: false,
            }
          ]
        },
        {
          orGateValue: 'none',
          reset: [
            {
              f: false,
              t: false,
              c: false,
            },
            {
              f: false,
              t: false,
              c: true,
            },
            {
              f: true,
              t: false,
              c: false,
            }
          ],
          set: [
            {
              f: false,
              t: false,
              c: false,
            },
            {
              f: false,
              t: false,
              c: true,
            },
            {
              f: false,
              t: true,
              c: false,
            }
          ]
        },
        {
          orGateValue: 'none',
          reset: [
            {
              f: false,
              t: true,
              c: false,
            },
            {
              f: false,
              t: false,
              c: false,
            },
            {
              f: false,
              t: false,
              c: true,
            }
          ],
          set: [
            {
              f: true,
              t: false,
              c: false,
            },
            {
              f: false,
              t: false,
              c: false,
            },
            {
              f: false,
              t: false,
              c: true,
            }
          ]
        }
      ]
    }
  );

  function getCIndexes(rod: any[]) {
    let cIndexes = [];
    for (let i = 0; i < rod.length; i++) {
      if (rod[i].c) {
        cIndexes.push(i);
      }
    }
    return cIndexes;
  }

  function cycle() {
    let resetList = [];
    let setList = [];
    debugger;

    // collect all triggered rods
    for (let i = 0; i < digiComp.rodGroups.length; i++) {
      const rodGroup = digiComp.rodGroups[i];
      let trigger = true;
      for (let j = 0; j < rodGroup.reset.length; j++) {
        const cell = rodGroup.reset[j];
        if (cell.t && digiComp.flipFlops[j] === 0) {
          trigger = false;
        }
        if (cell.f && digiComp.flipFlops[j] === 1) {
          trigger = false;
        }
      }
      if (trigger) {
        if (rodGroup.orGateValue === 'set') {
          setList.push(...getCIndexes(rodGroup.set));
        } else {
          resetList.push(...getCIndexes(rodGroup.reset));
        }
      }

      trigger = true;
      for (let j = 0; j < rodGroup.set.length; j++) {
        const cell = rodGroup.set[j];
        if (cell.t && digiComp.flipFlops[j] === 0) {
          trigger = false;
        }
        if (cell.f && digiComp.flipFlops[j] === 1) {
          trigger = false;
        }
      }
      if (trigger) {
        if (rodGroup.orGateValue === 'reset') {
          resetList.push(...getCIndexes(rodGroup.reset));
        } else {
          setList.push(...getCIndexes(rodGroup.set));
        }
      }
    }

    // check if any flip-flops are being reset and set at the same time
    setList = Array.from(new Set(setList)); // deduplicate setList
    resetList = Array.from(new Set(resetList)); // deduplicate resetList

    if (setList.some((value) => resetList.includes(value))) {
      console.log('Error: A flip-flop is being reset and set at the same time.');
      return;
    } else {
      setList.forEach((value) => {
        digiComp.flipFlops[value] = 1;
      });
      resetList.forEach((value) => {
        digiComp.flipFlops[value] = 0;
      });
    }
  }

  function flipFlipFlop(index: number) {
    digiComp.flipFlops[index] = digiComp.flipFlops[index] === 0 ? 1 : 0;
  }

  function clearAll() {
    digiComp.flipFlops = digiComp.flipFlops.map(() => 0);
    digiComp.rodGroups.forEach((rodGroup) => {
      rodGroup.set.forEach((cell) => {
        cell.f = false;
        cell.t = false;
        cell.c = false;
      });
      rodGroup.reset.forEach((cell) => {
        cell.f = false;
        cell.t = false;
        cell.c = false;
      });
      rodGroup.orGateValue = 'none';
    });

    
  }

  function changeWidth() {
    if (digiComp.rodGroups.length > digiComp.width) {
      digiComp.rodGroups = digiComp.rodGroups.slice(0, digiComp.width);
    }
    else if (digiComp.rodGroups.length < digiComp.width) {
      const newRodGroups: LogicRodGroupType[] = Array.from({ length: digiComp.width - digiComp.rodGroups.length }, () => ({
        orGateValue: 'none',
        reset: Array.from({ length: digiComp.height }, () => ({ f: false, t: false, c: false })),
        set: Array.from({ length: digiComp.height }, () => ({ f: false, t: false, c: false }))
      }));
      digiComp.rodGroups = [...digiComp.rodGroups, ...newRodGroups];
    }
  };

  function changeHeight() {
    if (digiComp.flipFlops.length > digiComp.height) {
      digiComp.flipFlops = digiComp.flipFlops.slice(0, digiComp.height);
      digiComp.rodGroups.forEach((rodGroup) => {
        rodGroup.reset = rodGroup.reset.slice(0, digiComp.height);
        rodGroup.set = rodGroup.set.slice(0, digiComp.height);
      });
    }
    else if (digiComp.flipFlops.length < digiComp.height) {
      const newFlipFlops: FlipFlopType[] = Array.from({ length: digiComp.height - digiComp.flipFlops.length }, () => 0);
      digiComp.flipFlops = [...digiComp.flipFlops, ...newFlipFlops];
      digiComp.rodGroups.forEach((rodGroup) => {
        const newResetCells = Array.from({ length: digiComp.height - rodGroup.reset.length }, () => ({ f: false, t: false, c: false }));
        const newSetCells = Array.from({ length: digiComp.height - rodGroup.set.length }, () => ({ f: false, t: false, c: false }));
        rodGroup.reset = [...rodGroup.reset, ...newResetCells];
        rodGroup.set = [...rodGroup.set, ...newSetCells];
      });
    }
  }
</script>

<div class="digi-comp flex-row">
  <div class="front-panel flex-item flex-col gap-05">
    <div class="front-panel-settings flex-col gap-05">
      <span class="brand">DIGI-COMP I</span>
      <div class="flex-row gap-05" style="align-self: center;">
        <label for="width">Size:</label>
        <input type="number" id="width" bind:value={digiComp.width} min="1" max="16" onchange={changeWidth} />
        <label for="height">x</label>
        <input type="number" id="height" bind:value={digiComp.height} min="1" max="16" onchange={changeHeight} />
      </div>
      <button onclick={clearAll}><span class="tabler--trash"></span> Clear all</button>
    </div>

    <div class="flip-flops flex-col flex-end align-items-end">
      {#each digiComp.flipFlops as value, index}
        <FlipFlop onclick={() => flipFlipFlop(index)} {value}/>
      {/each}
    </div>
  </div>
  <div class="rod-container flex-row gap-1">
    {#each digiComp.rodGroups as rodGroup, index}
      <LogicRodGroup setIsTriggering={false} resetIsTriggering={false} setRodValue={rodGroup.set} resetRodValue={rodGroup.reset} bind:orGateValue={rodGroup.orGateValue} {index}/>
    {/each}
  </div>
  <button onclick={cycle}>Cycle</button>
</div>

<style>
  .rod-container {
    border: 1px solid #800;
    padding: 0.5rem;
  }
  
  .brand {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1rem;
    font-weight: bold;
    color: #800;
    text-align: center;
  }

  .digi-comp {
    overflow: auto;
    max-width: 80vw;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .flex-end {
    justify-content: flex-end;
  }

  .align-items-end {
    align-items: flex-end;
  }

  .front-panel {
    width: 10rem;
    background-color: #C00;
    border: 1px solid #800;
    border-top-left-radius: 1rem;
    padding: 0.5rem;
    color: white;
    font-family: 'Arial', sans-serif;
    justify-content: space-between;
  }

  .front-panel input {
    width: 1.5rem;
  }

  .flip-flops {
    margin-top: 1rem;
    justify-self: flex-end;
  }
</style>