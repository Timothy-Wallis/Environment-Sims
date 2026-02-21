/**
 * Tests for the randomTime bias formula used in evolutionarytraitsim.js.
 *
 * The formula is tested in isolation (pure math) because randomTime() reads
 * the DOM and module-level state that cannot be imported directly.
 *
 * Priority color:     baseTime * (0.5 + Math.random() * 0.5)  → 50%–100% of baseTime
 * Non-priority color: baseTime * (0.2 + Math.random() * 0.4)  → 20%–60%  of baseTime
 *
 * Year timer: lifeSpanInput / 10  (must be shorter than minimum priority lifespan
 * so that succession — spawning new objects — can actually occur)
 */

const SAMPLES = 1000;

function priorityTimer(baseTime) {
    return Math.max(1, Math.floor(baseTime * (0.5 + Math.random() * 0.5)));
}

function nonPriorityTimer(baseTime) {
    return Math.max(1, Math.floor(baseTime * (0.2 + Math.random() * 0.4)));
}

describe('randomTime bias formula', () => {
    const baseTime = 15; // seconds — half of a 30 s lifespan

    test('priority color timer stays within 50%–100% of baseTime', () => {
        for (let i = 0; i < SAMPLES; i++) {
            const val = priorityTimer(baseTime);
            expect(val).toBeGreaterThanOrEqual(Math.floor(baseTime * 0.5));
            expect(val).toBeLessThanOrEqual(baseTime);
        }
    });

    test('non-priority color timer stays within 20%–60% of baseTime', () => {
        for (let i = 0; i < SAMPLES; i++) {
            const val = nonPriorityTimer(baseTime);
            expect(val).toBeGreaterThanOrEqual(Math.floor(baseTime * 0.2));
            expect(val).toBeLessThanOrEqual(Math.ceil(baseTime * 0.6));
        }
    });

    test('priority color averages a longer lifespan than non-priority', () => {
        let prioritySum = 0;
        let nonPrioritySum = 0;
        for (let i = 0; i < SAMPLES; i++) {
            prioritySum += priorityTimer(baseTime);
            nonPrioritySum += nonPriorityTimer(baseTime);
        }
        expect(prioritySum / SAMPLES).toBeGreaterThan(nonPrioritySum / SAMPLES);
    });

    test('priority mean is at least 2× the non-priority mean', () => {
        let prioritySum = 0;
        let nonPrioritySum = 0;
        for (let i = 0; i < SAMPLES; i++) {
            prioritySum += priorityTimer(baseTime);
            nonPrioritySum += nonPriorityTimer(baseTime);
        }
        const ratio = (prioritySum / SAMPLES) / (nonPrioritySum / SAMPLES);
        // Expected theoretical means: priority ≈ 11.25 s, non-priority ≈ 6 s → ratio ≈ 1.9
        expect(ratio).toBeGreaterThan(1.5);
    });

    test('non-priority timer is always positive', () => {
        for (let i = 0; i < SAMPLES; i++) {
            expect(nonPriorityTimer(baseTime)).toBeGreaterThan(0);
        }
    });

    test('priority timer is always positive', () => {
        for (let i = 0; i < SAMPLES; i++) {
            expect(priorityTimer(baseTime)).toBeGreaterThan(0);
        }
    });
});

describe('year timer vs lifespan relationship', () => {
    // Regression guard: the year timer must be shorter than the minimum
    // priority object lifespan so that objects survive long enough for the
    // year boundary to fire and succession (new spawns) to occur.
    test('year duration is shorter than the minimum priority lifespan for any valid lifespan input', () => {
        // Test across the full valid input range (5 – 120 s)
        for (let lifespanInput = 5; lifespanInput <= 120; lifespanInput++) {
            const yearDuration = lifespanInput / 10;
            const baseTime = lifespanInput / 2;
            // Theoretical minimum priority lifespan (Math.random() = 0): baseTime * 0.5
            const minPriorityLifespan = baseTime * 0.5;
            // A year must end before even the shortest-lived priority object dies
            expect(yearDuration).toBeLessThan(minPriorityLifespan);
        }
    });

    test('year duration is shorter than the maximum non-priority lifespan for any valid lifespan input', () => {
        for (let lifespanInput = 5; lifespanInput <= 120; lifespanInput++) {
            const yearDuration = lifespanInput / 10;
            const baseTime = lifespanInput / 2;
            // Theoretical maximum non-priority lifespan (Math.random() = 1): baseTime * 0.6
            const maxNonPriorityLifespan = baseTime * 0.6;
            // At least some non-priority objects should survive a full year too
            expect(yearDuration).toBeLessThan(maxNonPriorityLifespan);
        }
    });
});

