import Phaser, { Display } from 'phaser'

let cursors;
let knight;
let chort;

let hit = 0
function handlePlayerChortCollision(obj1, obj2)
{   
    const chort = obj1
    const dx = knight.x - chort.x
    const dy = knight.y - chort.y

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

    knight.setVelocity(dir.x, dir.y)
    this.hit = 1
    
}

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

        // Debug Tool for Walls
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        // });

        // Player Character
        knight = this.physics.add.sprite(100, 100, "knight", 'knight_m_idle_anim_f0.png')
        cursors = this.input.keyboard.createCursorKeys()
       
        // Idle Animation
        this.anims.create({
            key: 'knight-idle',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('knight', {start: 1, end: 3, prefix: 'knight_m_idle_anim_f', suffix: '.png' }), 
        })
        
        // Movement Animation
        this.anims.create({
            key: 'knight-movement',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_run_anim_f', suffix: '.png'})
        })
        // Chort Enemy
        chort = this.physics.add.sprite(200, 200, 'chort')

        // Idle Animation
        this.anims.create({
            key: 'chort-idle',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort/chort_idle_anim_f', suffix: '.png' }), 
        })

        // Movement Animation
        this.anims.create({
            key: 'chort-movement',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort/chort_run_anim_f', suffix: '.png'})
        })
        chort.anims.play('chort-movement')
        
        // Collision 
        this.physics.add.collider(knight, wallLayer)
        this.physics.add.collider(chort, knight, handlePlayerChortCollision, undefined, this)
        

        // Camera
        const camera = this.cameras.main;

        this.physics.world.setBounds(0, 0)
        camera.startFollow(knight, true, 0.5, 0.5);
        knight.fixedToCamera = true;
        camera.setBounds(0, 0);
        camera.setDeadzone(5, 5)
        camera.setZoom(2)
    }
    
    update() {
        const speed = 100
        if (this.hit > 0)
        {
            ++this.hit
            if (this.hit > 10)
            {
                this.hit = 0
            }
            return
        }
        
        if (cursors.left.isDown) {
            knight.anims.play('knight-movement', true)
            knight.setVelocity(-speed, 0)
            knight.scaleX = -1
            knight.body.offset.x = 16
        }
        else if (cursors.right.isDown) {
            knight.anims.play('knight-movement', true)
            knight.setVelocity(speed, 0)
            knight.scaleX = 1
            knight.body.offset.x = 0
        }
        else if (cursors.up.isDown) {
            knight.anims.play('knight-movement', true)
            knight.setVelocity(0, -speed)
        }
        else if (cursors.down.isDown) {
            knight.anims.play('knight-movement', true)
            knight.setVelocity(0, speed)
        }
        else {
            knight.anims.play('knight-idle', true)
            knight.setVelocity(0, 0)
        }
    }
}
export default Game