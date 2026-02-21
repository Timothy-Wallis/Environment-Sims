/**
 * Tests for Obj — verifies that object timers are driven by real elapsed
 * seconds (delta time) rather than a raw frame-count decrement, so that
 * objects live for the same real-world duration on fast and slow devices.
 */

import Obj from '../sources/html pages/assets/obj.js';

// Minimal DOM stub required by Obj's constructor
beforeAll(() => {
    document.body.innerHTML = '<canvas id="simCanvas" width="800" height="600"></canvas>';
});

describe('Obj timer — delta-time driven', () => {
    test('timer decreases by the supplied deltaTime value', () => {
        const obj = new Obj(100, 100, 500, 'brown');
        obj.update(100); // simulate 100 time units elapsed
        expect(obj.timer).toBeCloseTo(400, 0);
    });

    test('timer is independent of how many update calls are made', () => {
        // Two objects given the same total deltaTime via different split counts
        // should end up with the same remaining timer.
        const objA = new Obj(0, 0, 1000, 'brown');
        const objB = new Obj(0, 0, 1000, 'brown');

        // objA: one update of 200 units
        objA.update(200);

        // objB: four updates of 50 units each (same 200 units total)
        objB.update(50);
        objB.update(50);
        objB.update(50);
        objB.update(50);

        expect(objA.timer).toBeCloseTo(objB.timer, 0);
    });

    test('object becomes transparent once timer reaches 0', () => {
        const obj = new Obj(0, 0, 50, 'brown');
        obj.update(100); // deltaTime (seconds) larger than remaining timer
        expect(obj.color).toBe('transparent');
    });

    test('object stays alive when timer is still positive', () => {
        const obj = new Obj(0, 0, 500, 'white');
        obj.update(100);
        expect(obj.color).toBe('white');
        expect(obj.timer).toBeGreaterThan(0);
    });

    test('frame-rate independence — 60 fps vs 120 fps give the same result', () => {
        // Use an arbitrary total of 300 units split at different granularities
        // to verify the timer accumulates correctly regardless of step size.
        const totalDelta = 300;

        // 5 equal steps (coarser, like 60 fps)
        const obj60 = new Obj(0, 0, 1000, 'brown');
        for (let i = 0; i < 5; i++) obj60.update(totalDelta / 5);

        // 10 equal steps (finer, like 120 fps)
        const obj120 = new Obj(0, 0, 1000, 'brown');
        for (let i = 0; i < 10; i++) obj120.update(totalDelta / 10);

        expect(obj60.timer).toBeCloseTo(obj120.timer, 0);
    });
});
