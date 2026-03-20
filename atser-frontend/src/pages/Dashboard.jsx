import React from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const { state } = useLocation();
  const { analysisData, pdfUrl } = state || {};

  if (!analysisData) return <Navigate to="/" />;

  const decision = analysisData.decision || {
    shortlist: false,
    reason: "No decision available"
  };

  const sections = analysisData.sections || {};
  const ats = analysisData.ats || { score: 0, checks: [] };
  const highlights = analysisData.highlights || [];
  const missingKeywords = analysisData.missingKeywords || [];

  return (
    <div className="max-w-[1400px] mx-auto p-6 flex gap-6">

      {/* LEFT PDF */}
      <div className="w-[48%] h-[calc(100vh-100px)] sticky top-20 border rounded-xl overflow-hidden bg-card">
        <div className="p-3 border-b flex justify-between items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app">
              <ArrowLeft size={16} /> Back
            </Link>
          </Button>

          <span className="text-sm font-medium truncate max-w-[200px]">
            {analysisData.jobTitle}
          </span>
        </div>

        {/* <iframe src={pdfUrl} className="w-full h-full" /> */}
        {pdfUrl ? (
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No preview available
          </div>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="w-[52%] space-y-6 pb-10">

        {/* 🔥 HERO (BIG UPGRADE) */}
        <Card className="border shadow-sm">
          <CardContent className="p-6 space-y-4">

            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <h1 className="text-4xl font-bold">
                  {analysisData.overallScore ?? 0}
                </h1>
              </div>

              <Badge
                variant={decision.shortlist ? "default" : "destructive"}
                className="text-sm px-3 py-1"
              >
                {decision.shortlist ? "Shortlisted" : "Rejected"}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground max-w-md">
              {decision.reason}
            </p>

          </CardContent>
        </Card>

        {/* SUMMARY */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysisData.summary || "No summary available"}
            </p>
          </CardContent>
        </Card>

        {/* 🔥 SECTIONS (CLEANED UI) */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold">Detailed Analysis</h3>

            {Object.entries(sections).map(([key, section]) => (
              <div key={key}>

                <div className="flex justify-between items-center mb-2">
                  <span className="capitalize font-medium">{key}</span>
                  <Badge variant="secondary">
                    {section?.score ?? 0}/100
                  </Badge>
                </div>

                {/* Issues */}
                {section?.issues?.length > 0 && (
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {section.issues.map((i, idx) => (
                      <div key={idx} className="flex gap-2">
                        <AlertTriangle size={14} className="text-yellow-500 mt-[2px]" />
                        <span>{i}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {section?.suggestions?.length > 0 && (
                  <div className="mt-2 space-y-1 text-sm text-green-600">
                    {section.suggestions.map((s, idx) => (
                      <div key={idx} className="flex gap-2">
                        <CheckCircle size={14} className="mt-[2px]" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Separator className="my-4" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ATS */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold">
              ATS Score ({ats.score ?? 0})
            </h3>

            {ats.checks.map((c, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{c.label}</span>
                <span>{c.status ? "✔️" : "❌"}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* KEYWORDS */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold">
              Keyword Match ({analysisData.keywordMatch ?? 0}%)
            </h3>

            <div className="flex flex-wrap gap-2">
              {missingKeywords.length === 0 ? (
                <Badge variant="secondary">No missing keywords</Badge>
              ) : (
                missingKeywords.map((k, i) => (
                  <Badge key={i} variant="destructive">
                    {k}
                  </Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* 🔥 HIGHLIGHTS (BETTER VISUAL) */}
        <div className="space-y-3">
          {highlights.map((h, i) => (
            <Card key={i} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <h4 className="font-medium">{h.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {h.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}