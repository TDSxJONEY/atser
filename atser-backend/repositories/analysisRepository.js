import Analysis from '../models/Analysis.js';

class AnalysisRepository {
  async createAnalysis(data) {
    const analysis = new Analysis(data);
    return await analysis.save();
  }

  async getUserAnalyses(userId) {
    return await Analysis.find({ userId }).sort({ createdAt: -1 });
  }
}

export default new AnalysisRepository();