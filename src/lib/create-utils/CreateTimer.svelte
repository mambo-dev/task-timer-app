<script lang="ts">
	import { enhance } from "$app/forms";
    import * as Dialog from "$lib/components/ui/dialog";
	import { min } from "drizzle-orm";
    export let form
    export let dialogOpen = false
    export let taskId:number | null
    let seconds = 0
    let minutes = 0
    let hours = 0

    let secondInterval:NodeJS.Timeout | null
    let addMinuteTimer:boolean = false
    let addHourTimer:boolean = false
    let maxTime = false
    let timerStarted = false

    function handleTimerInterval(){
      timerStarted = true
      if(!secondInterval ){
        secondInterval = setInterval(handleSecondIncrease,1000)
      }
    
    }

    function handleStopTimer(){
      
      if(secondInterval){
        clearInterval(secondInterval)
        secondInterval = null
      }

    }



    function handleSecondIncrease(){
      seconds += 1
      if(seconds >= 60 ) {
        addMinuteTimer = true
        if(secondInterval){
          clearInterval(secondInterval)
          secondInterval = null
          seconds = 0
          secondInterval = setInterval(handleSecondIncrease,100)
        }
      }

      if(addMinuteTimer){
        minutes += 1
        addMinuteTimer = false
    
      }

      if(minutes >= 60){
        addHourTimer = true
        minutes = 0
        hours += 1
      }

      if(hours >= 24 ){
        if(secondInterval){
          maxTime = true
          clearInterval(secondInterval)
          secondInterval = null
        }
      }

    }


function handleClearTimer(){
  seconds = 0
  minutes = 0
  hours = 0
  if(secondInterval){
          
          clearInterval(secondInterval)
          secondInterval = null
          timerStarted = false
        }
  
}


</script>

  <Dialog.Root  bind:open={dialogOpen}  >
     <Dialog.Content >
      <Dialog.Header>
        <Dialog.Title>Create new timer</Dialog.Title>
 </Dialog.Header>
<div  class="w-full flex flex-col items-center justify-center gap-y-4 ">

    <p class="font-semibold text-slate-600 text-4xl " >{hours < 10 ? `0${hours}`: hours }:{minutes < 10  ? `0${minutes}`: minutes }:{seconds < 10 ? `0${seconds}`: seconds }</p> 
  
  <form  use:enhance  method='POST' class="w-fit flex  items-center  gap-x-2"  action="?/saveTimer" >
    <input name="timer" type="hidden" value={`${hours},${minutes},${seconds}`} />
    <input type="hidden" value={taskId} name="taskId" />
    {#if  timerStarted}
    <button on:click={handleClearTimer} type="button" class="text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-green-500 to-emerald-500 inline-flex items-center justify-center"  >Clear</button>

    {:else}
    <button on:click={handleTimerInterval} type="button" class="text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-green-500 to-emerald-500 inline-flex items-center justify-center"  >Start</button>

    {/if}
  
      <button on:click={handleStopTimer} type="button" class="  text-white rounded-lg shadow-red-400 py-2 px-4 bg-gradient-to-l from-red-500 to-orange-500 inline-flex items-center justify-center">Stop</button>
  
      <button  on:click={()=>(dialogOpen = false)} class="text-white rounded-lg shadow-purple-400 py-2 px-4 bg-gradient-to-l from-purple-500 to-blue-500 inline-flex items-center justify-center"  type="submit">save</button>
  </form>
  
  {#if form?.error}
  <p class="text-red-300 font-medium text-sm" >{form.error}</p>
  {/if}

  {#if  maxTime}
  <p class="text-red-300 font-medium text-sm" >sorry we cannot save past 24 hours</p>
  {/if}
</div>
    </Dialog.Content>
  </Dialog.Root>