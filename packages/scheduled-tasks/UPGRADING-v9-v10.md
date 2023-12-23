# Migration guide for @sapphire/plugin-scheduled-tasks v9.x to v10.x

## Typed payloads

The `ScheduledTaskJob` interface has been removed in favor of defining types on `ScheduledTasks`.

You can define a payload type for a task by using module augmentation on `ScheduledTasks`. If the value of the entry is set to `never` in the interface, then the payload will be typed as `unknown`. Otherise, it will enforce the provided type for that task. Below are some examples.

Example: the task is defined

```ts
declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTasks {
		[ExampleTasks.One]: { data: string } | null;
		[ExampleTasks.Two]: never;
	}
}

/** ExampleTasks.One */

// Good
await container.tasks.create(ExampleTasks.One, { data: 'value' });

await container.tasks.create(ExampleTasks.One, null);

// Type error
await container.tasks.create(ExampleTasks.One, { data: true });

await container.tasks.create(ExampleTasks.One, { invalidProperty: 'value' });

await container.tasks.create(ExampleTasks.One, false);

/** ExampleTasks.Two */

// Good
await container.tasks.create(ExampleTasks.Two);

await container.tasks.create(ExampleTasks.Two, undefined);

await container.tasks.create(ExampleTasks.Two, true);

await container.tasks.create(ExampleTasks.Two, { data: 'value' });
```

Example: the task is **NOT** defined

```ts
// This task is not defined in the interface, so the payload will be `unknown`
await container.tasks.create('another_example', undefined);

await container.tasks.create('another_example', 1);

await container.tasks.create('another_example', 'string');
```

## Task handler

### Internal client

Due to the removal of `ScheduledTaskJob`, the `BullClient` will now be typed as `unknown` since the Job types in the Queue can not _really_ be known. So you will need to do validation when interacting directly with the client.

## Error listeners

The included error listeners are now enabled by default. If you want them to be disabled, just set `loadScheduledTaskErrorListeners` to false in the `SapphireClient` options.

### Error handling

The internal BullMQ client does not actually throw any errors, it just emits them from the client. As such, those error events will now be sent to the corresponding error listener registered by the plugin.

### Error payload types

The error listeners previously only returned the name of the task when an error was emitted, but now the event will provide the associated Piece.
