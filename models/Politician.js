import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Fulfilled', 'In Progress', 'Discontinued'], required: true },
  description: { type: String, default: '' },
  reference: { type: String, default: '' },
});

const stanceSchema = new mongoose.Schema({
  issue: { type: String, required: true },
  stance: { type: String, enum: ['Agree', 'Disagree'], required: true },
  reference: { type: String, default: '' },
});

const salnSchema = new mongoose.Schema({
  year: { type: String, required: true },
  assets: { type: String, required: true },
  liabilities: { type: String, required: true },
  networth: { type: String, required: true },
  reference: { type: String, default: '' },
});

const politicianSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  fullname: { type: String, required: true },
  photo: { type: String, default: '' },
  position: { type: String, required: true },
  party: { type: String, required: true },
  term: { type: String, required: true },
  successRate: { type: String, default: '0%' },
  projects: [projectSchema],
  stances: [stanceSchema],
  saln: [salnSchema],
}, { timestamps: true });

export default mongoose.model('Politician', politicianSchema);
