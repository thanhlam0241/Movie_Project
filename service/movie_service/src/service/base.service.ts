// Create base service
import { Document, Model } from "mongoose";

export class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(_model: Model<T>) {
    this.model = _model;
  }

  public async findByListId(listId: any[]) {
    return await this.model.find({ id: { $in: listId } });
  }

  public async findByUserId(userId: any) {
    return await this.model.find({ user_id: userId });
  }

  public async findByMovieId(movieId: any) {
    return await this.model.find({ movie_id: movieId });
  }

  async checkExistenceById(id: any): Promise<void> {
    const result = await this.model.exists({ id: id });

    if (!result) {
      throw new Error("Entity not found");
    }
  }

  async createIdNumber(data: any): Promise<T> {
    const maxId = await this.model.find().sort({ id: -1 }).limit(1).exec();
    data.id = maxId.length === 0 ? 1 : maxId[0].id + 1;

    const result = await this.model.create(data);

    if (!result) {
      throw new Error("Error creating entity");
    }

    return result;
  }

  async create(data: any): Promise<T> {
    const result = await this.model.create(data);

    if (!result) {
      throw new Error("Error creating entity");
    }

    return result;
  }

  async findById(id: any): Promise<T> {
    const result = await this.model.findOne({ id: id });

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

  async findPaging(page: number, limit: number): Promise<T[]> {
    const result = await this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async updateById(id: any, data: any) {
    const result = await this.model.updateOne({ id: id }, data);

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async deleteById(id: any): Promise<unknown> {
    const result = await this.model.deleteOne({ id: id }).exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async checkExistenceByObjectId(id: any): Promise<void> {
    const result = await this.model.exists({ _id: id });

    if (!result) {
      throw new Error("Entity not found");
    }
  }

  async findByObjectId(id: any): Promise<T> {
    const result = await this.model.findById(id);

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async findByObjectIdList(listId: any[]): Promise<T[]> {
    return await this.model.find({ _id: { $in: listId } });
  }

  async updateByObjectId(id: any, data: any): Promise<T> {
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }

  async deleteByObjectId(id: any): Promise<unknown> {
    const result = await this.model.findByIdAndDelete(id).exec();

    if (!result) {
      throw new Error("Entity not found");
    }

    return result;
  }
}
