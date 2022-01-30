import Phaser from "phaser"
import chortImage from "../assets/chort.png"
import chortJSON from "../assets/chort.json"
import dungeonTileImage from "../assets/dungeon_tiles.png"
import dungeonTilemap from "../assets/dungeon-01.json"
import knightImage from "../assets/knight.png"
import knightJSON from "../assets/knight.json"
import logoImg from "../assets/logo.png"
import playButtonImg from "../assets/play_button.png"
import titleMusic from "../assets/Memoraphile - Spooky Dungeon.mp3"
import titleScreenImg from "../assets/titlescreen.png"

class Preloader extends Phaser.Scene {

  constructor() {
    super("preloader")
  }

  preload() {
    // Map
    this.load.image("tiles", dungeonTileImage)
    this.load.tilemapTiledJSON("dungeon", dungeonTilemap)

    // Player
    this.load.atlas("knight", knightImage, knightJSON)

    // Chort
    this.load.atlas("chort", chortImage, chortJSON)

    // TitleScreen
    this.load.image("logo", logoImg)
    this.load.image("title_bg", titleScreenImg)
    this.load.image("playButton", playButtonImg)
    this.load.audio("titleMusic", titleMusic)

    // Loading Bar
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    })
    this.load.on("progress", (percent) => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50
      )
      console.log(percent)
    })
  }

  create() {
    this.scene.start("game")
  }
}

export default Preloader
