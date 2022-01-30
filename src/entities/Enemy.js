import Phaser from 'phaser'
import Entity from './Entity.js'

export default class Enemy extends Entity {
    constructor(scene, x, y, textureKey){
        super(scene,x,y,textureKey,'Enenmy')

        const anims = scene.anims
        const animFrameRate = 10
        this.textureKey = textureKey
        this.speed = 35

        anims.create({
            key: 'enemy-idle',
            repeat: -1,
            frameRate: animFrameRate,
            frames: anims.generateFrameNames(this.textureKey, {
                start: 0,
                end: 3,
                prefix: 'chort/chort_idle_anim_f',
                suffix: '.png'
            })
        })
        anims.create({
            key: 'enemy-movement',
            repeat: -1,
            frameRate: animFrameRate,
            frames: anims.generateFrameNames(this.textureKey, {
                start: 0,
                end: 3,
                prefix: 'chort/chort_run_anim_f',
                suffix: '.png'
            })
        })
        this.anims.play('enemy-idle')


        let direction = Math.floor(Math.random()*4)
        switch(direction){
            case 0:
                //up
                this.body.setVelocity(0, -this.speed)
                this.anims.play('enemy-movement')
                break
            case 1:
                //left
                this.body.setVelocity(-this.speed, 0)
                this.anims.play('enemy-movement')
                this.scaleX = -1
                break
            case 2:
                //down
                this.body.setVelocity(0, this.speed)
                this.anims.play('enemy-movement')
                break
            case 3:
                //right
                this.body.setVelocity(this.speed, 0)
                this.anims.play('enemy-movement')
                this.scaleX = 1
                break
        }
    }//end constructor

    update(){
        //javascript destructuring 
        const {speed} = this //this.speed
        const enemyBlocked = this.body.blocked

        if (enemyBlocked.down || enemyBlocked.up || enemyBlocked.left || enemyBlocked.right) {
            let possibleDirections = []
            for(const direction in enemyBlocked) {
                possibleDirections.push(direction)
            }
            const newDirection = possibleDirections[Math.floor(Math.random()*4)+1]
            switch(newDirection){
                case 'up':
                    //up
                    this.body.setVelocity(0, -this.speed)
                    this.anims.play('enemy-movement')
                    break
                case 'left':
                    //left
                    this.body.setVelocity(-this.speed, 0)
                    this.anims.play('enemy-movement')
                    this.scaleX = -1
                    break
                case 'down':
                    //down
                    this.body.setVelocity(0, this.speed)
                    this.anims.play('enemy-movement')
                    break
                case 'right':
                    //right
                    this.body.setVelocity(this.speed, 0)
                    this.anims.play('enemy-movement')
                    this.scaleX = 1
                    break
            }
        }
    }//end update
}//end class