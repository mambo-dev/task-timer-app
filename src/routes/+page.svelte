<script lang="ts">
	import { enhance } from "$app/forms";
	import AddTask from "$lib/create-utils/AddTask.svelte";
	import CreateTimer from "$lib/create-utils/CreateTimer.svelte";
	import { Trash } from "lucide-svelte";
	import { fly, slide } from "svelte/transition";
  export let data:import("./$types").PageData
  let dialogOpen = false
</script>



  <div class="ml-auto w-fit px-4 py-2" >
    <AddTask />
  </div>

 <ul class=" grid grid-cols-5  gap-4 w-full px-4 py-2" >
  {#each data.tasks as tasks (tasks.id)}
    <li  out:slide  in:fly={{ y: 20 }} class="bg-white py-2 px-2  max-w-md rounded-md border border-slate-100 flex items-start flex-col justify-center gap-y-2" >
      <p class="first-letter:uppercase" >{tasks.title}</p>
     <div  class="flex gap-x-2 w-full"> 
      <button on:click={()=>(dialogOpen = true)} class="w-full text-white rounded-lg shadow-purple-400 py-1 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center" >timer</button>
      <form  method="POST" use:enhance  >
        <input type="hidden" value={tasks.id} name="taskId" />
        <button  formaction="?/deleteTask" class=" w-full text-white rounded-lg shadow-red-400 py-1 px-4 bg-gradient-to-l from-red-500 to-orange-500 inline-flex items-center justify-center" >delete</button>
      </form>

     </div>
    </li>
  {/each}
 </ul>
 <CreateTimer dialogOpen={dialogOpen} />

  <style lang="postcss">
    /* :global(html) {
      background-color: theme(colors.blue.300) ;
    } */
  </style>