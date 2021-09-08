const score = document.querySelector('.score');
    const startscreen = document.querySelector('.startScreen');
    const gamearea = document.querySelector('.gameArea');
    console.log(score);

    startscreen.addEventListener('click',start);

    let keys = {ArrowUp : false,ArrowDown : false,ArrowLeft : false,ArrowRight : false}
    let player = {speed : 5 , score:0}

    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);

    function keyDown(e){
        e.preventDefault();
        keys[e.key] = true;
        //console.log(e.key);
       // console.log(keys);
    }
    function keyUp(e){
        e.preventDefault();
        keys[e.key] = false;
        //console.log(e.key);
    }
    function isCollide(a,b)
    {
       aRect = a.getBoundingClientRect();
       bRect = b.getBoundingClientRect();

       return !((aRect.bottom < bRect.top) || (aRect.top >  bRect.bottom)
              || (aRect.right < bRect.left) || (aRect.left > bRect.right))
    }
    function moveLines(){
        let lines = document.querySelectorAll('.lines');
        lines.forEach(function(item){
            if(item.y >= 700){
                item.y -= 750;
            }
            item.y += player.speed;
            item.style.top = item.y + "px";
        })
    }

    function endGame(){
        player.start = false;
        startscreen.classList.remove('hide');
        startscreen.innerHTML = "Game Over <br> Your Final Score is " +player.score +
                                "<br> Press here to Restart the Game";    }
    function moveEnemy(car){
        let enemy = document.querySelectorAll('.enemy');
        enemy.forEach(function(item){

            if(isCollide(car,item))
            {
                console.log("Game over");
                endGame();
            }
            if(item.y >= 750){
                item.y = -300;
                item.style.left = Math.floor(Math.random() * 350) + "px";
            }
            item.y += player.speed;
            item.style.top = item.y + "px";
        })
    }

    function gamePlay(){
       // console.log("Hey,i'm clicked");
        let car = document.querySelector(".car");
        let road = gamearea.getBoundingClientRect();
        //console.log(road);
        if(player.start){
            moveLines();
            moveEnemy(car);
            if(keys.ArrowUp && player.y > (road.top + 70)){
                player.y -= player.speed;
            }
            if(keys.ArrowDown && player.y < (road.bottom -85)){
                player.y += player.speed;
            }
            if(keys.ArrowLeft && player.x > 0){
                player.x -= player.speed ;
            }
            if(keys.ArrowRight && player.x < (road.width-50)){
                player.x += player.speed;
            }

            car.style.top = player.y + "px";
            car.style.left = player.x + "px";
            window.requestAnimationFrame(gamePlay);
            //console.log(player.score++);

            player.score++;
            let ps = player.score -1;
            score.innerText = "Score is: "+ps;
        }
        
    }

    function start(){
       // gamearea.classList.remove('hide');
        startscreen.classList.add('hide');
        gamearea.innerHTML ="";

        player.start = true;
        player.score = 0;

        window.requestAnimationFrame(gamePlay);

        for(x =0;x<5;x++){
            let roadlines = document.createElement('div');
            roadlines.setAttribute('class','lines');
            roadlines.y = x*150;
            roadlines.style.top = roadlines.y + "px";
            gamearea.appendChild(roadlines);
        }

       

        let car = document.createElement('div');
        car.setAttribute('class','car');
       // car.innerText = "Hey,i'm your car";
        gamearea.appendChild(car);

        player.x = car.offsetLeft;
        player.y = car.offsetTop;

        // console.log(car.offsetTop);
        // console.log(car.offsetLeft);
        for(x =0;x<3;x++){
            let enemyCar = document.createElement('div');
            enemyCar.setAttribute('class','enemy');
            enemyCar.y = ((x+1)*350) * -1;
            enemyCar.style.backgroundColor = randomColor();
            enemyCar.style.top = enemyCar.y + "px";
            enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
            gamearea.appendChild(enemyCar);
        }
    }

    function randomColor(){
        function c(){
            let hex = Math.floor(Math.random() * 256).toString(16);
            return ("0" + String(hex)).substr(-2);
        }
        return "#"+c()+c()+c();
    }
