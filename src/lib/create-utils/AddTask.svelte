<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
  </script>

  <Dialog.Root>
    <Dialog.Trigger  class=" text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center" >New task</Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add new task</Dialog.Title>
      <form  method='POST'>
        <input type="text"  name ="task_name" >
        <button  type="submit">Save Task</button>
      </form>
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>