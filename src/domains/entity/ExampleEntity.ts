import { randomUUID } from 'crypto';
import { ExamplePropsInterface } from '../interfaces/ExampleInterfaces';

export class ExampleEntity {
    private _id: string;
    private _name: string;
    private _description: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;

    constructor(props: ExamplePropsInterface) {
        this._id = props.id;
        this._name = props.name;
        this._description = props.description;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get createdAt(): Date | undefined {
        return this._createdAt;
    }

    get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    static create(data: Omit<ExamplePropsInterface, 'id' | 'createdAt' | 'updatedAt'>): ExampleEntity {
        return new ExampleEntity({ id: randomUUID.toString(), createdAt: new Date(), updatedAt: new Date(), ...data });
    }

    updateName(name: string): void {
        if (!name.trim()) throw new Error('Name cannot be empty')
        this._name = name
        this.touchUpdatedAt()
    }

    updateDescription(description: string): void {
        if (!description.trim()) throw new Error('Description cannot be empty.');
        this._description = description;
        this.touchUpdatedAt();
    }

    private touchUpdatedAt(): void {
        this._updatedAt = new Date();
    }

    toProps(): ExamplePropsInterface {
        return {
            id: this._id,
            name: this._name,
            description: this._description,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }
}