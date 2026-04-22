import { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/motorcycle.css';

type RewardKey = 'knowledge' | 'tools' | 'people';
type GameStatus = 'idle' | 'running' | 'ending' | 'won' | 'lost';

type Pickup = {
  id: string;
  x: number;
  y: number;
  reward: RewardKey;
  label: string;
  icon: string;
};

type Hazard = {
  id: string;
  x: number;
  width: number;
  height: number;
  label: string;
};

type GameSnapshot = {
  bikeX: number;
  bikeY: number;
  bikeVy: number;
  bikeAngle: number;
  cameraX: number;
  endingTargetX: number;
  status: GameStatus;
  inventory: Record<RewardKey, number>;
  collected: Record<string, boolean>;
};

const START_X = 130;
const CAMERA_OFFSET = 140;
const CAMERA_SMOOTHING = 0.12;
const START_FREE_DISTANCE = 750;
const SPAWN_AHEAD_DISTANCE = 1600;
const RESPAWN_BUFFER = 300;
const BIKE_WIDTH = 132;
const SPEED = 230;
const GRAVITY = -1400;
const JUMP_VELOCITY = 620;
const HAZARD_HITBOX_INSET_X = 30;
const HAZARD_HITBOX_INSET_Y = 20;
const HAZARD_BASE_BOTTOM = 75;
const BIKE_HITBOX_INSET_FRONT = 34;
const BIKE_HITBOX_INSET_REAR = 28;
const BIKE_HITBOX_INSET_BOTTOM = 8;
const PICKUP_RADIUS_X = 72;
const PICKUP_RADIUS_Y = 66;
const REQUIRED_COUNT = 3;
const MIN_PICKUP_GAP = 260;
const MIN_HAZARD_GAP = 320;

const initialInventory: Record<RewardKey, number> = {
  knowledge: 0,
  tools: 0,
  people: 0,
};

function rewardLabel(reward: RewardKey) {
  if (reward === 'knowledge') {
    return 'Knowledge';
  }

  if (reward === 'tools') {
    return 'Tools';
  }

  return 'People';
}

function rewardIcon(reward: RewardKey) {
  if (reward === 'knowledge') {
    return '📚';
  }

  if (reward === 'tools') {
    return '🛠';
  }

  return '🤝';
}

function randomReward(excluded: RewardKey[] = []) {
  const rewardTypes: RewardKey[] = ['knowledge', 'tools', 'people'];
  const available = rewardTypes.filter((reward) => !excluded.includes(reward));
  const pool = available.length > 0 ? available : rewardTypes;
  return pool[Math.floor(Math.random() * pool.length)];
}

function createPickup(id: string, x: number, reward: RewardKey): Pickup {
  return {
    id,
    x,
    y: 82 + Math.floor(Math.random() * 44),
    reward,
    label: rewardLabel(reward),
    icon: rewardIcon(reward),
  };
}

function createHazard(id: string, x: number): Hazard {
  return {
    id,
    x,
    width: 54 + Math.floor(Math.random() * 26),
    height: 18 + Math.floor(Math.random() * 12),
    label: 'Traffic cone',
  };
}

function createPickupQueue(): Pickup[] {
  const queue: Pickup[] = [];
  let nextX = 960;

  for (let index = 0; index < 18; index += 1) {
    const reward = randomReward();
    queue.push(createPickup(`${reward}-${index + 1}`, nextX, reward));
    nextX += 280 + Math.random() * 260;
  }

  return queue;
}

function createHazardQueue(): Hazard[] {
  const queue: Hazard[] = [];
  let nextX = 760;

  for (let index = 0; index < 14; index += 1) {
    queue.push(createHazard(`hazard-${index + 1}`, nextX));
    nextX += 360 + Math.random() * 340;
  }

  return queue;
}

function createInitialSnapshot(): GameSnapshot {
  return {
    bikeX: START_X,
    bikeY: 0,
    bikeVy: 0,
    bikeAngle: 0,
    cameraX: 0,
    endingTargetX: 0,
    status: 'idle',
    inventory: { ...initialInventory },
    collected: {},
  };
}

function nextSpawnX(baseSpawnX: number, minGap: number, entities: Array<{ x: number }>, skipIndex: number) {
  let farthestX = 0;

  entities.forEach((entity, index) => {
    if (index === skipIndex) {
      return;
    }

    farthestX = Math.max(farthestX, entity.x);
  });

  return Math.max(baseSpawnX, farthestX + minGap);
}

export function MotorcycleJourneyLab() {
  const gameRef = useRef<GameSnapshot>(createInitialSnapshot());
  const pickupQueueRef = useRef<Pickup[]>(createPickupQueue());
  const hazardQueueRef = useRef<Hazard[]>(createHazardQueue());
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(createInitialSnapshot());
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  const syncSnapshot = () => {
    const current = gameRef.current;
    setSnapshot({
      bikeX: current.bikeX,
      bikeY: current.bikeY,
      bikeVy: current.bikeVy,
      bikeAngle: current.bikeAngle,
      cameraX: current.cameraX,
      endingTargetX: current.endingTargetX,
      status: current.status,
      inventory: { ...current.inventory },
      collected: { ...current.collected },
    });
  };

  const resetQueues = () => {
    pickupQueueRef.current = createPickupQueue();
    hazardQueueRef.current = createHazardQueue();
  };

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (snapshot.status !== 'running' && snapshot.status !== 'ending') {
      return;
    }

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.033);
      lastTimeRef.current = time;

      const game = gameRef.current;
      if (game.status !== 'running' && game.status !== 'ending') {
        return;
      }

      const moveSpeed = game.status === 'ending' ? SPEED * 1.18 : SPEED;
      game.bikeX += moveSpeed * delta;

      if (game.status === 'running') {
        game.bikeVy += GRAVITY * delta;
        game.bikeY = Math.max(0, game.bikeY + game.bikeVy * delta);
      } else {
        game.bikeY = 0;
        game.bikeVy = 0;
        game.bikeAngle = 0;
      }

      if (game.status === 'running' && game.bikeY > 0) {
        game.bikeAngle = Math.min(0, game.bikeAngle + 220 * delta);
      }

      const bikeBottom = 34 + game.bikeY;
      const bikeCenterX = game.bikeX + BIKE_WIDTH / 2;

      if (game.status === 'running') {
        pickupQueueRef.current.forEach((pickup) => {
          if (game.collected[pickup.id]) {
            return;
          }

          const isCollected =
            Math.abs(bikeCenterX - pickup.x) < PICKUP_RADIUS_X &&
            Math.abs(bikeBottom - pickup.y) < PICKUP_RADIUS_Y;

          if (isCollected) {
            game.collected[pickup.id] = true;
            game.inventory[pickup.reward] += 1;
          }
        });
      }

      const freeDriveZone = game.bikeX < START_X + START_FREE_DISTANCE;

      if (game.status === 'running' && !freeDriveZone) {
        pickupQueueRef.current.forEach((pickup, index) => {
          if (pickup.x < game.cameraX - RESPAWN_BUFFER) {
            const rewardTypes: RewardKey[] = ['knowledge', 'tools', 'people'];
            const missingRewards = rewardTypes.filter((reward) => game.inventory[reward] < REQUIRED_COUNT);
            const reward = randomReward(missingRewards);
            const baseSpawnX =
              game.cameraX + Math.max(viewportWidth * 2, SPAWN_AHEAD_DISTANCE) + Math.random() * 420;
            const spawnX = nextSpawnX(baseSpawnX, MIN_PICKUP_GAP, pickupQueueRef.current, index);

            pickupQueueRef.current[index] = createPickup(`${reward}-${Date.now()}-${index}`, spawnX, reward);
          }
        });

        hazardQueueRef.current.forEach((hazard, index) => {
          if (hazard.x < game.cameraX - RESPAWN_BUFFER) {
            const baseSpawnX =
              game.cameraX + Math.max(viewportWidth * 2.4, SPAWN_AHEAD_DISTANCE + 280) + Math.random() * 520;
            const spawnX = nextSpawnX(baseSpawnX, MIN_HAZARD_GAP, hazardQueueRef.current, index);

            hazardQueueRef.current[index] = createHazard(`hazard-${Date.now()}-${index}`, spawnX);
          }
        });
      }

      if (game.status === 'running') {
        const bikeTop = bikeBottom + BIKE_HITBOX_INSET_BOTTOM;
        const bikeHitboxFront = game.bikeX + BIKE_WIDTH - BIKE_HITBOX_INSET_FRONT;
        const bikeHitboxRear = game.bikeX + BIKE_HITBOX_INSET_REAR;

        hazardQueueRef.current.forEach((hazard) => {
          const hitboxX = hazard.x + HAZARD_HITBOX_INSET_X;
          const hitboxWidth = Math.max(4, hazard.width - HAZARD_HITBOX_INSET_X * 2);
          const hitboxBottom = HAZARD_BASE_BOTTOM + HAZARD_HITBOX_INSET_Y;
          const hitboxHeight = Math.max(4, hazard.height - HAZARD_HITBOX_INSET_Y * 2);
          const hitboxTop = hitboxBottom + hitboxHeight;
          const overlapsHorizontal = bikeHitboxFront > hitboxX && bikeHitboxRear < hitboxX + hitboxWidth;
          const failsJump = bikeTop < hitboxTop;

          if (overlapsHorizontal && failsJump && game.status === 'running') {
            game.status = 'lost';
          }
        });
      }

      const hasRequiredCounts =
        game.inventory.knowledge >= REQUIRED_COUNT &&
        game.inventory.tools >= REQUIRED_COUNT &&
        game.inventory.people >= REQUIRED_COUNT;

      if (hasRequiredCounts && game.status === 'running') {
        game.status = 'ending';
        game.cameraX = Math.max(0, game.bikeX - CAMERA_OFFSET);
        game.endingTargetX = game.cameraX + viewportWidth + 280;
        pickupQueueRef.current = [];
        hazardQueueRef.current = [];
      }

      if (game.status === 'ending' && game.bikeX >= game.endingTargetX) {
        game.status = 'won';
      }

      if (game.status === 'running') {
        const targetCamera = Math.max(0, game.bikeX - CAMERA_OFFSET);
        game.cameraX += (targetCamera - game.cameraX) * CAMERA_SMOOTHING;
      }

      syncSnapshot();

      if (game.status === 'running' || game.status === 'ending') {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [snapshot.status, viewportWidth]);

  const jump = () => {
    const game = gameRef.current;

    if (game.status !== 'running' || game.bikeY > 0) {
      return;
    }

    game.bikeVy = JUMP_VELOCITY;
    game.bikeAngle = -45;
    syncSnapshot();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== ' ' && event.key !== 'ArrowUp') {
        return;
      }

      event.preventDefault();
      jump();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const startGame = () => {
    resetQueues();
    gameRef.current = {
      ...createInitialSnapshot(),
      status: 'running',
    };
    lastTimeRef.current = null;
    syncSnapshot();
  };

  const restartGame = () => {
    resetQueues();
    gameRef.current = createInitialSnapshot();
    lastTimeRef.current = null;
    syncSnapshot();
  };

  const inventoryOrder: RewardKey[] = ['knowledge', 'tools', 'people'];
  const jumpReady = snapshot.status === 'running' && snapshot.bikeY === 0;
  const activePickup = pickupQueueRef.current.find((pickup) => !snapshot.collected[pickup.id]);
  const totalCollected = snapshot.inventory.knowledge + snapshot.inventory.tools + snapshot.inventory.people;
  const totalRequired = REQUIRED_COUNT * 3;

  const statusText = useMemo(() => {
    if (snapshot.status === 'won') {
      return 'You reached the end of the journey... for now';
    }

    if (snapshot.status === 'lost') {
      return 'The bike hit an obstacle. Restart and try the route again.';
    }

    if (snapshot.status === 'running') {
      if (activePickup) {
        return `Ride forward and jump for ${activePickup.label}.`;
      }

      return 'Keep rolling. New pickups will keep spawning until the pack is complete.';
    }

    if (snapshot.status === 'ending') {
      return 'The path is clear. Ride into the horizon.';
    }

    return 'Start the ride, jump over obstacles, and collect every signal on the road.';
  }, [activePickup, snapshot.status]);

  return (
    <div className="journey-runner-page">
      <section className="runner-section">
        <div className="runner-card" aria-live="polite">
            <p className="hero-text">
            An auto-running motorcycle side scroller. Start the ride, jump over obstacles, collect knowledge, tools, and people, then keep rolling until the pack is complete.          
            </p>
            
            {/* Only show status if it exists */}
            {statusText && <p className="status-text">{statusText}</p>}

            <ul className="instructions-list">
            <li>Automatic movement begins when you press Start.</li>
            <li>Press Jump or Space to hop over obstacles and collect pickups.</li>
            <li>Keep going until knowledge, tools, and people all reach 3/3.</li>
            </ul>
        </div>
        </section>
      <section className="runner-stage">
        <div className="runner-scene">
          <div className="runner-background" style={{ backgroundPositionX: `${-snapshot.cameraX * 0.45}px` }} aria-hidden="true" />
          <div className="runner-sky-glow" aria-hidden="true" />

          <div className="runner-overlay-ui">
            <div className="runner-score-overlay" aria-live="polite">
              <span className={`runner-status runner-status-${snapshot.status}`}>{snapshot.status}</span>
              {inventoryOrder.map((reward) => (
                <span key={reward} className="runner-badge">
                  {reward} {snapshot.inventory[reward]}/3
                </span>
              ))}
            </div>

            <button
              className="button button-dark runner-jump-overlay"
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                jump();
              }}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                  event.preventDefault();
                  jump();
                }
              }}
              disabled={!jumpReady}
            >
              Jump
            </button>

            {snapshot.status === 'won' ? (
              <div className="runner-ending-overlay" role="status" aria-live="polite">
                You reached the end of the journey... for now
              </div>
            ) : null}

            {snapshot.status === 'lost' ? (
              <div className="runner-ending-overlay runner-ending-overlay-lost" role="status" aria-live="polite">
                You hit an overwhelming roadblock...lets try again.
              </div>
            ) : null}
          </div>

          <div className="runner-world" style={{ transform: `translateX(${-snapshot.cameraX}px)` }}>
            <div className="runner-road" />

            {hazardQueueRef.current.map((hazard) => (
              <div
                key={hazard.id}
                className="runner-hazard"
                style={{ left: hazard.x, width: hazard.width, bottom: HAZARD_BASE_BOTTOM, height: hazard.height }}
                aria-label={hazard.label}
                aria-hidden="true"
              >
                <img src="/media/lab/trafficCone.png" alt="" draggable={false} />
              </div>
            ))}

            {pickupQueueRef.current.map((pickup) => {
              const isCollected = snapshot.collected[pickup.id];

              return (
                <button
                  key={pickup.id}
                  type="button"
                  className={`runner-pickup runner-pickup-${pickup.reward} ${isCollected ? 'runner-pickup-collected' : ''}`}
                  style={{ left: pickup.x, bottom: pickup.y }}
                  aria-label={pickup.label}
                  disabled
                >
                  <span aria-hidden="true">{pickup.icon}</span>
                </button>
              );
            })}

            <div className="runner-sun" style={{ left: snapshot.cameraX + viewportWidth * 1.8 }} aria-hidden="true">
              <span>☼</span>
            </div>

            <div
              className={`runner-bike ${snapshot.bikeY > 0 ? 'runner-bike-jumping' : ''}`}
              style={{ left: snapshot.bikeX, bottom: 34 + snapshot.bikeY, transform: `rotate(${snapshot.bikeAngle}deg)` }}
              aria-label="Motorcycle"
            >
              <img src="/media/lab/motorcycle.png" alt="Right facing motorcycle" draggable={false} />
            </div>
          </div>
        </div>

        <div className="runner-progress">
          <div className="runner-progress-track">
            <div className="runner-progress-fill" style={{ width: `${Math.min((totalCollected / totalRequired) * 100, 100)}%` }} />
          </div>
          <div className="runner-progress-labels">
            <span>0/9</span>
            <span>3 of each</span>
          </div>
        </div>

        <div className="runner-controls">
          <button className="button button-dark" type="button" onClick={startGame}>
            {snapshot.status === 'running' ? 'Restart ride' : 'Start ride'}
          </button>
          <button 
            className="button button-light button-white" 
            type="button" 
            onClick={restartGame}
            >
            Reset
            </button>
        </div>
      </section>
    </div>
  );
}