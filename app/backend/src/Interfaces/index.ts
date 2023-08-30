export type NewEntity<T> = Omit<Omit<T, 'id'>, 'inProgress'>;

export type ID = number;

export type Identifiable = { id: ID };
