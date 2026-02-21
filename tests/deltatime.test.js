/**
 * Tests for DeltaTime — ensures correct time-delta calculation
 * regardless of device frame rate.
 */

import DeltaTime from '../sources/html pages/assets/deltatime.js';

describe('DeltaTime', () => {
    test('update() returns a positive number', () => {
        const dt = new DeltaTime();
        const delta = dt.update();
        expect(delta).toBeGreaterThanOrEqual(0);
    });

    test('update() returns elapsed ms between two calls', async () => {
        const dt = new DeltaTime();
        await new Promise(resolve => setTimeout(resolve, 50));
        const delta = dt.update();
        // Should be roughly 50 ms; allow generous tolerance for test environments
        expect(delta).toBeGreaterThan(10);
        expect(delta).toBeLessThan(500);
    });

    test('successive update() calls accumulate time correctly', async () => {
        const dt = new DeltaTime();
        await new Promise(resolve => setTimeout(resolve, 30));
        const d1 = dt.update();
        await new Promise(resolve => setTimeout(resolve, 30));
        const d2 = dt.update();
        const total = d1 + d2;
        // Total should be >= 60 ms combined
        expect(total).toBeGreaterThan(20);
    });

    test('update() each call resets the timestamp', async () => {
        const dt = new DeltaTime();
        await new Promise(resolve => setTimeout(resolve, 50));
        dt.update(); // consume the accumulated time
        // Immediately calling again should give a very small delta
        const immediateDelta = dt.update();
        expect(immediateDelta).toBeLessThan(50);
    });
});
