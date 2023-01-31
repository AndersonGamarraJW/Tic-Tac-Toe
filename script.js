const tablero = (function(){
    let xCounter = 0;
    let oCounter = 0;
    const matriz = [
        ['x','','x'],
        ['','x','x'],
        ['','','']
    ];
    const setSimbol = (position,simbol) => {
        matriz[position[0]][position[1]] = simbol;
    }
    //Game Logic
    const _verifyDown = (tamañoTabla,simbol,column,row) =>{
        const max = tamañoTabla - row - 1;
        for(let i = 1 ;i <= max;i++){
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
    const _verifyRight = (tamañoTabla,simbol,column,row) => {
        const max = tamañoTabla - column - 1;
        for (let i = 1;i <= max ;i++){
            if(matriz[row][column+i] != simbol) return false;
        }
        return true;
    }
    const _verifyLeft = (simbol,column,row) =>{
        const max = column;
        for (let i = 1;i<=max;i++){
            if(matriz[row][column-i] != simbol) return false;
        }
        return true;
    }
    const _rightDiagonal = (tamañoTabla,simbol,column,row) =>{
        const max = tamañoTabla -column-1;
        for (let i = 1; i <= max ;i++){
            if(matriz[row-i][column+i] != simbol) return false
        }
        return true;
    }
    const _leftDiagonal = (simbol,column,row) => {
        const max = column;
        for (let i = 1;i<=max;i++){
            if(matriz[row+i][column-i] != simbol) return false;
        }
        return true;
    }
    const _completeColumn = (lastPosition,simbol) => {
        const [row,column] = lastPosition;
        if(_verifyDown(3,simbol,column,row) && _verifyUp(simbol,column,row))
            return true;
        return false;
    }
    const _completeRow = (lastPosition,simbol) => {
        const [row,column] = lastPosition;
        if(_verifyRight(3,simbol,column,row) && _verifyLeft(simbol,column,row))
            return true;
        return false;
    }
    const _completeDiagonal = (lastPosition,simbol) => {
        const [row,column] = lastPosition;
        if(_rightDiagonal(3,simbol,column,row) && _leftDiagonal(simbol,column,row))
            return true;
        return false;
    }
    const completeRowColumn = (lastPosition,simbol) => {
        if(_completeColumn(lastPosition,simbol) || _completeRow(lastPosition,simbol) || _completeDiagonal(lastPosition,simbol))
            console.log('Ganaste');
    }
    
    
    return {completeRowColumn,setSimbol}
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

tablero.completeRowColumn([2,0],'x');


