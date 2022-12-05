//install command di terminal
//npm i @dcl/ui-scene-utils -B
//npm install @dcl/ecs-scene-utils -B

import { Zombie } from './zombie'
import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'

let hp_player = new ui.UIBar(1, -30, 130, Color4.Red(), ui.BarStyles.ROUNDSILVER, 1)
let game = true

//zombie sound
const clip = new AudioClip("sounds/Zombie_att.mp3")
const source = new AudioSource(clip)

//global
let player = Camera.instance
let zombieCount: number = 8
let zombies: Zombie[] = []

function addZombies() {
  for (let i = 0; i < zombieCount; i++) {
    let posX = Math.random() * 32
    let posY = Math.random() * 32
    let zombie = new Zombie(
      new GLTFShape('models/zombie.glb'),
      new Transform({
        position: new Vector3(posX, 0, posY),
        scale: new Vector3(0.6, 0.6, 0.6),
      }),
      100,
    )

    zombie.addComponent(
      new utils.TriggerComponent(new utils.TriggerSphereShape(2), {
        onCameraEnter: () => {
          hp_player.decrease(0.1)
          if (hp_player.read() <= 0) {
            for (let zombie of zombies) {
              engine.removeEntity(zombie);
            }
            new ui.OptionPrompt(
              "You are dead!!",
              "Do you want to play again?",
              () => {
                hp_player
                addZombies()
              },
              () => { },
              "Yes",
              "No",
              true
            )
          }
        }
      })
    )
    zombie.addComponent(source)
    source.loop = true
    source.volume = 1
    source.playing = true
    zombies.push(zombie)
  }
}

if (game)
  addZombies()

const MOVE_SPEED = 2
const ROT_SPEED = 2

class ZombieAttack implements ISystem {
  update(dt: number) {
    for (let zombie of zombies) {
      const transform = zombie.getComponent(Transform)
      let lookAtTarget = new Vector3(
        player.position.x,
        transform.position.y,
        player.position.z
      )
      let direction = lookAtTarget.subtract(transform.position)
      transform.rotation = Quaternion.Slerp(
        transform.rotation,
        Quaternion.LookRotation(direction),
        dt * ROT_SPEED
      )
      let distance = Vector3.DistanceSquared(
        transform.position,
        player.position
      )

      if (distance >= 4) {
        zombie.walk()
        let forwardVector = Vector3.Forward().rotate(transform.rotation)
        let increment = forwardVector.scale(dt * MOVE_SPEED)
        transform.translate(increment)
      } else {
        zombie.attack()
      }
    }
  }
}

engine.addSystem(new ZombieAttack())

