import Phaser, { Display } from 'phaser'

import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'


class Game extends Phaser.Scene{
    constructor() {
        super('game')
    }
    
    create() {
        // Map
        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles')
        map.createLayer('Ground', tileset)
        const wallLayer = map.createLayer('Walls', tileset)
        wallLayer.setCollisionByProperty({ collides: true })

        this.physics.world.bounds.width = map.widthInPixels
        this.physics.world.bounds.height = map.heightInPixels
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // Debug Tool for Walls
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        // });

        // Camera
        const camera = this.cameras.main;
        camera.setZoom(2)
        // Player Character
        this.player = new Player(this, 100, 100, 'knight')
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5)
        this.physics.add.collider(this.player, wallLayer)
        this.player.body.setCollideWorldBounds(true)


        // Chort Single Enemy
        this.enemy = new Enemy(this, 150, 225, 'chort')
        this.physics.add.collider(this.enemy, wallLayer)
        this.enemy.body.setCollideWorldBounds(true)


        // The Horde!
        this.enemyHorde = this.add.group()
        for (let i = 0; i < 8; i++) {
            const e = new Enemy(this, 220 + 20*i, 250, 'chort')
            e.body.setCollideWorldBounds(true)
            e.setTint(0x9999ff)
            this.enemyHorde.add(e)
        }
        this.physics.add.collider(this.enemyHorde, wallLayer)


        // Collision 
        this.physics.add.overlap(this.player, this.enemy, this.handlePlayerEnemyCollision, null, this)
        this.physics.add.overlap(this.player, this.enemyHorde, this.handlePlayerEnemyCollision, null, this)
        
    }
    
    handlePlayerEnemyCollision(player, enemy) {
        //console.log('player hit')
        this.cameras.main.shake(40, 0.02)
        player.setTint(0xff0000)
        this.time.addEvent({
            delay: 400, //millisceonds
            callback: ()=>{
                player.clearTint()
            },
            callbackScope: this,
            loop: false
        })
        enemy.explode()
    }



    update() {
        //PLAYER UPDATE
        this.player.update()
        //ENEMY UPDATE
        if(!this.enemy.isDead){
            this.enemy.update()
        }
        this.enemyHorde.children.iterate((child) => {
            if(!child.isDead){
                child.update()
            }
        })
    }
}
export default Game