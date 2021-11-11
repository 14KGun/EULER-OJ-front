const summary = (res, task) => {
    if(res === '100'){
        let time = 0, memory = 0;
        for(let i=0; i<task.time.length; i++){
            time = Math.max(time, parseFloat(task.time[i]));
        }
        for(let i=0; i<task.memory.length; i++){
            memory = Math.max(memory, parseFloat(task.memory[i]));
        }
        return [`${ time.toFixed(2) } 초`, `${ memory.toFixed(2) } MB`]
    }
    else if(res.indexOf('wait') !== -1){
        return ['측정 중...', '측정 중...']
    }
    else{
        return ['-', '-']
    }
}   

export default summary;