// system

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const pond = new Entity('pond')
engine.addEntity(pond)
pond.setParent(_scene)
const transform2 = new Transform({
  position: new Vector3(40.5, 0, 26),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3.426149368286133, 1.784999966621399, 2.4300003051757812)
})
pond.addComponentOrReplace(transform2)
const gltfShape = new GLTFShape("2950ca19-cb51-422b-b80e-fc0765d6cf4b/Pond_01/Pond_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
pond.addComponentOrReplace(gltfShape)

const hardwoodBridge = new Entity('hardwoodBridge')
engine.addEntity(hardwoodBridge)
hardwoodBridge.setParent(_scene)
const transform3 = new Transform({
  position: new Vector3(48.5, 0, 27),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.999999523162842, 2.625, 1.4999995231628418)
})
hardwoodBridge.addComponentOrReplace(transform3)
const gltfShape2 = new GLTFShape("2749a65e-6f27-4f07-b4b0-e3965712dfd1/Bridge_01/Bridge_01.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
hardwoodBridge.addComponentOrReplace(gltfShape2)

const largeIronFence = new Entity('largeIronFence')
engine.addEntity(largeIronFence)
largeIronFence.setParent(_scene)
const transform4 = new Transform({
  position: new Vector3(0.4999997019767761, 0, 79),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.746774435043335, 5.5, 6.2500128746032715)
})
largeIronFence.addComponentOrReplace(transform4)
const gltfShape3 = new GLTFShape("1bea49b5-528b-48cf-8d97-8aef8c86bbd0/FenceIronLarge_01/FenceIronLarge_01.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
largeIronFence.addComponentOrReplace(gltfShape3)

const largeIronFence2 = new Entity('largeIronFence2')
engine.addEntity(largeIronFence2)
largeIronFence2.setParent(_scene)
largeIronFence2.addComponentOrReplace(gltfShape3)
const transform5 = new Transform({
  position: new Vector3(0.4999997019767761, 0, 1),
  rotation: new Quaternion(-5.837277581059123e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(2.746774435043335, 5.5, 9.375019073486328)
})
largeIronFence2.addComponentOrReplace(transform5)

const largeIronFence3 = new Entity('largeIronFence3')
engine.addEntity(largeIronFence3)
largeIronFence3.setParent(_scene)
largeIronFence3.addComponentOrReplace(gltfShape3)
const transform6 = new Transform({
  position: new Vector3(1, 0, 79),
  rotation: new Quaternion(-1.0083275868726007e-14, 0.7071068286895752, -8.429370268459024e-8, -0.7071068286895752),
  scale: new Vector3(2.746774911880493, 5.5, 9.375032424926758)
})
largeIronFence3.addComponentOrReplace(transform6)

const largeIronFence4 = new Entity('largeIronFence4')
engine.addEntity(largeIronFence4)
largeIronFence4.setParent(_scene)
largeIronFence4.addComponentOrReplace(gltfShape3)
const transform7 = new Transform({
  position: new Vector3(79, 0, 79),
  rotation: new Quaternion(-2.4085271740892887e-15, 0.7071068286895752, -8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(2.746774435043335, 5.5, 6.250021457672119)
})
largeIronFence4.addComponentOrReplace(transform7)

const largeIronFence5 = new Entity('largeIronFence5')
engine.addEntity(largeIronFence5)
largeIronFence5.setParent(_scene)
largeIronFence5.addComponentOrReplace(gltfShape3)
const transform8 = new Transform({
  position: new Vector3(0.9999999403953552, 0, 1),
  rotation: new Quaternion(-1.0083275868726007e-14, 0.7071068286895752, -8.429370268459024e-8, -0.7071068286895752),
  scale: new Vector3(2.746774435043335, 5.5, 9.375032424926758)
})
largeIronFence5.addComponentOrReplace(transform8)

const largeIronFence6 = new Entity('largeIronFence6')
engine.addEntity(largeIronFence6)
largeIronFence6.setParent(_scene)
largeIronFence6.addComponentOrReplace(gltfShape3)
const transform9 = new Transform({
  position: new Vector3(79, 0, 1),
  rotation: new Quaternion(-2.4085271740892887e-15, 0.7071068286895752, -8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(2.746774435043335, 5.5, 6.250027179718018)
})
largeIronFence6.addComponentOrReplace(transform9)

const largeIronFence7 = new Entity('largeIronFence7')
engine.addEntity(largeIronFence7)
largeIronFence7.setParent(_scene)
largeIronFence7.addComponentOrReplace(gltfShape3)
const transform10 = new Transform({
  position: new Vector3(78.5, 0, 0.999990701675415),
  rotation: new Quaternion(-5.837277581059123e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(2.746774435043335, 5.5, 9.375019073486328)
})
largeIronFence7.addComponentOrReplace(transform10)

const largeIronFence8 = new Entity('largeIronFence8')
engine.addEntity(largeIronFence8)
largeIronFence8.setParent(_scene)
largeIronFence8.addComponentOrReplace(gltfShape3)
const transform11 = new Transform({
  position: new Vector3(78.5, 0, 79),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.746774435043335, 5.5, 6.2500128746032715)
})
largeIronFence8.addComponentOrReplace(transform11)

const archwayOfKindness = new Entity('archwayOfKindness')
engine.addEntity(archwayOfKindness)
archwayOfKindness.setParent(_scene)
const transform12 = new Transform({
  position: new Vector3(37.5, 0, 26),
  rotation: new Quaternion(8.255634678380416e-16, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(2.8125040531158447, 2.2950000762939453, 2.625005006790161)
})
archwayOfKindness.addComponentOrReplace(transform12)
const gltfShape4 = new GLTFShape("3d7bd1d2-2aee-470f-b19b-01997fc26da5/ChineseGate_03/ChineseGate_03.glb")
gltfShape4.withCollisions = true
gltfShape4.isPointerBlocker = true
gltfShape4.visible = true
archwayOfKindness.addComponentOrReplace(gltfShape4)

const tianlongDragonStatue = new Entity('tianlongDragonStatue')
engine.addEntity(tianlongDragonStatue)
tianlongDragonStatue.setParent(_scene)
const transform13 = new Transform({
  position: new Vector3(27, 0, 33),
  rotation: new Quaternion(-1.1006259295745285e-15, -0.4713967740535736, 5.6194867426029305e-8, 0.8819212913513184),
  scale: new Vector3(1.9523653984069824, 2.5, 1.7610235214233398)
})
tianlongDragonStatue.addComponentOrReplace(transform13)
const gltfShape5 = new GLTFShape("2807c5c8-b44a-46fc-b79d-2c3c7ee0c9d4/ChineseStatueDragon_01/ChineseStatueDragon_01.glb")
gltfShape5.withCollisions = true
gltfShape5.isPointerBlocker = true
gltfShape5.visible = true
tianlongDragonStatue.addComponentOrReplace(gltfShape5)

const tianlongDragonStatue2 = new Entity('tianlongDragonStatue2')
engine.addEntity(tianlongDragonStatue2)
tianlongDragonStatue2.setParent(_scene)
tianlongDragonStatue2.addComponentOrReplace(gltfShape5)
const transform14 = new Transform({
  position: new Vector3(29, 0, 16.5),
  rotation: new Quaternion(0.11330059170722961, -0.849577784538269, 0.1061348021030426, 0.5040993094444275),
  scale: new Vector3(1.9523684978485107, 2.5000009536743164, 1.7610259056091309)
})
tianlongDragonStatue2.addComponentOrReplace(transform14)

const traditionalRoundPavilion = new Entity('traditionalRoundPavilion')
engine.addEntity(traditionalRoundPavilion)
traditionalRoundPavilion.setParent(_scene)
const transform15 = new Transform({
  position: new Vector3(23, 0, 63),
  rotation: new Quaternion(-4.157467251052812e-15, 0.9238795638084412, -1.1013501932666259e-7, 0.3826834559440613),
  scale: new Vector3(2.000000476837158, 2.5, 2.000000476837158)
})
traditionalRoundPavilion.addComponentOrReplace(transform15)
const gltfShape6 = new GLTFShape("d9adde10-9349-49c8-ad6f-3083060fb93f/ChinesePergola_01/ChinesePergola_01.glb")
gltfShape6.withCollisions = true
gltfShape6.isPointerBlocker = true
gltfShape6.visible = true
traditionalRoundPavilion.addComponentOrReplace(gltfShape6)

const temple = new Entity('temple')
engine.addEntity(temple)
temple.setParent(_scene)
const transform16 = new Transform({
  position: new Vector3(61.5, 0, 25.5),
  rotation: new Quaternion(-4.214685134229512e-8, -0.7071067690849304, 4.2146840684154085e-8, 0.7071068286895752),
  scale: new Vector3(2.5, 2, 2.25)
})
temple.addComponentOrReplace(transform16)
const gltfShape7 = new GLTFShape("d6a75fd6-7adc-431c-913f-6d15156936cf/ChineseHouse_01/ChineseHouse_01.glb")
gltfShape7.withCollisions = true
gltfShape7.isPointerBlocker = true
gltfShape7.visible = true
temple.addComponentOrReplace(gltfShape7)

const yearOfThePigPostBanner = new Entity('yearOfThePigPostBanner')
engine.addEntity(yearOfThePigPostBanner)
yearOfThePigPostBanner.setParent(_scene)
const transform17 = new Transform({
  position: new Vector3(48.5, 0.5, 61.5),
  rotation: new Quaternion(-4.157467251052812e-15, -0.9238795638084412, 1.1013501932666259e-7, 0.3826834559440613),
  scale: new Vector3(3.500002384185791, 6.5, 6.000004768371582)
})
yearOfThePigPostBanner.addComponentOrReplace(transform17)
const gltfShape8 = new GLTFShape("11de39a5-2064-4249-837c-12c08697e308/ChineseFlag_02/ChineseFlag_02.glb")
gltfShape8.withCollisions = true
gltfShape8.isPointerBlocker = true
gltfShape8.visible = true
yearOfThePigPostBanner.addComponentOrReplace(gltfShape8)

const yearOfThePigPostBanner2 = new Entity('yearOfThePigPostBanner2')
engine.addEntity(yearOfThePigPostBanner2)
yearOfThePigPostBanner2.setParent(_scene)
yearOfThePigPostBanner2.addComponentOrReplace(gltfShape8)
const transform18 = new Transform({
  position: new Vector3(6, 0.5, 8.5),
  rotation: new Quaternion(6.65064594497863e-16, -0.47139671444892883, 5.6194863873315626e-8, -0.8819213509559631),
  scale: new Vector3(3.500000476837158, 6.5, 6.000000476837158)
})
yearOfThePigPostBanner2.addComponentOrReplace(transform18)

const yearOfThePigPostBanner3 = new Entity('yearOfThePigPostBanner3')
engine.addEntity(yearOfThePigPostBanner3)
yearOfThePigPostBanner3.setParent(_scene)
yearOfThePigPostBanner3.addComponentOrReplace(gltfShape8)
const transform19 = new Transform({
  position: new Vector3(13.5, 0.5, 46.5),
  rotation: new Quaternion(-3.153574389878856e-15, -0.8314696550369263, 9.911890685998515e-8, -0.5555702447891235),
  scale: new Vector3(3.500004768371582, 6.5, 6.0000081062316895)
})
yearOfThePigPostBanner3.addComponentOrReplace(transform19)

const smallRope = new Entity('smallRope')
engine.addEntity(smallRope)
smallRope.setParent(_scene)
const transform20 = new Transform({
  position: new Vector3(13.5, 12, 46.5),
  rotation: new Quaternion(0, -0.19509033858776093, 2.3256577108554666e-8, 0.9807853102684021),
  scale: new Vector3(-39.69001007080078, 1, 1.9999991655349731)
})
smallRope.addComponentOrReplace(transform20)
const gltfShape9 = new GLTFShape("8bff0afc-a55e-459f-9fc3-61f9d4261b20/ChineseLampRopeSmall_01/ChineseLampRopeSmall_01.glb")
gltfShape9.withCollisions = true
gltfShape9.isPointerBlocker = true
gltfShape9.visible = true
smallRope.addComponentOrReplace(gltfShape9)

const redRoundGauzeLantern = new Entity('redRoundGauzeLantern')
engine.addEntity(redRoundGauzeLantern)
redRoundGauzeLantern.setParent(_scene)
const transform21 = new Transform({
  position: new Vector3(28.000001907348633, 9.5, 52.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(5, 3, 3.999999523162842)
})
redRoundGauzeLantern.addComponentOrReplace(transform21)
const gltfShape10 = new GLTFShape("34a37553-aada-40f2-b1bc-0d433782cb82/ChineseLantern_03/ChineseLantern_03.glb")
gltfShape10.withCollisions = true
gltfShape10.isPointerBlocker = true
gltfShape10.visible = true
redRoundGauzeLantern.addComponentOrReplace(gltfShape10)

const redRoundGauzeLantern2 = new Entity('redRoundGauzeLantern2')
engine.addEntity(redRoundGauzeLantern2)
redRoundGauzeLantern2.setParent(_scene)
redRoundGauzeLantern2.addComponentOrReplace(gltfShape10)
const transform22 = new Transform({
  position: new Vector3(38.500003814697266, 9.5, 57),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(5, 3, 3.999999523162842)
})
redRoundGauzeLantern2.addComponentOrReplace(transform22)

const smallRope2 = new Entity('smallRope2')
engine.addEntity(smallRope2)
smallRope2.setParent(_scene)
smallRope2.addComponentOrReplace(gltfShape9)
const transform23 = new Transform({
  position: new Vector3(6, 11.5, 8),
  rotation: new Quaternion(2.3589285245881027e-16, -0.6343933343887329, 7.56255715828047e-8, 0.7730104923248291),
  scale: new Vector3(-39.69009017944336, 1, 2.0000030994415283)
})
smallRope2.addComponentOrReplace(transform23)

const redMelonGauzeLantern = new Entity('redMelonGauzeLantern')
engine.addEntity(redMelonGauzeLantern)
redMelonGauzeLantern.setParent(_scene)
const transform24 = new Transform({
  position: new Vector3(9, 10, 23.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.999999523162842, 3, 3.499999761581421)
})
redMelonGauzeLantern.addComponentOrReplace(transform24)
const gltfShape11 = new GLTFShape("5dc7fd31-fe40-4548-aafe-8ccaa124a218/ChineseLantern_01/ChineseLantern_01.glb")
gltfShape11.withCollisions = true
gltfShape11.isPointerBlocker = true
gltfShape11.visible = true
redMelonGauzeLantern.addComponentOrReplace(gltfShape11)

const redMelonGauzeLantern2 = new Entity('redMelonGauzeLantern2')
engine.addEntity(redMelonGauzeLantern2)
redMelonGauzeLantern2.setParent(_scene)
redMelonGauzeLantern2.addComponentOrReplace(gltfShape11)
const transform25 = new Transform({
  position: new Vector3(11.5, 10, 36.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.999999523162842, 3, 3.499999761581421)
})
redMelonGauzeLantern2.addComponentOrReplace(transform25)

const yearOfThePigBanner = new Entity('yearOfThePigBanner')
engine.addEntity(yearOfThePigBanner)
yearOfThePigBanner.setParent(_scene)
const transform26 = new Transform({
  position: new Vector3(54.5, 4.5, 28),
  rotation: new Quaternion(-2.4085271740892887e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(2.000002861022949, 2.5, 2.000002861022949)
})
yearOfThePigBanner.addComponentOrReplace(transform26)
const gltfShape12 = new GLTFShape("57d2eb7f-2671-47b3-9af9-fdfa84ceca1f/ChineseFlag_01/ChineseFlag_01.glb")
gltfShape12.withCollisions = true
gltfShape12.isPointerBlocker = true
gltfShape12.visible = true
yearOfThePigBanner.addComponentOrReplace(gltfShape12)

const yearOfThePigBanner2 = new Entity('yearOfThePigBanner2')
engine.addEntity(yearOfThePigBanner2)
yearOfThePigBanner2.setParent(_scene)
yearOfThePigBanner2.addComponentOrReplace(gltfShape12)
const transform27 = new Transform({
  position: new Vector3(54.5, 4.5, 23),
  rotation: new Quaternion(-2.4085271740892887e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(2.0000061988830566, 2.5, 2.0000061988830566)
})
yearOfThePigBanner2.addComponentOrReplace(transform27)

const fireworksBox = new Entity('fireworksBox')
engine.addEntity(fireworksBox)
fireworksBox.setParent(_scene)
const transform28 = new Transform({
  position: new Vector3(47.5, 0, 42.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.874999761581421, 1.5, 2.200000286102295)
})
fireworksBox.addComponentOrReplace(transform28)
const gltfShape13 = new GLTFShape("8838315c-b7e6-4066-9388-b6aa08f29df8/ChineseFireworks_01/ChineseFireworks_01.glb")
gltfShape13.withCollisions = true
gltfShape13.isPointerBlocker = true
gltfShape13.visible = true
fireworksBox.addComponentOrReplace(gltfShape13)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape14 = new GLTFShape("62b9b3e0-f0d9-4693-b8ee-fee3c20ca29c/FloorBasePebbles_01/FloorBasePebbles_01.glb")
gltfShape14.withCollisions = true
gltfShape14.isPointerBlocker = true
gltfShape14.visible = true
entity.addComponentOrReplace(gltfShape14)
const transform29 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform29)

const entity2 = new Entity('entity2')
engine.addEntity(entity2)
entity2.setParent(_scene)
entity2.addComponentOrReplace(gltfShape14)
const transform30 = new Transform({
  position: new Vector3(24, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity2.addComponentOrReplace(transform30)

const entity3 = new Entity('entity3')
engine.addEntity(entity3)
entity3.setParent(_scene)
entity3.addComponentOrReplace(gltfShape14)
const transform31 = new Transform({
  position: new Vector3(40, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity3.addComponentOrReplace(transform31)

const entity4 = new Entity('entity4')
engine.addEntity(entity4)
entity4.setParent(_scene)
entity4.addComponentOrReplace(gltfShape14)
const transform32 = new Transform({
  position: new Vector3(56, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity4.addComponentOrReplace(transform32)

const entity5 = new Entity('entity5')
engine.addEntity(entity5)
entity5.setParent(_scene)
entity5.addComponentOrReplace(gltfShape14)
const transform33 = new Transform({
  position: new Vector3(72, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity5.addComponentOrReplace(transform33)

const entity6 = new Entity('entity6')
engine.addEntity(entity6)
entity6.setParent(_scene)
entity6.addComponentOrReplace(gltfShape14)
const transform34 = new Transform({
  position: new Vector3(8, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity6.addComponentOrReplace(transform34)

const entity7 = new Entity('entity7')
engine.addEntity(entity7)
entity7.setParent(_scene)
entity7.addComponentOrReplace(gltfShape14)
const transform35 = new Transform({
  position: new Vector3(24, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity7.addComponentOrReplace(transform35)

const entity8 = new Entity('entity8')
engine.addEntity(entity8)
entity8.setParent(_scene)
entity8.addComponentOrReplace(gltfShape14)
const transform36 = new Transform({
  position: new Vector3(40, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity8.addComponentOrReplace(transform36)

const entity9 = new Entity('entity9')
engine.addEntity(entity9)
entity9.setParent(_scene)
entity9.addComponentOrReplace(gltfShape14)
const transform37 = new Transform({
  position: new Vector3(56, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity9.addComponentOrReplace(transform37)

const entity10 = new Entity('entity10')
engine.addEntity(entity10)
entity10.setParent(_scene)
entity10.addComponentOrReplace(gltfShape14)
const transform38 = new Transform({
  position: new Vector3(72, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity10.addComponentOrReplace(transform38)

const entity11 = new Entity('entity11')
engine.addEntity(entity11)
entity11.setParent(_scene)
entity11.addComponentOrReplace(gltfShape14)
const transform39 = new Transform({
  position: new Vector3(8, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity11.addComponentOrReplace(transform39)

const entity12 = new Entity('entity12')
engine.addEntity(entity12)
entity12.setParent(_scene)
entity12.addComponentOrReplace(gltfShape14)
const transform40 = new Transform({
  position: new Vector3(24, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity12.addComponentOrReplace(transform40)

const entity13 = new Entity('entity13')
engine.addEntity(entity13)
entity13.setParent(_scene)
entity13.addComponentOrReplace(gltfShape14)
const transform41 = new Transform({
  position: new Vector3(40, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity13.addComponentOrReplace(transform41)

const entity14 = new Entity('entity14')
engine.addEntity(entity14)
entity14.setParent(_scene)
entity14.addComponentOrReplace(gltfShape14)
const transform42 = new Transform({
  position: new Vector3(56, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity14.addComponentOrReplace(transform42)

const entity15 = new Entity('entity15')
engine.addEntity(entity15)
entity15.setParent(_scene)
entity15.addComponentOrReplace(gltfShape14)
const transform43 = new Transform({
  position: new Vector3(72, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity15.addComponentOrReplace(transform43)

const entity16 = new Entity('entity16')
engine.addEntity(entity16)
entity16.setParent(_scene)
entity16.addComponentOrReplace(gltfShape14)
const transform44 = new Transform({
  position: new Vector3(8, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity16.addComponentOrReplace(transform44)

const entity17 = new Entity('entity17')
engine.addEntity(entity17)
entity17.setParent(_scene)
entity17.addComponentOrReplace(gltfShape14)
const transform45 = new Transform({
  position: new Vector3(24, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity17.addComponentOrReplace(transform45)

const entity18 = new Entity('entity18')
engine.addEntity(entity18)
entity18.setParent(_scene)
entity18.addComponentOrReplace(gltfShape14)
const transform46 = new Transform({
  position: new Vector3(40, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity18.addComponentOrReplace(transform46)

const entity19 = new Entity('entity19')
engine.addEntity(entity19)
entity19.setParent(_scene)
entity19.addComponentOrReplace(gltfShape14)
const transform47 = new Transform({
  position: new Vector3(56, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity19.addComponentOrReplace(transform47)

const entity20 = new Entity('entity20')
engine.addEntity(entity20)
entity20.setParent(_scene)
entity20.addComponentOrReplace(gltfShape14)
const transform48 = new Transform({
  position: new Vector3(72, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity20.addComponentOrReplace(transform48)

const entity21 = new Entity('entity21')
engine.addEntity(entity21)
entity21.setParent(_scene)
entity21.addComponentOrReplace(gltfShape14)
const transform49 = new Transform({
  position: new Vector3(8, 0, 72),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity21.addComponentOrReplace(transform49)

const entity22 = new Entity('entity22')
engine.addEntity(entity22)
entity22.setParent(_scene)
entity22.addComponentOrReplace(gltfShape14)
const transform50 = new Transform({
  position: new Vector3(24, 0, 72),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity22.addComponentOrReplace(transform50)

const entity23 = new Entity('entity23')
engine.addEntity(entity23)
entity23.setParent(_scene)
entity23.addComponentOrReplace(gltfShape14)
const transform51 = new Transform({
  position: new Vector3(40, 0, 72),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity23.addComponentOrReplace(transform51)

const entity24 = new Entity('entity24')
engine.addEntity(entity24)
entity24.setParent(_scene)
entity24.addComponentOrReplace(gltfShape14)
const transform52 = new Transform({
  position: new Vector3(56, 0, 72),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity24.addComponentOrReplace(transform52)

const entity25 = new Entity('entity25')
engine.addEntity(entity25)
entity25.setParent(_scene)
entity25.addComponentOrReplace(gltfShape14)
const transform53 = new Transform({
  position: new Vector3(72, 0, 72),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity25.addComponentOrReplace(transform53)

const rusticWell = new Entity('rusticWell')
engine.addEntity(rusticWell)
rusticWell.setParent(_scene)
const transform54 = new Transform({
  position: new Vector3(67, 0, 67),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.499999761581421, 3.5, 3.3277499675750732)
})
rusticWell.addComponentOrReplace(transform54)
const gltfShape15 = new GLTFShape("5cb2dd69-4d9e-4794-982c-14703bd0a206/Well_01/Well_01.glb")
gltfShape15.withCollisions = true
gltfShape15.isPointerBlocker = true
gltfShape15.visible = true
rusticWell.addComponentOrReplace(gltfShape15)

const classicBench = new Entity('classicBench')
engine.addEntity(classicBench)
classicBench.setParent(_scene)
const transform55 = new Transform({
  position: new Vector3(69.5, 0, 50),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3.5, 3, 2.5)
})
classicBench.addComponentOrReplace(transform55)
const gltfShape16 = new GLTFShape("2cd78a5d-d01d-4d31-8940-c7fb8948e14e/Bench_01/Bench_01.glb")
gltfShape16.withCollisions = true
gltfShape16.isPointerBlocker = true
gltfShape16.visible = true
classicBench.addComponentOrReplace(gltfShape16)

const classicBench2 = new Entity('classicBench2')
engine.addEntity(classicBench2)
classicBench2.setParent(_scene)
classicBench2.addComponentOrReplace(gltfShape16)
const transform56 = new Transform({
  position: new Vector3(39, 0, 67),
  rotation: new Quaternion(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(3.500001907348633, 3, 2.5)
})
classicBench2.addComponentOrReplace(transform56)

const roundRug = new Entity('roundRug')
engine.addEntity(roundRug)
roundRug.setParent(_scene)
const transform57 = new Transform({
  position: new Vector3(61.5, 1.5, 24.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.5, 1, 3.5)
})
roundRug.addComponentOrReplace(transform57)
const gltfShape17 = new GLTFShape("1c9d6c7e-aeda-4c34-be6f-1ada660422e6/Carpet_01/Carpet_01.glb")
gltfShape17.withCollisions = true
gltfShape17.isPointerBlocker = true
gltfShape17.visible = true
roundRug.addComponentOrReplace(gltfShape17)

const ringedPlanet = new Entity('ringedPlanet')
engine.addEntity(ringedPlanet)
ringedPlanet.setParent(_scene)
const transform58 = new Transform({
  position: new Vector3(54, 40.5, 54),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(5.25, 5.5, 6.25)
})
ringedPlanet.addComponentOrReplace(transform58)
const gltfShape18 = new GLTFShape("804b3b43-cf0b-43fc-817d-b1b9aa9e3653/Planet_04/Planet_04.glb")
gltfShape18.withCollisions = true
gltfShape18.isPointerBlocker = true
gltfShape18.visible = true
ringedPlanet.addComponentOrReplace(gltfShape18)

const smallComet = new Entity('smallComet')
engine.addEntity(smallComet)
smallComet.setParent(_scene)
const transform59 = new Transform({
  position: new Vector3(26, 50.5, 62.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3, 2.5, 1.499999761581421)
})
smallComet.addComponentOrReplace(transform59)
const gltfShape19 = new GLTFShape("85e82f0c-40a0-4573-8f4f-c5bea492a25a/Comet_01/Comet_01.glb")
gltfShape19.withCollisions = true
gltfShape19.isPointerBlocker = true
gltfShape19.visible = true
smallComet.addComponentOrReplace(gltfShape19)

const smallComet2 = new Entity('smallComet2')
engine.addEntity(smallComet2)
smallComet2.setParent(_scene)
smallComet2.addComponentOrReplace(gltfShape19)
const transform60 = new Transform({
  position: new Vector3(19.5, 50.5, 28.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3, 2.5, 1.499999761581421)
})
smallComet2.addComponentOrReplace(transform60)

const smallComet3 = new Entity('smallComet3')
engine.addEntity(smallComet3)
smallComet3.setParent(_scene)
smallComet3.addComponentOrReplace(gltfShape19)
const transform61 = new Transform({
  position: new Vector3(46, 50.5, 19),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3, 2.5, 1.499999761581421)
})
smallComet3.addComponentOrReplace(transform61)

const smallComet4 = new Entity('smallComet4')
engine.addEntity(smallComet4)
smallComet4.setParent(_scene)
smallComet4.addComponentOrReplace(gltfShape19)
const transform62 = new Transform({
  position: new Vector3(71.5, 50.5, 39),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3, 2.5, 1.499999761581421)
})
smallComet4.addComponentOrReplace(transform62)

const smallComet5 = new Entity('smallComet5')
engine.addEntity(smallComet5)
smallComet5.setParent(_scene)
smallComet5.addComponentOrReplace(gltfShape19)
const transform63 = new Transform({
  position: new Vector3(65, 50.5, 73),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3, 2.5, 1.499999761581421)
})
smallComet5.addComponentOrReplace(transform63)

//ZOMBIE
