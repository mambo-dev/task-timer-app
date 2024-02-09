<script lang="ts" >
	import CreateTimer from "$lib/create-utils/CreateTimer.svelte";
	import type { PageData } from "./$types";

    export let data:PageData
    let dialogOpen = false
</script>

<div class="w-full py-2 px-4" >
    {#if data?.timers.length <= 0}
    <div class="mx-auto mt-10 flex items-start bg-white py-2 px-4 flex-col rounded border border-slate-200 w-fit" >
     <p>No timers to display yet, start by creating one.</p>
     <button on:click={()=>(dialogOpen = true)}  class="mx-auto  text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center" >Create Timer</button>
    
    </div>
 {/if}

 <button on:click={()=>(dialogOpen = true)}  class="ml-auto  text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center" >Add Timer</button>

 
 <CreateTimer dialogOpen={dialogOpen} />

</div>
