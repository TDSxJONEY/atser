import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { UploadCloud, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function UploadForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: ''
  });
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Upload resume");

    setIsAnalyzing(true);

    const data = new FormData();
    data.append('resume', file);
    data.append('companyName', formData.companyName);
    data.append('jobTitle', formData.jobTitle);
    data.append('jobDescription', formData.jobDescription);

    try {
      const res = await api.post('/analysis/process', data);
      // const pdfUrl = URL.createObjectURL(file);
      const pdfUrl = res.data.data.originalPdfPath;
      navigate('/dashboard', {
        state: { analysisData: res.data.data, pdfUrl }
      });
    } catch {
      alert("Failed");
      setIsAnalyzing(false);
    }
  };

  // 🔥 LOADING SCREEN (IMPROVED)
  if (isAnalyzing) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 animate-pulse">
          <Sparkles className="w-10 h-10 text-blue-600 mx-auto" />
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          Analyzing your resume
        </h2>

        <p className="text-muted-foreground text-sm max-w-md">
          Matching your resume with job requirements, checking ATS compatibility,
          and generating actionable insights...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* HERO */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          Get your resume shortlisted
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Upload your resume and compare it against real job requirements.
          Get precise feedback on what’s holding you back.
        </p>
      </div>

      {/* MAIN CARD */}
      <Card className="shadow-lg border">
        <CardContent className="p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* INPUTS */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Company
                </label>
                <Input
                  name="companyName"
                  placeholder="Google, Amazon..."
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Job Title
                </label>
                <Input
                  name="jobTitle"
                  placeholder="Frontend Engineer"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* JOB DESCRIPTION */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Job Description
              </label>
              <Textarea
                name="jobDescription"
                rows={5}
                placeholder="Paste the job description here..."
                onChange={handleInputChange}
              />
            </div>

            <Separator />

            {/* UPLOAD */}
            <div className="relative border border-dashed rounded-xl p-8 text-center hover:bg-muted/30 transition cursor-pointer">

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <UploadCloud className="mx-auto w-8 h-8 text-muted-foreground mb-3" />

              <p className="text-sm font-medium">
                {file ? file.name : "Upload your resume"}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                PDF format recommended
              </p>
            </div>

            {/* CTA */}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
            >
              Analyze Resume
            </Button>

          </form>

        </CardContent>
      </Card>

      {/* TRUST FOOTNOTE */}
      <p className="text-xs text-muted-foreground text-center mt-6">
        Your resume is processed securely and never shared.
      </p>
    </div>
  );
}