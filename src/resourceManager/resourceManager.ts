export interface ResourceLock {
    resourceId: string;
    startTime: number;
    endTime: number;
  }
  
class ResourceManager {
    //state, can be move to DB or DAL
    private resourceLocks: ResourceLock[] = [];
  
    addLock(resourceId: string, startTime: number, endTime: number): boolean {
      if (startTime >= endTime) {
        throw new Error("Start time must be less than end time.");
      }
      this.resourceLocks.push({ resourceId, startTime, endTime });
      return true
    }
  
    findFirstCollision(resourceId: string): ResourceLock | null {
        const locks = this.resourceLocks.filter(
          (lock) => lock.resourceId === resourceId
        );
        for (let i = 0; i < locks.length; i++) {
          for (let j = i + 1; j < locks.length; j++) {
            if (
              locks[i].endTime > locks[j].startTime &&
              locks[i].startTime < locks[j].endTime
            ) {
              return locks[i];
            }
          }
        }
        return null;
    }

    isLocked(resourceId: string, time: number): boolean {
      const currentLock= this.resourceLocks.find((lock)=>lock.resourceId === resourceId)
      return currentLock!== undefined &&(currentLock.startTime<=time && currentLock.endTime>time)
    }
  
    hasCollision(resourceId: string, time: number): boolean {
      const overlappingLocks = this.resourceLocks.filter(
        (lock) =>
          lock.resourceId === resourceId &&
          lock.startTime <= time &&
          lock.endTime > time
      );
      return overlappingLocks.length > 1;
    }
  
    findAllCollisions(resourceId: string): ResourceLock[][] {
      const locks = this.resourceLocks.filter(
        (lock) => lock.resourceId === resourceId
      );
  
      const collisions: ResourceLock[][] = [];
      for (let i = 0; i < locks.length; i++) {
        for (let j = i + 1; j < locks.length; j++) {
          if (
            locks[i].endTime > locks[j].startTime &&
            locks[i].startTime < locks[j].endTime
          ) {
            collisions.push([locks[i], locks[j]]);
          }
        }
      }
      return collisions;
    }
}
  
export default ResourceManager;
  