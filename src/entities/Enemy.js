import Phaser from 'phaser'
import Entity from './Entity.js'

export default class Enemy extends Entity {
    constructor(scene, x, y, textureKey){
        super(scene,x,y,textureKey,'Enenmy')

        const anims = scene.anims
        const animFrameRate = 10
        this.textureKey = textureKey

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
    }//end constructor

    update(){

    }//end update
}//end class