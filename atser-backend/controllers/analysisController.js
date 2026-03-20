import resumeService from '../services/resumeService.js';
import aiService from '../services/aiService.js';
import analysisRepository from '../repositories/analysisRepository.js';
import cloudinary from '../config/cloudinary.js';

class AnalysisController {

  async processResume(req, res, next) {
    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No resume uploaded'
        });
      }

      const { jobTitle, companyName, jobDescription } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated"
        });
      }

      if (!jobTitle || !jobDescription) {
        return res.status(400).json({
          success: false,
          message: "Missing job details"
        });
      }

      // ✅ 1. Extract text
      const resumeText = await resumeService.extractTextFromPDF(req.file.buffer);

      // ✅ 2. AI
      const aiResult = await aiService.analyzeResume(
        resumeText,
        jobTitle,
        jobDescription
      );

      // ✅ 3. Cloudinary upload
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "atser-resumes",
          },
          (error, result) => {
            if (error) {
              console.error("❌ CLOUDINARY ERROR:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      // ✅ 4. Save DB
      const analysisRecord = await analysisRepository.createAnalysis({
        userId,
        jobTitle,
        companyName,
        ...aiResult,
        originalPdfPath: uploadResult.secure_url,
        // originalPdfPath: uploadResult.secure_url.replace("/upload/", "/upload/fl_attachment:false/"),
        cloudinaryId: uploadResult.public_id
      });

      return res.status(200).json({
        success: true,
        message: "Resume analyzed successfully",
        data: analysisRecord
      });

    } catch (error) {
      console.error("🔥 FINAL ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message
      });
    }
  }

  async getHistory(req, res, next) {
    try {
      const history = await analysisRepository.getUserAnalyses(req.user.id);

      return res.status(200).json({
        success: true,
        data: history
      });
    } catch (error) {
      console.error("🔥 HISTORY ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch history"
      });
    }
  }
}

export default new AnalysisController();