const container=document.querySelector('.container');         
const playerTurn=document.querySelector('#playerturn');
const startScreen=document.querySelector('.startScreen');
const startbtn=document.querySelector('#start');
const message=document.querySelector('#message');


let initial_matrix=
[
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],

   

];
let currentPlayer;
let random_number=function(min,max){
    return   Math.floor(Math.random() * (max-min))+min;
}
//Clear Array
function ClearArray(){
let gridrow= document.querySelectorAll('.grid-row');
for(let i=0;i<gridrow.length;i++){
    
    for(let j=0;j<7;j++){
    if(gridrow[i].children[j].classList.contains('filled')){
        gridrow[i].children[j].classList.remove('filled');
    }
    }
}
}

//verify array

  const verifyArray=(arrayElement)=>{
    let bool=false;
    let elementCount=0;
    arrayElement.forEach(function(element,index){
        if(element===currentPlayer){
            elementCount++;
            if(elementCount===4){
                bool=true;
            }
        }else{
            elementCount=0;
        }

    });
    return bool;
    
  }
  const gameOvercheck=()=>{
    let truthCount=0;
    for(let innerArray of initial_matrix ){
        if(innerArray.every((val)=>val!=0)){
            truthCount++;
        }else{
            return false;
        }
    }
    if(truthCount===6){
        message.innerHTML="Gamer Over!"
        startScreen.classList.remove("hide");
        // ClearArray();
        // startGame();
    }
  };


  const checkAdjacentRowValues=(row)=>{
    return verifyArray(initial_matrix[row]);
}
const checkAdjacentColumnValues=(column)=>{
    let colwinCount=0;
    let colwin=false;
    initial_matrix.forEach(function(element,index){
     if(element[column]==currentPlayer){
        colwinCount++;
        if(colwinCount===4){
         colwin=true;
        }
     }else{
        colwinCount=0;
     }
    });
    return colwin;
 }






const getRightDiagonal=(row,column,rowlength,columnlength)=>{
let rowCount=row;
let columnCount=column;
let RightDiagonal=[];
while(rowCount>0){
    if(columnCount>=columnlength-1){
        break;
    }
    rowCount--;
    columnCount++;
    RightDiagonal.unshift(initial_matrix[rowCount][columnCount]);

}
rowCount=row;
columnCount=column;
while(rowCount<rowlength){
    if(columnCount<0){
        break;

    }
    RightDiagonal.push(initial_matrix[rowCount][columnCount]);
    rowCount++;
    columnCount--;
}
return RightDiagonal;
 }
// // //left diagonal
const getLeftDiagonal=(row,column,rowlength,columnlength)=>{
    let rowCount=row;
    let columnCount=column;
    let LeftDiagonal=[];
    while(rowCount>0){
        if(columnCount<=0){
            break;
        }
        rowCount--;
        columnCount--;
        LeftDiagonal.unshift(initial_matrix[rowCount][columnCount]);
    
    }
    rowCount=row;
    columnCount=column;
    while(rowCount<rowlength){
        if(columnCount>=columnlength){
            break;
    
        }
        LeftDiagonal.push(initial_matrix[rowCount][columnCount]);
        rowCount++;
        columnCount++;
    }
    return LeftDiagonal;
     }


// const checkAdjacentRowValues=(row)=>{
//     return verifyArray(initial_matrix[row]);
// }




// //check diagonal
const checkAdjacentDaigonalValues=(row,column)=>{
    let diagonalwin=false;
    let tempcheck={
        leftTop:[],
        RightTop:[],
    }
    let columnlength=initial_matrix[row].length;
    let rowlength=initial_matrix.length;
    //storing the values in the array.
    tempcheck.leftTop=[
        ...getLeftDiagonal(row,column,rowlength,columnlength),
    ];
    tempcheck.RightTop=[
        ...getRightDiagonal(row,column,rowlength,columnlength),
    ];
    //check similarity in the array

    diagonalwin=verifyArray(tempcheck.RightTop);
    if(!diagonalwin){
        diagonalwin=verifyArray(tempcheck.leftTop);
    }
    return diagonalwin;
}





const wincheck=function(row,column){
    return checkAdjacentRowValues(row)
    ?true
    :checkAdjacentColumnValues(column)
    ?true
    :checkAdjacentDaigonalValues(row,column)
    ?true:false;

}
const setPiece=function(startCount,colValue){
    let rows = document.querySelectorAll('.grid-row');
    if(initial_matrix[startCount][colValue]!=0){
        startCount-=1;
        setPiece(startCount,colValue);
    }else{
        let currentRow=rows[startCount].querySelectorAll('.grid-box');
        currentRow[colValue].classList.add('filled',`Player${currentPlayer}`);
        initial_matrix[startCount][colValue]=currentPlayer;
    
        if(wincheck(startCount,colValue)){
         message.innerHTML=`Player<span>${currentPlayer}<span> wins`;
         startScreen.classList.remove("hide");
         return false;
        }
    }
      gameOvercheck();
}
//fillbox
const fillbox=function(e){
    let colValue=parseInt(e.target.getAttribute("data-value"));
    setPiece(5,colValue);
    currentPlayer = currentPlayer == 1?2:1;
    playerTurn.innerHTML=`Player<span>${currentPlayer}'s<span> Chance`;
}
//creating the matrix
const matrixCreater=()=>{
    for(let innerArray in initial_matrix){
        let outerDiv=document.createElement('div');
        outerDiv.classList.add('grid-row');
        outerDiv.setAttribute('data-value',innerArray);
        for(let j in initial_matrix[innerArray]){
            initial_matrix[innerArray][j]=[0];
            let innerDiv=document.createElement('div');
            innerDiv.classList.add('grid-box');
            innerDiv.setAttribute('data-value',j);
            innerDiv.addEventListener('click',function(e){
                fillbox(e);
            });
            outerDiv.appendChild(innerDiv);


        }
       container.appendChild(outerDiv);

    }
};




window.onload=startGame= async ()=> {
    //Between 1 and 2;
    currentPlayer=random_number(1,3);
    container.innerHTML=""
    await matrixCreater();
    playerTurn.innerHTML=`Player <span>${currentPlayer}'s<span> Chance`;

}




startbtn.addEventListener('click',()=>{
    startScreen.classList.add("hide");
    startGame();
});






// if(initial_matrix[startCount][colValue]!=0){
//     startCount-=1;
//     setPiece(startCount,colValue);
// }else{
//     let currentRow=rows[startCount].querySelectorAll('.grid-box');
//     currentRow[colValue].classList.add('filled',`Player${currentPlayer}`);
//     initial_matrix[startCount][colValue]=currentPlayer;

//     if(wincheck(startCount,colValue)){
//      message.innerHTML=`Player<span>${currentPlayer}<span> wins`;
//      startScreen.classList.remove("hide");
//      return false;
//     }
// }

















