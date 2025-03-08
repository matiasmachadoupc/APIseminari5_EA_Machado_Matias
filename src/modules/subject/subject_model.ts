import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
    name: string;
    teacher: string;
    alumni: mongoose.Types.ObjectId[];
}

const subjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    teacher: { type: String, required: true },
    alumni: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Subject = mongoose.model<ISubject>('Subject', subjectSchema);
export default Subject;