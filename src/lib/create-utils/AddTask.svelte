<script lang="ts">
	import { enhance } from "$app/forms";
    import * as Dialog from "$lib/components/ui/dialog";
    export let form
    let dialogOpen = false
</script>

  <Dialog.Root  bind:open={dialogOpen}  >
    <Dialog.Trigger on:click={()=>(dialogOpen= true)} class=" text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center" >New task</Dialog.Trigger>
    <Dialog.Content >
      <Dialog.Header>
        <Dialog.Title>Add new task</Dialog.Title>
      <form  use:enhance  method='POST' class="w-full flex items-center gap-x-2"  action="?/addTask" >
        <input  class="flex-1 outline-none shadow bg-slate-200 rounded-md px-4 py-2" type="text"  name ="taskTitle" >
        <button  on:click={()=>(dialogOpen = false)} class="text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center"  type="submit">Save Task</button>
      </form>

      {#if form?.error}
      <p>{form.error}</p>
      {/if}
     
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>