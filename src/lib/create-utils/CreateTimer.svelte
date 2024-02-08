<script lang="ts">
	import { enhance } from "$app/forms";
    import * as Dialog from "$lib/components/ui/dialog";
    export let form
    export let dialogOpen = false
</script>

  <Dialog.Root  bind:open={dialogOpen}  >
     <Dialog.Content >
      <Dialog.Header>
        <Dialog.Title>Create new timer</Dialog.Title>
 </Dialog.Header>
<div  class="w-full flex flex-col items-center justify-center gap-y-4 ">
  
    <p class="font-semibold text-slate-600 text-4xl " >00:00:00</p> 
  
  <form  use:enhance  method='POST' class="w-fit flex  items-center  gap-x-2"  action="?/saveTimer" >
  
  
      <button  type="button" class="text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-green-500 to-emerald-500 inline-flex items-center justify-center"  >Start</button>
  
      <button  type="button" class="  text-white rounded-lg shadow-red-400 py-2 px-4 bg-gradient-to-l from-red-500 to-orange-500 inline-flex items-center justify-center">Stop</button>
  
      <button  on:click={()=>(dialogOpen = false)} class="text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center"  type="submit">save</button>
  </form>
  
  {#if form?.error}
  <p>{form.error}</p>
  {/if}
</div>
    </Dialog.Content>
  </Dialog.Root>