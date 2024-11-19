import ResourceManager, { ResourceLock } from "./resourceManager/resourceManager";

const resourceManager = new ResourceManager();
export const main = function() {
    resourceManager.addLock("1",100,400)
    console.log("This is a message from the demo package");
  }

// can throw exception
export const addLock = (resourceId: string, startTime: number, endTime: number): boolean=>resourceManager.addLock(resourceId,startTime,endTime)
export const findFirstCollision = (resourceId: string): ResourceLock | null=>resourceManager.findFirstCollision(resourceId)
export const isLocked= (resourceId: string, time: number): boolean=>resourceManager.isLocked(resourceId, time)
export const hasCollision= (resourceId: string, time: number): boolean=>resourceManager.hasCollision(resourceId, time)
export const findAllCollisions= (resourceId: string): ResourceLock[][] =>resourceManager.findAllCollisions(resourceId)