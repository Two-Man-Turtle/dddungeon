import Phaser from 'phaser'
import Entity from './Entity.js'

class Player extends Entity {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey, 'Player')

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
            key: 'knight-movement',
            repeat: -1,
            frameRate: 10,
            frames: anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_run_anim_f', suffix: '.png'})
        })
    }
}