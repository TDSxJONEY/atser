import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import TypingText from "@/components/TypingText";

export default function Landing() {
  const { user, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/app");
  }, [user]);

  const handleStart = () => {
    if (user) navigate("/app");
    else navigate("/login");
  };

  const fade = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-background text-foreground">

      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fade}
          className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl"
        >
          You applied to <span className="text-blue-600">100 jobs</span>...
          <br />
          but got <span className="text-red-500">no response</span>.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fade}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-6 text-lg max-w-2xl"
        >
          Not because you’re not good enough —
          <br />
          your resume never made it past the ATS.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fade}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button size="lg" onClick={handleStart} className="gap-2">
            Fix My Resume <ArrowRight size={18} />
          </Button>
        </motion.div>
      </section>

      {/* REALIZATION */}
      <AnimatedSection>
        <section className="py-24 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Before a recruiter sees your resume...
          </h2>

          <p className="text-muted-foreground text-lg">
            An algorithm decides if you’re worth being seen.
          </p>

          {/* ✅ FIXED CARDS */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              "Missing keywords",
              "Wrong structure",
              "Low relevance"
            ].map((item, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">

                  <div className="p-2 rounded-full bg-red-100">
                    <AlertTriangle className="text-red-500 w-5 h-5" />
                  </div>

                  <p className="text-sm font-medium">
                    {item}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    This reduces your chances of getting shortlisted
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* SOLUTION */}
      <AnimatedSection>
        <section className="bg-muted/40 py-24 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            ATSER shows you exactly why you’re rejected
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            We simulate real ATS + recruiter decisions so you know what to fix —
            before you apply.
          </p>
        </section>
      </AnimatedSection>

      {/* PRODUCT PREVIEW */}
      <AnimatedSection>
        <section className="py-24 max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                This is what’s happening to your resume
              </h3>

              <p className="text-muted-foreground mb-4">
                You think your resume is good.
                <br />
                But ATS sees something else.
              </p>

              <TypingText text={`Analyzing resume...
❌ Missing React
❌ Weak bullet points
❌ Low keyword match`} />
            </div>

            {/* RIGHT */}
            <Card className="shadow-xl">
              <CardContent className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-sm">Resume Score</span>
                  <span className="text-red-500 font-bold text-lg">42</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Keyword Match</span>
                  <span>48%</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  Missing: React, APIs, System Design
                </div>

                <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
                  ❌ Not shortlisted
                </div>

              </CardContent>
            </Card>

          </div>
        </section>
      </AnimatedSection>


      {/* BEFORE VS AFTER */}
    <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="py-24 max-w-6xl mx-auto px-6"
    >
    <h2 className="text-3xl font-semibold text-center mb-12">
        Before vs After ATS Optimization
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

        {/* BEFORE */}
        <div className="border rounded-xl p-6 bg-card shadow-sm">
        <h3 className="font-semibold mb-4 text-destructive flex items-center gap-2">
            ❌ Before
        </h3>

        <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Worked on web development project</li>
            <li>• Used different technologies</li>
            <li>• Responsible for backend</li>
        </ul>

        <div className="mt-4 text-xs text-destructive">
            Weak, no impact, no keywords
        </div>
        </div>

        {/* AFTER */}
        <div className="border rounded-xl p-6 bg-card shadow-sm">
        <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✅</span>
            After
        </h3>

        <ul className="text-sm space-y-2 text-foreground">
            <li>• Built scalable React + Node.js web app</li>
            <li>• Improved API performance by 35%</li>
            <li>• Implemented REST APIs & JWT auth</li>
        </ul>

        <div className="mt-4 text-xs text-green-600 dark:text-green-400">
            Strong impact + ATS keywords
        </div>
        </div>

    </div>
    </motion.section>

      {/* TRANSFORMATION */}
      <AnimatedSection>
        <section className="py-24 bg-muted/40 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Fix these → Get shortlisted
          </h2>

          {/* ✅ FIXED CARDS */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Add missing keywords",
              "Improve bullet points",
              "Match job description"
            ].map((item, i) => (
              <Card key={i} className="text-center hover:shadow-md transition">
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">

                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  </div>

                  <p className="text-sm font-medium">
                    {item}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Improves ATS compatibility
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-28 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Stop getting ignored.
        </h2>

        <p className="text-muted-foreground mb-6">
          Start getting shortlisted.
        </p>

        <Button size="lg" onClick={handleStart}>
          Analyze My Resume
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-muted-foreground">
        ATSER © 2026
      </footer>

    </div>
  );
}