//global
let player = Camera.instance
let movespeed=2
const boundarySizeXmax=16-3
const boundarySizeXmin=3
const boundarySizeZmax=16-3
const boundarySizeZmin=3

//assets
let zombieshape = new GLTFShape('models/zombie.glb')

//components
@Component("FollowsPlayer")
export class FollowsPlayer{}

//entities
let zombie = new Entity()
zombie.addComponent(new Transform({position: new Vector3(8,0,8)}))
zombie.addComponent(zombieshape)
zombie.addComponent(new FollowsPlayer())

engine.addEntity(zombie)

// system
class PlayerFollowSystem{
    group = engine.getComponentGroup(FollowsPlayer)

    update(dt:number){
        for (let entity of this.group.entities)
        {
            let transform =  entity.getComponent(Transform)
            let movedir = player.position.subtract(transform.position)
            movedir = movedir.normalize().multiplyByFloats(movespeed *dt,0,movespeed *dt)
            transform.position.addInPlace(movedir)
            transform.lookAt(player.feetPosition)   
        }
    }
}

engine.addSystem(new PlayerFollowSystem())