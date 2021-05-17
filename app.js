function getRandomValue(max,min){
    return Math.floor(Math.random()*(max-min));
}

Vue.createApp({
    data(){
        return {
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            winner:null,
            logMessages:[]
        }
    },
    watch:{
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                //draw
                this.winner="Draw"
            }else if(value<=0){
                //player lost
                this.winner="Monster"
            }
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                //draw
                this.winner="Draw"
            }else if(value<=0){
                //monster lost lost
                this.winner='Player'
            }
        }
    },
    computed:{
        monsterBarStyle(){
            return {width:this.monsterHealth<0?0:this.monsterHealth+'%'}
        },
        playerBarStyle(){
            return {width:this.playerHealth<0?0:this.playerHealth+'%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !==0;
        }
       
    },
    methods:{
        reStart(){
            this.playerHealth=100;
            this.monsterHealth=100;
            this.winner=null;
            this.currentRound=0;
            this.logMessages=[];
        },
        attackMonster(){
                this.currentRound++;
               const attackValue=getRandomValue(12,5)
               this.monsterHealth=this.monsterHealth-attackValue;
               this.addLogMessage("Player",'Attacks',attackValue);
               this.attackPlayer();
        },
        attackPlayer(){
            const attackValue=getRandomValue(15,8);
            this.playerHealth=this.playerHealth-attackValue;
            this.addLogMessage("Monster",'Attacks',attackValue)
        },
        specialAttack(){
            this.currentRound--;
            const attackValue=getRandomValue(25,10);
            this.monsterHealth=this.monsterHealth-attackValue;
            this.addLogMessage("Player",'Special Attacks',attackValue)
            this.attackPlayer()
        },
        healPlayer(){
            this.currentRound++;
            const healValue=getRandomValue(20,8);
            if(this.playerHealth+healValue<100){
                this.playerHealth+=healValue;
                this.addLogMessage("Player",'Heals',healValue)
            }else{
                this.playerHealth=100;
                this.addLogMessage("Player",'Heals',healValue)
            }
            this.attackPlayer();
            
        },
        surrender(){
            this.winner="Monster"
            this.addLogMessage("Player",'Surrender',0)
        },
        addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                value:value
            })
        }

    }
}).mount("#game")