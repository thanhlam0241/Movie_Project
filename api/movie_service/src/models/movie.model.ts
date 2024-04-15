import { model, Schema, Model, Document } from 'mongoose';

interface IMovie extends Document {
    email: string;
    firstName: string;
    lastName: string;
}

const MovieSchema: Schema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const Movie = model('Movie', MovieSchema);

export default Movie