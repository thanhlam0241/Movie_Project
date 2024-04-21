import { BaseService } from "@/service/base.service";
import { Document, Model } from "mongoose";
import { Request, Response } from "express";

class BaseController<T extends Document> {

    service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    async getAll(req: Request, res: Response) {
        try {
            const data = await this.service.findAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const data = await this.service.findById(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = await this.service.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = await this.service.update(req.params.id, req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.service.delete(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export { BaseController };