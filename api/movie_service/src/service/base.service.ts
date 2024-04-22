// Create base service
import { Document, Model } from "mongoose";

export class BaseService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async checkExistence(id: any): Promise<void> {
    const result = await this.model.exists({ id: id });

    if (!result) {
      throw new Error("Entity not found");
    }
  }

  async create(data: any): Promise<T> {
    const result = await this.model.create(data);

    if (!result) {
      throw new Error("Error creating entity");
    }

    return result;
  }

  async findById(id: any): Promise<T> {
    const result = await this.model.findById({ id: id }).exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async findAll(): Promise<T[]> {
    const result = await this.model.find().exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async update(id: any, data: any): Promise<T> {
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async delete(id: any): Promise<unknown> {
    const result = await this.model.findByIdAndDelete(id).exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }
}
