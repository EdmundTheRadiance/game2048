const eventHub: Record<string, ((...args: unknown[]) => void)[]> = {};
export default {
    on(name: string, handler: (...args: unknown[]) => void): void {
        eventHub[name] = (eventHub[name] || []).concat(handler);
    },
    trigger(name: string, ...args: unknown[]) {
        const handlers = eventHub[name];
        for (let i = 0; i < handlers?.length || 0; i++) {
            handlers[i](...args);
        }
    }
}