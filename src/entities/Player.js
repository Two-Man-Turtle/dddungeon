import Phaser from 'phaser'
import Entity from './Entity.js'

export default class Player extends Entity {
    constructor(scene, x, y, textureKey, health) {
        super(scene, x, y, textureKey, 'Player')

        this.speed = 100
        this.health = health
        // Player Animations
        const anims = scene.anims

        // Idle Animation
        anims.create({
            key: 'knight-idle',
            repeat: -1,
            frameRate: 10,
            frames: anims.generateFrameNames('knight', {start: 1, end: 3, prefix: 'knight_m_idle_anim_f', suffix: '.png' }), 
        })

        // Movement Animation
        anims.create({
            key: 'knight-movement-right',
            repeat: -1,
            frameRate: 10,
            frames: anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_run_anim_f', suffix: '.png'})
        })
        anims.create({
            key: 'knight-movement-left',
            repeat: -1,
            frameRate: 10,
            frames: anims.generateFrameNames('knight', {start: 3, end: 0, prefix: 'knight_m_run_anim_f', suffix: '.png'})
        })

        //  Player Inputs
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        })

        // Set idle Animation
        this.anims.play('knight-idle')
    }//end of constructor
    update() {
        const {keys} = this //output: this.keys
        const speed = 100

        this.body.setVelocity(0)
        //movement
        if (keys.left.isDown || keys.a.isDown) {
            this.body.setVelocityX(-speed)
        } else if (keys.right.isDown || keys.d.isDown) {
            this.body.setVelocityX(speed)
        }

        if (keys.up.isDown || keys.w.isDown) {
            this.body.setVelocityY(-speed)
        } else if (keys.down.isDown || keys.s.isDown) {
            this.body.setVelocityY(speed)
        }

        this.body.velocity.normalize().scale(speed)
        //animation
        if (keys.right.isDown || keys.d.isDown) {
            this.anims.play('knight-movement-right', true)
            this.scaleX = 1
        } else if (keys.left.isDown || keys.a.isDown) {
            this.anims.play('knight-movement-left', true)
            this.scaleX = -1
        } else {
            this.anims.play('knight-idle', true)
        }
    }//end of update

}//end of class