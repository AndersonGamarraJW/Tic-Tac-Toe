const tablero = (function(){
    let xCounter = 0;
    let oCounter = 0;
    const matriz = [['','','x'],['','','x'],['','','x']];
    const setSimbol = (position,simbol) => {
        matriz[position[0]][position[1]] = simbol;
    }
    //Game Logic
    const _verifyDown = (tamañoTabla,simbol,column,row) =>{
        const max = tamañoTabla - row - 1;
        for(let i = 1 ;i <= max;i++){
            console.log(row+i);
            if(matriz[row+i][column] != simbol) return false;
        }
        return true;
    }
    const _verifyUp = (simbol,column,row) => {
        const max = row; 
        for (let i = 1;i<=max;i++){
            if (matriz[row-i][column] != simbol) return false;
        }
        return true;
    }
    const _completeColumn = (lastPosition,simbol) => {
        if(_verifyUp(simbol,lastPosition[1],lastPosition[0])) console.log('Ganaste');
    }
    
    const completeRowColumn = (lastPosition,simbol) => {
    }
    
    return {_completeColumn}
})();

function playerFabric(name,simbol){
    let _name = name;
    let _simbol = simbol;
    const getName = () =>{return _name;}
    const setName = (name) => {_name = name;}
    const getSimbol = () => {return _simbol;}
    const setSimbol = (simbol) => {_simbol = simbol}
    return {getName,setName,getSimbol,setSimbol}
}

tablero._completeColumn([2,2],'x');


