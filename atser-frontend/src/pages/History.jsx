import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import { FileText, Building2, Calendar, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/analysis/history");
        setHistory(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-muted-foreground">
        Loading your analyses...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Your Analyses</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track how your resumes perform across applications
          </p>
        </div>

        <Button asChild>
          <Link to="/app">New Analysis</Link>
        </Button>
      </div>

      {/* EMPTY STATE */}
      {history.length === 0 && (
        <Card className="border text-center py-16">
          <CardContent>
            <FileText className="mx-auto w-10 h-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              You haven't analyzed any resumes yet.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/app">Analyze Resume</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* GRID */}
      {history.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {history.map((item) => {
            const score = item.overallScore ?? 0;

            const scoreColor =
              score >= 75
                ? "bg-green-100 text-green-700"
                : score >= 50
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

            {/* const pdfUrl = `http://localhost:5000/${item.originalPdfPath.replace(/\\/g, "/")}`; */}
            const pdfUrl = item.originalPdfPath;

            return (
              <Card
                key={item._id}
                className="hover:shadow-md transition border flex flex-col"
              >
                <CardContent className="p-5 flex flex-col gap-4 h-full">

                  {/* TOP */}
                  <div className="flex justify-between items-start">
                    <div className={`px-3 py-1 rounded text-sm font-semibold ${scoreColor}`}>
                      {score}
                    </div>

                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* TITLE */}
                  <div>
                    <h3 className="font-semibold text-lg truncate">
                      {item.jobTitle}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Building2 size={14} />
                      <span className="truncate">
                        {item.companyName || "Unknown Company"}
                      </span>
                    </div>
                  </div>

                  {/* BADGE */}
                  <div>
                    <Badge variant={score >= 60 ? "default" : "destructive"}>
                      {score >= 60 ? "Good Match" : "Needs Improvement"}
                    </Badge>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      asChild
                    >
                      <Link
                        to="/dashboard"
                        state={{ analysisData: item, pdfUrl }}
                      >
                        View Analysis
                        <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </div>

                </CardContent>
              </Card>
            );
          })}

        </div>
      )}
    </div>
  );
}