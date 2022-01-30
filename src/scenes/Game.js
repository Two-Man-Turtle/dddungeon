import Phaser, { Display } from 'phaser'

import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'

let cursors;
let knight;
let chort;

//let hit = 0
// function handlePlayerChortCollision(obj1, obj2)
// {   
//     const chort = obj1
//     const dx = knight.x - chort.x
//     const dy = knight.y - chort.y

//     const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

//     knight.setVelocity(dir.x, dir.y)
//     this.hit = 1
    
//}

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

        // Chort Single Enemy
        this.enemy = new Enemy(this, 150, 225, 'chort')
        this.physics.add.collider(this.enemy, wallLayer)


        // Collision 
        //this.physics.add.collider(chort, knight, handlePlayerChortCollision, undefined, this)
        
        // Old Camera stuff
        //this.physics.world.setBounds(0, 0)
        // camera.startFollow(knight, true, 0.5, 0.5);
        // knight.fixedToCamera = true;
        // camera.setBounds(0, 0);
        // camera.setDeadzone(5, 5)
        // camera.setZoom(2)
    }
    
    update() {
        //PLAYER UPDATE
        this.player.update()
        //ENEMY UPDATE
        this.enemy.update()
    }
}
export default Game