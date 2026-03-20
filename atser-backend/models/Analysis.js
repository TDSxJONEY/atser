import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  jobTitle: { type: String, required: true },
  companyName: { type: String },

  overallScore: { type: Number, required: true },

  // ✅ NEW
  summary: { type: String },

  sections: {
    tone: { score: Number, issues: [String], suggestions: [String] },
    content: { score: Number, issues: [String], suggestions: [String] },
    structure: { score: Number, issues: [String], suggestions: [String] },
    skills: { score: Number, issues: [String], suggestions: [String] }
  },

  // ✅ NEW
  keywordMatch: { type: Number },
  missingKeywords: [String],

  ats: {
    score: Number,
    checks: [{ label: String, status: Boolean }]
  },

  highlights: [{
    type: { type: String, enum: ['warning', 'success', 'info'] },
    title: String,
    description: String
  }],

  // ✅ NEW (VERY IMPORTANT)
  decision: {
    shortlist: Boolean,
    reason: String
  },
  // for clodinary setup
  cloudinaryId: { type: String },

  originalPdfPath: { type: String }

}, { timestamps: true });

export default mongoose.model('Analysis', AnalysisSchema);