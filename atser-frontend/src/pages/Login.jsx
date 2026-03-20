import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowRight } from "lucide-react";

export default function Login() {
  const { user, loginWithGoogle } = useContext(AuthContext);

  if (user) return <Navigate to="/app" />;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE (STORY) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold leading-tight">
            You’re closer than you think.
          </h1>

          <p className="text-muted-foreground text-lg">
            The problem isn’t your skills.
            <br />
            It’s how your resume is being read.
          </p>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>❌ Rejected before human review</p>
            <p>❌ Missing critical keywords</p>
            <p>❌ Weak bullet points</p>
          </div>

          <p className="text-sm font-medium text-foreground">
            ATSER fixes that — instantly.
          </p>
        </motion.div>

        {/* RIGHT SIDE (LOGIN CARD) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="shadow-xl border">
            <CardContent className="p-8 space-y-6 text-center">

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">
                  Continue to ATSER
                </h2>
                <p className="text-sm text-muted-foreground">
                  Analyze your resume and get shortlisted faster
                </p>
              </div>

              <Button
                onClick={loginWithGoogle}
                className="w-full gap-2"
                size="lg"
              >
                Continue with Google
                <ArrowRight size={16} />
              </Button>

              <p className="text-xs text-muted-foreground">
                We don’t store your resume permanently.
              </p>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}