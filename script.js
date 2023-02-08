const tablero = (function(){
    let xCounter = 0;
    let oCounter = 0;
    const matriz = [
        ['','',''],
        ['','',''],
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
    const _loopCelds = ()=>{
        //Metodo privada para recorrer cada celda
    }
    const _rightDiagonal = (tamañoTabla,simbol,column,row) =>{
        let result = true;
        let direccion = 0;
        const max = tamañoTabla -column-1;
        
        if(direccion === 0){
            for(let i = 1;i <= max;i++){
                //right top
                if(row-i >= 0 && matriz[row-i][column+i] != simbol){
                    result = false;
                }
                if(result === false){
                    direccion = 1;
                    break;
                }
            }
            direccion = 1;
        }
        if(direccion === 1){
            for(let i =1;i <= max;i++){
                if(row+i < 3 && matriz[row+i][column+i] != simbol){
                    return false;
                }
            }
        }
        //for (let i = 1; i <= max ;i++){
            //if(row-i <0 || matriz[row-i][column+i] != simbol) return false
            /*
            if(matriz[row-i][column+i] === simbol) result = true;
            else if (matriz[row+i][column+i] === simbol) result =  true;
            */
            
        //}
        return result;
    }
    const _leftDiagonal = (simbol,column,row) => {
        const max = column;
        let result =true;
        let direccion = 0;
        if(direccion === 0){
            for (let i = 1;i<=max;i++){
                //if(matriz[row+i][column-i] != simbol) return false;
                //problema : row + i
                if(result === true && row+i < 3 && matriz[row+i][column-i] != simbol){
                    console.log('entro');
                    result = false;
                }
                if(result === false){
                    direccion = 1;
                    console.log('a');
                    break;   
                }
            }
            direccion = 1;
        }
        if(direccion === 1){
            for(let i = 1;i<=max;i++){
                if( row-i>=0 && matriz[row-i][column-i] != simbol)
                    return false;
            }
            console.log(result);
        }
        
        return result;
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
            return true;
    }
    const printMatriz = () => {
        for (let i=0;i<matriz.length;i++) console.log(matriz[i])
    }
    
    return {completeRowColumn,setSimbol,printMatriz}
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

//Controlador de juego
const game = (function(){
    const boxes = document.querySelectorAll('.box');
    let _playerOne = undefined;
    let _playerTwo = undefined;
    let _dificulty = undefined;
    let _currrentSimbol = undefined;
    
    const _isWin = (position) =>{
        if(tablero.completeRowColumn(position,_currrentSimbol)) 
            return true;
        return false;       
    }
    const _switchCurrentSimbol = ()=>{
        if(_currrentSimbol === _playerOne.getSimbol())
            _currrentSimbol = _playerTwo.getSimbol();
        else
            _currrentSimbol = _playerOne.getSimbol();
    }
    //Controlador de la mecanica del juego
    const _controlGame = function(){
        this.textContent = _currrentSimbol;
        const position = getGridElementsPosition(getNodeIndex(this));
        tablero.setSimbol(position,_currrentSimbol);
        if(_isWin(position)) _endGame();            
        _switchCurrentSimbol();
        this.removeEventListener('click',_controlGame);
    }
    const _setEventBox = ()=>{
        boxes.forEach(box=>{
            box.addEventListener('click',_controlGame);
        });
    }
    const _getWinPlayer = () =>{
        if(_currrentSimbol === _playerOne.getSimbol()) 
            return _playerOne;
        return _playerTwo;
    }
    const startGame = (playerOne,playerTwo)=>{
        _currrentSimbol = playerOne.getSimbol();
        _playerOne = playerOne;
        _playerTwo = playerTwo;
        _setEventBox();
    }
    
    const _endGame = ()=>{
        let winPlayer = _getWinPlayer();
        console.log('Ganaste',winPlayer.getName());
    }
    return {startGame}
    
})();
//luego cambiar con la propiedad simbol de un jugador
function setSimbol(){
    let position = getGridElementsPosition(getNodeIndex(this));
    tablero.setSimbol(position,simbol);
    tablero.printMatriz();
    tablero.completeRowColumn(position,simbol);
    this.textContent = simbol;
    if(simbol === 'x') simbol = 'o';
    else simbol = 'x';
}


function getGridElementsPosition(index){
    //Toma la contenedora grid, la que almacena todos los grid-elements
    const gridEl = document.getElementById('template-container'); 
    
    let offset = Number(window.getComputedStyle(gridEl.children[0]).gridColumnStart) -1;
    
    if(isNaN(offset)) offset = 0;
    
    //Contador de columnas
    const colCount = window.getComputedStyle(gridEl).gridTemplateColumns.split(' ').length;
    
    const rowPosition = Math.floor((index + offset) / colCount);
    const colPosition = (index + offset) % colCount;
    
    return [rowPosition,colPosition]
}

//Obtener el index del nodo 
function getNodeIndex(elm){
    const c = elm.parentNode.children;
    for(let i =0;i<c.length;i++){
        if(c[i] === elm) return i
    }
}
//Display controller
const displayController = (function(){
    const main = document.querySelector('main');
    const removeCreatePlayerWindow = ()=>{
        const createPlayerWindow = document.querySelector('#create-player-window');
        main.removeChild(createPlayerWindow);
    }
    const _emptyNamePlayer = (elm) =>{
        elm.parentNode.classList.add('content-empty');
    }
    const validateNamePlayers = () => {
        const playerOneName = document.querySelector('#player-one-name');
        const playerTwoName = document.querySelector('#player-two-name');
        if(playerOneName.value === ""){
            _emptyNamePlayer(playerOneName);
            return false;
        }
        if(playerTwoName.value === ""){
            _emptyNamePlayer(playerTwoName);
            return false;
        }
        return true;
    }
    const validateSimbolPlayers = () => {
        const playerOneSimbol = document.querySelector('#player-one-simbol');
        const playerTwoSimbol = document.querySelector('#player-two-simbol');
        if(playerOneSimbol.value === playerTwoSimbol.value)
            return false;
        return true;
    }
    const getPlayers = () => {
        const playerOneName = document.querySelector('#player-one-name');
        const playerTwoName = document.querySelector('#player-two-name');
        const playerOneSimbol = document.querySelector('#player-one-simbol');
        const playerTwoSimbol = document.querySelector('#player-two-simbol');
        
        return {
            playerOne : playerFabric(playerOneName.value,playerOneSimbol.value),
            playerTwo : playerFabric(playerTwoName.value,playerTwoSimbol.value)
        }
    }
    
    return {removeCreatePlayerWindow,validateNamePlayers,validateSimbolPlayers,getPlayers}
})();
//Codigo general
function startGame(){
    if(!(displayController.validateNamePlayers() && displayController.validateSimbolPlayers()))
        return;
    
    players = displayController.getPlayers();
    displayController.removeCreatePlayerWindow();
    game.startGame(players.playerOne,players.playerTwo);
}
const playButton = document.querySelector('#play-button');

playButton.addEventListener('click',startGame);

