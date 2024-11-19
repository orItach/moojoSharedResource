import ResourceManager from "../resourceManager/resourceManager";

describe("ResourceManager", () => {
  let resourceManager: ResourceManager;

  beforeEach(() => {
    resourceManager = new ResourceManager();
  });

  test("should detect if a resource is locked at a given time", () => {
    resourceManager.addLock("a", 1500, 1600);
    expect(resourceManager.isLocked("a", 1550)).toBe(true);
    expect(resourceManager.isLocked("a", 1600)).toBe(false);
  });

  test("should detect if a resource has a collision at a given time", () => {
    resourceManager.addLock("a", 1500, 1600);
    resourceManager.addLock("a", 1550, 1650);
    expect(resourceManager.hasCollision("a", 1550)).toBe(true);
    expect(resourceManager.hasCollision("a", 1700)).toBe(false);
  });

  test("should find the first collision for a resource", () => {
    resourceManager.addLock("a", 1500, 1600);
    resourceManager.addLock("a", 1550, 1650);
    resourceManager.addLock("a", 1700, 1800);
    const collision = resourceManager.findFirstCollision("a");
    expect(collision).toEqual({ resourceId: "a", startTime: 1500, endTime: 1600 });
  });

  test("should find all collisions for a resource", () => {
    resourceManager.addLock("a", 1500, 1600);
    resourceManager.addLock("a", 1550, 1650);
    resourceManager.addLock("a", 1600, 1700);
    const collisions = resourceManager.findAllCollisions("a");
    expect(collisions.length).toBe(2);
  });
});
